package edu.illinois.ncsa.incore.services.hazard;

import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.GeometryFactory;
import edu.illinois.ncsa.incore.services.hazard.eq.EqParameters;
import edu.illinois.ncsa.incore.services.hazard.eq.Site;
import edu.illinois.ncsa.incore.services.hazard.eq.models.AtkinsonBoore1995;
import edu.illinois.ncsa.incore.services.hazard.eq.util.HazardUtil;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;

@Path("earthquake")
public class EarthquakeResource {
    private GeometryFactory factory = new GeometryFactory();

    @GET
    @Path("/model")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getEarthquakeModelHazard2(@QueryParam("modelId") String modelId, @QueryParam("demandType") String demandType, @QueryParam("demandUnits") String demandUnits, @QueryParam("siteLat") double siteLat, @QueryParam("siteLong") double siteLong, @QueryParam("eqJson") String eqJson) {

        System.out.println("string = "+eqJson);
        EqParameters eqParameters = null;
        try {
            eqParameters = new ObjectMapper().readValue(eqJson, EqParameters.class);
            System.out.println("magnitude = "+eqParameters.getMagnitude());

            // TODO Need to handle conversions where attenuation cannot directly produce requested demand type (e.g. SA to PGV)
            String period = demandType;
            String demand = demandType;

            System.out.println("demand type = "+demandType);
            if(demandType.contains(HazardUtil.SA)) {
                System.out.println("split demand");
                String[] demandSplit = demandType.split(" ");
                System.out.println("split size = "+demandSplit.length);
                period = demandSplit[0];
                demand = demandSplit[1];
            }

            // TODO How can we store and lookup these model by ID?
            // TODO handle the case of a defined earthquake using multiple attenuations for weighting
            if(modelId.equalsIgnoreCase("AtkinsonBoore1995")) {
                AtkinsonBoore1995 model = new AtkinsonBoore1995();
                model.setRuptureParameters(eqParameters);

                // Local site to get hazard for
                Site localSite = new Site(factory.createPoint(new Coordinate(siteLong, siteLat)));

                try {
                    double value = model.getValue(period, localSite);
                    return Response.ok(value).build();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else {
                return Response.status(404).entity("Unknown attenuation model").build();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return Response.status(500).entity("Error reading earthquake parameters").build();
        }

        return Response.status(500 ).build();
    }

    // CMN: If we assume the Web application has access to the soil class layer then we could eliminate datasetId and lookup site classification on the client side
    @GET
    @Path("/soil/amplification")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getEarthquakeSiteAmplification(@QueryParam("method") String method, @QueryParam("datasetId") @DefaultValue("") String datasetId, @QueryParam("siteLat") double siteLat, @QueryParam("siteLong") double siteLong, @QueryParam("demandType") String demandType, @QueryParam("hazard") double hazard, @QueryParam("siteClass") String siteClass) {
        return Response.ok("Site amplification not yet implemented").build();
    }

    // Dataset API

    @GET
    @Path("/dataset")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getEarthquakeDatasetHazard(@QueryParam("datasetId") String datasetId, @QueryParam("demandType") String demandType, @QueryParam("demandUnits") String demandUnits, @QueryParam("siteLat") double siteLat, @QueryParam("siteLong") double siteLong) {
        // TODO Take the dataset id, retrieve the dataset and return the value at the raster point
        // Local site to get hazard for
        Site localSite = new Site(factory.createPoint(new Coordinate(siteLong, siteLat)));

        //HazardUtil.findRasterPoint(localSite, hazardRaster);
        return Response.ok("Return earthquake hazard from a dataset not yet implemented").build();
    }

    @GET
    @Path("/slope/amplification")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getEarthquakeSlopeAmplification(@QueryParam("siteLat") double siteLat, @QueryParam("siteLong") double siteLong) {
        return Response.ok("Topographic amplification not yet implemented").build();
    }


}
