/*******************************************************************************
 * Copyright (c) 2017 University of Illinois and others.  All rights reserved.
 * This program and the accompanying materials are made available under the
 * terms of the BSD-3-Clause which accompanies this distribution,
 * and is available at https://opensource.org/licenses/BSD-3-Clause
 *
 * Contributors:
 * Chris Navarro (NCSA) - initial API and implementation
 * Yong Wook Kim (NCSA) - initial API and implementation
 *******************************************************************************/
package edu.illinois.ncsa.incore.service.hazard.models.tornado.utils;

import com.vividsolutions.jts.geom.*;
import com.vividsolutions.jts.operation.buffer.BufferOp;
import edu.illinois.ncsa.incore.service.hazard.models.tornado.TornadoHazard;
import edu.illinois.ncsa.incore.service.hazard.models.tornado.TornadoParameters;
import org.apache.log4j.Logger;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class TornadoUtils {

    private static final Logger logger = Logger.getLogger(TornadoUtils.class);

    private static GeometryFactory geometryFactory = new GeometryFactory();

    /**
     * Returns the EF rating as an integer value
     *
     * @param efRating EF tornado rating
     * @return EF rating as an integer
     */
    public static int getEFRating(String efRating) {
        switch (efRating) {
            case "EF0":
                return 0;
            case "EF1":
                return 1;
            case "EF2":
                return 2;
            case "EF3":
                return 3;
            case "EF4":
                return 4;
            case "EF5":
                return 5;
            default:
                return -1;
        }
    }

    /**
     * Calculates tornado path distance
     *
     * @param tornadoPath LineString representing the tornado path
     * @return Distance
     */
    public static double calcDistanceCoords(LineString tornadoPath) {
        // convert LineString to LineSegem ent for the necessary process
        Coordinate[] coords = tornadoPath.getCoordinates();

        // the test only contains one segment, it will work on only one line
        LineSegment seg = new LineSegment(coords[0], coords[1]);

        return seg.getLength();
    }

    public static double computeMeanWidth(String efRating) {
        int efRatingValue = TornadoUtils.getEFRating(efRating);

        try (BufferedReader input = new BufferedReader(new InputStreamReader(TornadoUtils.class.getClassLoader().getResourceAsStream("/hazard/tornado/73-2012_torn_edit.txt")))) {
            String line = null;
            int ratingCount = 0;
            int intensity = 0;
            double tmpWidth = 0.0;
            double efWidth = 0.0;

            while ((line = input.readLine()) != null) {
                String[] values = line.split("\t"); //$NON-NLS-1$
                intensity = Integer.parseInt(values[3]);
                if (intensity == efRatingValue) {
                    tmpWidth = Double.parseDouble(values[11]);
                    // Only count values that have known width values
                    if (tmpWidth > 0.0) {
                        ratingCount++;
                        efWidth += tmpWidth;
                    }
                }
            }

            efWidth /= ratingCount;

            double meanWidth = efWidth * TornadoHazard.YARD_TO_METERS;

            return meanWidth;
        } catch (IOException e) {
            e.printStackTrace();
            // logger.error("Failed to read tornado historical data", e); //$NON-NLS-1$
        }

        return 0;
    }

    /**
     * Create a line from a given line with the given length
     *
     * @param length
     * @param tornadoPath
     * @return
     */
    public static LineString createPathWithLength(Double length, LineString tornadoPath) {
        // TODO consider moving this to a utility method
        // convert LineString to LineSegement for the necessary process
        Coordinate[] coords = tornadoPath.getCoordinates();

        // the test only contains one segment, it will work on only one line
        LineSegment seg = new LineSegment(coords[0], coords[1]);

        double segLength = seg.getLength();
        double startFrac = 0;
        double endFrac = 0;

        if (length > segLength) {
            // Check if we've hit a case of rounding error making length > segLength
            if ((length - segLength) / segLength < 0.0005) {
                length = segLength;
                startFrac = 0.5 - (length / segLength) / 2;
                endFrac = 0.5 + (length / segLength) / 2;
            } else {
                logger.error("The length is longer than the Tornado Path."); //$NON-NLS-1$
                throw new IllegalArgumentException("The length is longer than the Tornado Path.s"); //$NON-NLS-1$
            }
        } else {
            // create the length fraction
            startFrac = 0.5 - (length / segLength) / 2;
            endFrac = 0.5 + (length / segLength) / 2;
        }

        Coordinate startPt = seg.pointAlong(startFrac);
        Coordinate endPt = seg.pointAlong(endFrac);
        LineString outPath = geometryFactory.createLineString(new Coordinate[]{startPt, endPt});

        return outPath;
    }

    public static double[] getLengthMultiplier(String efRating) {
        int efRatingValue = TornadoUtils.getEFRating(efRating);

        // Find Length Multiplier
        switch (efRatingValue) {
            case 0:
                return TornadoHazard.ef0LenRate;
            case 1:
                return TornadoHazard.ef1LenRate;
            case 2:
                return TornadoHazard.ef2LenRate;
            case 3:
                return TornadoHazard.ef3LenRate;
            case 4:
                return TornadoHazard.ef4LenRate;
            case 5:
                return TornadoHazard.ef5LenRate;
            default:
                return null;
        }
    }

    /**
     * Create polygon with given coordinate. This method can only have one internal polygon to represent the EF boxes
     *
     * @param coordOut
     * @param coordIn
     * @return
     */
    public static Polygon createPolygon(Coordinate[] coordOut, Coordinate[] coordIn) {
        LinearRing ring = geometryFactory.createLinearRing(coordOut);
        LinearRing[] holes;
        if (coordIn == null) {
            holes = null;
        } else {
            holes = new LinearRing[1];
            holes[0] = geometryFactory.createLinearRing(coordIn);
        }

        return geometryFactory.createPolygon(ring, holes);
    }

    public static LineString createTornadoPath(TornadoParameters tornadoParameters, int numSimulation) {
        Coordinate startPtCoordinate = new Coordinate(tornadoParameters.getStartLongitude(), tornadoParameters.getStartLatitude());
        Coordinate endPtCoordinate = new Coordinate(tornadoParameters.getEndLongitude().get(numSimulation), tornadoParameters.getEndLatitude().get(numSimulation));

        Coordinate[] coords = new Coordinate[]{startPtCoordinate, endPtCoordinate};
        return geometryFactory.createLineString(coords);
    }

    public static List<Geometry> createTornadoGeometry(TornadoParameters tornadoParameters, List<Double> efBoxWidths, LineString tornadoPath) {

        // Tornado Parameters
        String efRating = tornadoParameters.getEfRating();

        List<LineString> tmpPaths = new ArrayList<LineString>();
        double tmpLength = 0;

        double boxLength = TornadoUtils.calcDistanceCoords(tornadoPath);

        // TODO Either get this from the model in case it overrides the parent class length multipliers or if model stores polygons, this method can be removed
        // EF box length multipliers
        double[] efLengthRate = TornadoUtils.getLengthMultiplier(efRating);

        for (int i = 0; i < efLengthRate.length; i++) {
            tmpLength = tmpLength + boxLength * (efLengthRate[i] / 100);
            tmpPaths.add(createPathWithLength(tmpLength, tornadoPath));
        }

        // geometry for calculating buffer
        ArrayList<Geometry> efBoxes = new ArrayList<Geometry>();
        // polygon geometry with inner polygon (hole)
        List<Geometry> efBoxPolys = new ArrayList<Geometry>();
        Geometry tmpPoly = null;

        for (int index = 0; index < efBoxWidths.size(); index++) {
            double efWidth = efBoxWidths.get(index);

            efBoxes.add(tmpPaths.get(index).buffer(efWidth, 10, BufferOp.CAP_BUTT));
            if (index == 0) {
                tmpPoly = createPolygon(efBoxes.get(index).getCoordinates(), null);
            } else {
                tmpPoly = createPolygon(efBoxes.get(index).getCoordinates(), efBoxes.get(index - 1).getCoordinates());
            }
            efBoxPolys.add(tmpPoly);
        }

        return efBoxPolys;

    }
}