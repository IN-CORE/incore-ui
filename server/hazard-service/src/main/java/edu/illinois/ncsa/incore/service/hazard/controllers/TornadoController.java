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
import com.vividsolutions.jts.geom.Point;
import edu.illinois.ncsa.incore.common.auth.IAuthorizer;
import edu.illinois.ncsa.incore.common.auth.Privileges;
import edu.illinois.ncsa.incore.service.hazard.dao.ITornadoRepository;
import edu.illinois.ncsa.incore.service.hazard.models.tornado.MeanWidthTornado;
import edu.illinois.ncsa.incore.service.hazard.models.tornado.ScenarioTornado;
import edu.illinois.ncsa.incore.service.hazard.models.tornado.Tornado;
import edu.illinois.ncsa.incore.service.hazard.models.tornado.types.WindHazardResult;
import edu.illinois.ncsa.incore.service.hazard.models.tornado.utils.TornadoCalc;
import edu.illinois.ncsa.incore.service.hazard.models.tornado.utils.TornadoUtils;
import edu.illinois.ncsa.incore.service.hazard.utils.ServiceUtil;
import org.apache.log4j.Logger;
import org.geotools.data.simple.SimpleFeatureCollection;
import org.geotools.feature.DefaultFeatureCollection;
import org.json.JSONObject;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Path("tornadoes")
public class TornadoController {
    private static final Logger logger = Logger.getLogger(TornadoController.class);

    @Inject
    private ITornadoRepository repository;

    @Inject
    private IAuthorizer authorizer;

    private GeometryFactory factory = new GeometryFactory();

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<ScenarioTornado> getScenarioTornadoes() {
        return repository.getScenarioTornadoes();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ScenarioTornado createScenarioTornado(ScenarioTornado scenarioTornado, @HeaderParam("X-Credential-Username") String username) throws Exception {
        if (scenarioTornado != null) {
            if (scenarioTornado.getTornadoModel().equals("MeanWidthTornado")) {
                Tornado tornado = new MeanWidthTornado();

                // Run the model
                tornado.createTornado(scenarioTornado.getTornadoParameters());

                // Set the resulting tornado generated by the model
                scenarioTornado.setTornadoWidth(tornado.getTornadoWidths());
                scenarioTornado.setEfBoxes(tornado.getEFBoxes());

                SimpleFeatureCollection collection = TornadoUtils.createTornadoGeometry(scenarioTornado);

                // Create the files from feature collection
                File[] files = TornadoUtils.createTornadoShapefile((DefaultFeatureCollection) collection);
                // Create dataset object representation for storing shapefile
                JSONObject datasetObject = TornadoUtils.getTornadoDatasetObject("Tornado Hazard", username, "EF Boxes representing tornado");
                // Store the dataset
                String datasetId = ServiceUtil.createDataset(datasetObject, username, files);
                scenarioTornado.setTornadoDatasetId(datasetId);

                scenarioTornado.setPrivileges(Privileges.newWithSingleOwner(username));
            } else {
                throw new InternalServerErrorException("Tornado model " + scenarioTornado.getTornadoModel() + " not yet implemented.");
            }
            return repository.addScenarioTornado(scenarioTornado);
        } else {
            logger.warn("scenario tornado is null");
        }

        throw new InternalServerErrorException("Tornado was null");
    }

    @GET
    @Path("{tornado-id}")
    @Produces({MediaType.APPLICATION_JSON})
    public ScenarioTornado getScenarioTornado(@HeaderParam("X-Credential-Username") String username, @PathParam("tornado-id") String tornadoId) {
        ScenarioTornado tornado = repository.getScenarioTornadoById(tornadoId);
        if (!authorizer.canRead(username, tornado.getPrivileges())) {
            throw new ForbiddenException();
        }
        return tornado;
    }

    @GET
    @Path("{tornado-id}/value")
    @Produces({MediaType.APPLICATION_JSON})
    public WindHazardResult getScenarioTornadoHazard(@HeaderParam("X-Credential-Username") String username, @PathParam("tornado-id") String tornadoId, @QueryParam("demandUnits") String demandUnits, @QueryParam("siteLat") double siteLat, @QueryParam("siteLong") double siteLong, @QueryParam("simulation") @DefaultValue("0") int simulation) throws Exception {
        ScenarioTornado tornado = getScenarioTornado(username, tornadoId);
        if (tornado != null) {
            Point localSite = factory.createPoint(new Coordinate(siteLong, siteLat));

            try {
                return TornadoCalc.getWindHazardAtSite(tornado, localSite, demandUnits, simulation);
            } catch (Exception e) {
                throw new InternalServerErrorException("Error computing hazard.", e);
            }
        } else {
            throw new NotFoundException("Tornado with id " + tornadoId + " was not found.");
        }
    }

    @GET
    @Path("{tornado-id}/values")
    @Produces({MediaType.APPLICATION_JSON})
    public List<WindHazardResult> getScenarioTornadoHazardValues(@HeaderParam("X-Credential-Username") String username, @PathParam("tornado-id") String tornadoId, @QueryParam("demandUnits") String demandUnits, @QueryParam("point") List<Double> points, @QueryParam("simulation") @DefaultValue("0") int simulation) throws Exception {
        if (points.size() % 2 != 0) {
            logger.error("List of points to obtain tornado hazard values must contain pairs of latitude and longitude values.");
            throw new BadRequestException("List of points to obtain tornado hazard values must contain pairs of latitude and longitude values.");
        }

        ScenarioTornado tornado = getScenarioTornado(username, tornadoId);
        if (tornado != null) {
            List<WindHazardResult> hazardResults = new ArrayList<WindHazardResult>();
            for (int index = 0; index < points.size(); index += 2) {
                double siteLat = points.get(index);
                double siteLong = points.get(index + 1);
                Point localSite = factory.createPoint(new Coordinate(siteLong, siteLat));

                hazardResults.add(TornadoCalc.getWindHazardAtSite(tornado, localSite, demandUnits, simulation));
            }

            return hazardResults;
        } else {
            throw new NotFoundException("Tornado with id " + tornadoId + " was not found.");
        }
    }

    @GET
    @Path("{tornado-id}/dataset")
    @Produces({MediaType.TEXT_PLAIN})
    public Response getFile() {
        // TODO implement this and change MediaType to Octet Stream
        return Response.ok("Shapefile representing scenario tornado not yet implemented.").build();
    }
}
