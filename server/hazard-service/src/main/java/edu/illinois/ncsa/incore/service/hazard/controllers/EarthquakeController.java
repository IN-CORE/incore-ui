/*******************************************************************************
 * Copyright (c) 2017 University of Illinois and others.  All rights reserved.
 * This program and the accompanying materials are made available under the
 * terms of the BSD-3-Clause which accompanies this distribution,
 * and is available at https://opensource.org/licenses/BSD-3-Clause
 *
 * Contributors:
 * Chris Navarro (NCSA) - initial API and implementation
 *******************************************************************************/
package edu.illinois.ncsa.incore.service.hazard.controllers;

import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.GeometryFactory;
import edu.illinois.ncsa.incore.service.hazard.dao.IRepository;
import edu.illinois.ncsa.incore.service.hazard.models.eq.ScenarioEarthquake;
import edu.illinois.ncsa.incore.service.hazard.models.eq.Site;
import edu.illinois.ncsa.incore.service.hazard.models.eq.attenuations.AtkinsonBoore1995;
import edu.illinois.ncsa.incore.service.hazard.models.eq.attenuations.BaseAttenuation;
import edu.illinois.ncsa.incore.service.hazard.models.eq.site.NEHRPSiteAmplification;
import edu.illinois.ncsa.incore.service.hazard.models.eq.site.SiteAmplification;
import edu.illinois.ncsa.incore.service.hazard.models.eq.types.HazardResult;
import edu.illinois.ncsa.incore.service.hazard.models.eq.types.SeismicHazardResult;
import edu.illinois.ncsa.incore.service.hazard.models.eq.types.SeismicHazardResults;
import edu.illinois.ncsa.incore.service.hazard.models.eq.utils.HazardCalc;
import edu.illinois.ncsa.incore.service.hazard.models.eq.utils.HazardUtil;
import org.apache.log4j.Logger;
import org.opengis.coverage.grid.GridCoverage;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;


@Path("earthquakes")
public class EarthquakeController {
    private static final Logger logger = Logger.getLogger(EarthquakeController.class);
    private GeometryFactory factory = new GeometryFactory();

    @Inject
    private IRepository repository;

    @Inject
    private AtkinsonBoore1995 model;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ScenarioEarthquake createScenarioEarthquake(ScenarioEarthquake scenarioEarthquake, @HeaderParam("X-Credential-Username") String username, @QueryParam("demandType") String demandType, @QueryParam("demandUnits") String demandUnits, @QueryParam("minX") double minX, @QueryParam("minY") double minY, @QueryParam("maxX") double maxX, @QueryParam("maxY") double maxY, @QueryParam("gridSpacing") double gridSpacing, @QueryParam("amplifyHazard") @DefaultValue("true") boolean amplifyHazard) {
        if (scenarioEarthquake != null) {
            String period = demandType;
            String demand = demandType;

            if (Pattern.compile(Pattern.quote(HazardUtil.SA), Pattern.CASE_INSENSITIVE).matcher(demandType).find()) {
                String[] demandSplit = demandType.split(" ");
                period = demandSplit[0];
                demand = demandSplit[1];
            }

            model.setRuptureParameters(scenarioEarthquake.getEqParameters());

            // TODO this should be determined from the scenario earthquake
            Map<BaseAttenuation, Double> attenuations = new HashMap<BaseAttenuation, Double>();
            attenuations.put(model, 1.0);

            try {
                File incoreWorkDirectory = File.createTempFile("incore", ".dir");
                incoreWorkDirectory.delete();
                incoreWorkDirectory.mkdirs();

                File hazardFile = new File(incoreWorkDirectory, "hazard.tif");

                GridCoverage gc = HazardCalc.getEarthquakeHazardRaster(scenarioEarthquake, attenuations, minX, minY, maxX, maxY, gridSpacing, period, demand, amplifyHazard);
                HazardCalc.getEarthquakeHazardAsGeoTiff(gc, hazardFile);

                String datasetId = HazardUtil.createRasterDataset(hazardFile, demandType + " hazard", username);
                scenarioEarthquake.setRasterDatasetId(datasetId);

                return repository.addScenarioEarthquake(scenarioEarthquake);
            } catch (IOException e) {
                logger.error("Error writing the hazard raster to file.", e);
            } catch (Exception e) {
                logger.error("Error creating the raster gridcoverage", e);
            }

        }

        throw new InternalServerErrorException("Earthquake couldn't be created");
    }

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<ScenarioEarthquake> getScenarioEarthquakes() {
        return repository.getScenarioEarthquakes();
    }

    @GET
    @Path("{earthquake-id}")
    @Produces({MediaType.APPLICATION_JSON})
    public ScenarioEarthquake getScenarioEarthquake(@PathParam("earthquake-id") String earthquakeId) {
        return repository.getScenarioEarthquakeById(earthquakeId);
    }

    @GET
    @Path("{earthquake-id}/dataset")
    @Produces({MediaType.TEXT_PLAIN})
    public Response getFile() {
        // TODO implement this and change MediaType to Octet Stream
        return Response.ok("Geotiff representing scenario earthquake not yet implemented.").build();
    }

    @GET
    @Path("{earthquake-id}/raster")
    @Produces({MediaType.APPLICATION_JSON})
    public SeismicHazardResults getScenarioEarthquakeHazardForBox(@PathParam("earthquake-id") String earthquakeId, @QueryParam("demandType") String demandType, @QueryParam("demandUnits") String demandUnits, @QueryParam("minX") double minX, @QueryParam("minY") double minY, @QueryParam("maxX") double maxX, @QueryParam("maxY") double maxY, @QueryParam("gridSpacing") double gridSpacing, @QueryParam("amplifyHazard") @DefaultValue("true") boolean amplifyHazard) {
        ScenarioEarthquake earthquake = repository.getScenarioEarthquakeById(earthquakeId);
        SeismicHazardResults results = null;
        if (earthquake != null) {
            String period = demandType;
            String demand = demandType;

            if (Pattern.compile(Pattern.quote(HazardUtil.SA), Pattern.CASE_INSENSITIVE).matcher(demandType).find()) {
                String[] demandSplit = demandType.split(" ");
                period = demandSplit[0];
                demand = demandSplit[1];
            }

            model.setRuptureParameters(earthquake.getEqParameters());

            // TODO this should be determined from the scenario earthquake
            Map<BaseAttenuation, Double> attenuations = new HashMap<BaseAttenuation, Double>();
            attenuations.put(model, 1.0);

            int width = 0;
            int height = 0;

            double dx = (maxX - minX);
            double dy = (maxY - minY);

            dx = Math.ceil(dx / gridSpacing) * gridSpacing;
            dy = Math.ceil(dy / gridSpacing) * gridSpacing;

            maxX = minX + dx;
            maxY = minY + dy;

            if (gridSpacing != 0) {
                long widthLong = Math.round(Math.abs((maxX - minX) / gridSpacing)); // + 1;
                long heightLong = Math.round(Math.abs((maxY - minY) / gridSpacing)); // + 1;
                if ((widthLong > Integer.MAX_VALUE) || (heightLong > Integer.MAX_VALUE)) {
                    System.out.println("Overflow....too many points to fit in an int"); //$NON-NLS-1$
                }
                // adjustMaxMin();
                width = (int) widthLong;
                height = (int) heightLong;

            }

            float cellsize = (float) gridSpacing;
            float startX = (float) minX + ((float) gridSpacing / 2.0f);
            float startY = (float) maxY - ((float) gridSpacing / 2.0f);
            Site localSite = null;
            SeismicHazardResult hazardValue = null;
            List<HazardResult> hazardResults = new LinkedList<HazardResult>();
            for (int y = 0; y < height; y++) {

                startX = (float) minX + (cellsize / 2.0f);
                for (int x = 0; x < width; x++) {
                    try {
                        localSite = new Site(factory.createPoint(new Coordinate(startX, startY)));
                        hazardValue = HazardCalc.getGroundMotionAtSite(earthquake, attenuations, localSite, period, demand, 0, amplifyHazard);
                        hazardResults.add(new HazardResult(startY, startX, hazardValue.getHazardValue()));
                    } catch (Exception e) {
                        logger.error("Error computing hazard value.", e);
                    }

                    startX += (float) gridSpacing;
                }
                startY -= gridSpacing;
            }

            results = new SeismicHazardResults(hazardValue.getPeriod(), hazardValue.getDemand(), hazardResults);
            return results;
        }

        return null;
    }

    @GET
    @Path("{earthquake-id}/values")
    @Produces({MediaType.APPLICATION_JSON})
    public SeismicHazardResults getScenarioEarthquakeHazardValues(@PathParam("earthquake-id") String earthquakeId, @QueryParam("demandType") String demandType, @QueryParam("demandUnits") String demandUnits, @QueryParam("amplifyHazard") @DefaultValue("true") boolean amplifyHazard, @QueryParam("point") List<Double> points) {
        ScenarioEarthquake earthquake = repository.getScenarioEarthquakeById(earthquakeId);
        if (points.size() % 2 != 0) {
            logger.error("List of points to obtain earthquake hazard values must contain pairs of latitude and longitude values.");
            throw new BadRequestException("List of points to obtain earthquake hazard values must contain pairs of latitude and longitude values.");
        }
        if (earthquake != null) {
            String period = demandType;
            String demand = demandType;

            if (Pattern.compile(Pattern.quote(HazardUtil.SA), Pattern.CASE_INSENSITIVE).matcher(demandType).find()) {
                String[] demandSplit = demandType.split(" ");
                period = demandSplit[0];
                demand = demandSplit[1];
            }

            model.setRuptureParameters(earthquake.getEqParameters());

            // TODO this should be determined from the scenario earthquake
            Map<BaseAttenuation, Double> attenuations = new HashMap<BaseAttenuation, Double>();
            attenuations.put(model, 1.0);

            List<HazardResult> hazardResults = new LinkedList<HazardResult>();
            for (int index = 0; index < points.size(); index += 2) {
                double siteLat = points.get(index);
                double siteLong = points.get(index + 1);

                Site localSite = new Site(factory.createPoint(new Coordinate(siteLong, siteLat)));

                // TODO spectrum override should be part of the endpoint parameters
                try {
                    double hazardValue = HazardCalc.getGroundMotionAtSite(earthquake, attenuations, localSite, period, demand, 0, amplifyHazard).getHazardValue();
                    hazardResults.add(new HazardResult(siteLat, siteLong, hazardValue));
                } catch (Exception e) {
                    throw new InternalServerErrorException("Error computing hazard.", e);
                }
            }

            return new SeismicHazardResults(period, demand, hazardResults);
        } else {
            logger.error("Could not find scenario earthquake with id " + earthquakeId);
            throw new NotFoundException("Could not find scenario earthquake with id " + earthquakeId);
        }
    }

    @GET
    @Path("{earthquake-id}/value")
    @Produces({MediaType.APPLICATION_JSON})
    public SeismicHazardResult getScenarioEarthquakeHazard(@PathParam("earthquake-id") String earthquakeId, @QueryParam("demandType") String demandType, @QueryParam("demandUnits") String demandUnits, @QueryParam("siteLat") double siteLat, @QueryParam("siteLong") double siteLong, @QueryParam("amplifyHazard") @DefaultValue("true") boolean amplifyHazard) {
        ScenarioEarthquake earthquake = repository.getScenarioEarthquakeById(earthquakeId);
        if (earthquake != null) {
            String period = demandType;
            String demand = demandType;

            if (Pattern.compile(Pattern.quote(HazardUtil.SA), Pattern.CASE_INSENSITIVE).matcher(demandType).find()) {
                String[] demandSplit = demandType.split(" ");
                period = demandSplit[0];
                demand = demandSplit[1];
            }
            Site localSite = new Site(factory.createPoint(new Coordinate(siteLong, siteLat)));

            model.setRuptureParameters(earthquake.getEqParameters());

            // TODO this should be determined from the scenario earthquake
            Map<BaseAttenuation, Double> attenuations = new HashMap<BaseAttenuation, Double>();
            attenuations.put(model, 1.0);

            // TODO spectrum override should be part of the endpoint parameters
            try {
                return HazardCalc.getGroundMotionAtSite(earthquake, attenuations, localSite, period, demand, 0, amplifyHazard);
            } catch (Exception e) {
                throw new InternalServerErrorException("Error computing hazard.", e);
            }
        } else {
            throw new NotFoundException("Scenario earthquake with id " + earthquakeId + " was not found.");
        }
    }

    @GET
    @Path("/soil/amplification")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getEarthquakeSiteAmplification(@QueryParam("method") String method, @QueryParam("datasetId") @DefaultValue("") String datasetId, @QueryParam("siteLat") double siteLat, @QueryParam("siteLong") double siteLong, @QueryParam("demandType") String demandType, @QueryParam("hazard") double hazard, @QueryParam("defaultSiteClass") String defaultSiteClass) {

        int localSiteClass = HazardUtil.getSiteClassAsInt(defaultSiteClass);
        if (localSiteClass == -1) {
            return Response.status(500).entity("Unknown default site classification, expected A, B, C, D, E or F").build();
        }

        if (!datasetId.isEmpty()) {
            // TODO implement this
        }

        String period = demandType;

        if (demandType.contains(HazardUtil.SA)) {
            String[] demandSplit = demandType.split(" ");
            period = demandSplit[0];
        }

        SiteAmplification siteAmplification = null;
        // Local site to get hazard for
        Site localSite = new Site(factory.createPoint(new Coordinate(siteLong, siteLat)));

        if (method.equalsIgnoreCase("NEHRP")) {
            siteAmplification = new NEHRPSiteAmplification();
            // Note, hazard value input should be PGA if amplifying PGV hazard because NEHRP uses PGA coefficients for amplifying PGV
            // and the range for interpretation is in units of g
            double amplification = siteAmplification.getSiteAmplification(localSite, hazard, localSiteClass, period);

            return Response.ok(amplification).build();

        }
        return Response.ok("Site amplification requested is not yet implemented").build();
    }

    @GET
    @Path("/slope/amplification")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getEarthquakeSlopeAmplification(@QueryParam("siteLat") double siteLat, @QueryParam("siteLong") double siteLong) {
        return Response.ok("Topographic amplification not yet implemented").build();
    }
}
