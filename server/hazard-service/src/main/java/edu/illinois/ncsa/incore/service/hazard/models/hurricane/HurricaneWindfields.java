/*******************************************************************************
 * Copyright (c) 2019 University of Illinois and others.  All rights reserved.
 * This program and the accompanying materials are made available under the
 * terms of the Mozilla Public License v2.0 which accompanies this distribution,
 * and is available at https://www.mozilla.org/en-US/MPL/2.0/
 *******************************************************************************/
package edu.illinois.ncsa.incore.service.hazard.models.hurricane;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import edu.illinois.ncsa.incore.common.auth.Privileges;
import edu.illinois.ncsa.incore.common.data.models.jackson.JsonDateSerializer;
import edu.illinois.ncsa.incore.service.hazard.models.hurricane.utils.HurricaneUtil;
import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Property;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@XmlRootElement
public class HurricaneWindfields {

    @Id
    @Property("_id")
    private ObjectId id;
    private String name;
    private String description;
    private Date date = new Date();
    private Privileges privileges;

    public final String gridResolutionUnits = HurricaneUtil.GRID_RESOLUTION_UNITS;
    public final String rasterResolutionUnits = HurricaneUtil.RASTER_RESOLUTION_UNITS;
    public final String transDUnits = HurricaneUtil.TRANSD_UNITS;

    public String velocityUnits = "kt";

    private int gridResolution;
    private double rasterResolution;
    private double transD;
    private String landfallLocation;
    private String modelUsed;
    private String coast;
    private int category;
    private int gridPoints;
    private String rfMethod = "circular";
    private List<String> times = new ArrayList();
    private List<HurricaneSimulationDataset> hazardDatasets = new ArrayList<>();

    public String getVelocityUnits() {
        return velocityUnits;
    }

    public void setVelocityUnits(String velocityUnits) {
        this.velocityUnits = velocityUnits;
    }

    public String getId() {
        return id.toString();
    }

    public Privileges getPrivileges() {
        return privileges;
    }

    public void setPrivileges(Privileges privileges) {
        this.privileges = privileges;
    }


    public List<String> getTimes() {
        return times;
    }

    public void setTimes(List<String> times) {
        this.times = times;
    }

    public List<HurricaneSimulationDataset> getHazardDatasets() {
        return hazardDatasets;
    }

    public void setHazardDatasets(List<HurricaneSimulationDataset> hazardDatasets) {
        this.hazardDatasets = hazardDatasets;
    }

    public String getCoast() {
        return coast;
    }

    public void setCoast(String coast) {
        this.coast = coast;
    }

    public int getCategory() {
        return category;
    }

    public void setCategory(int category) {
        this.category = category;
    }

    public int getGridResolution() {
        return gridResolution;
    }

    public void setGridResolution(int gridResolution) {
        this.gridResolution = gridResolution;
    }

    public double getTransD() {
        return transD;
    }

    public void setTransD(double transD) {
        this.transD = transD;
    }

    public String getLandfallLocation() {
        return landfallLocation;
    }

    public void setLandfallLocation(String landfallLocation) {
        this.landfallLocation = landfallLocation;
    }

    public String getModelUsed() {
        return modelUsed;
    }

    public void setModelUsed(String modelUsed) {
        this.modelUsed = modelUsed;
    }

    public double getRasterResolution() {
        return rasterResolution;
    }

    public void setRasterResolution(double rasterResolution) {
        this.rasterResolution = rasterResolution;
    }

    public int getGridPoints() {
        return gridPoints;
    }

    public void setGridPoints(int gridPoints) {
        this.gridPoints = gridPoints;
    }

    public String getRfMethod() {
        return rfMethod;
    }

    public void setRfMethod(String rfMethod) {
        this.rfMethod = rfMethod;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String findFullPathDatasetId() {
        for (HurricaneSimulationDataset ds : this.hazardDatasets) {
            if (ds.getAbsTime().contains("full time")) {
                return ds.getDatasetId();
            }
        }
        return null;
    }

    @JsonSerialize(using = JsonDateSerializer.class)
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
