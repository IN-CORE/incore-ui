package edu.illinois.ncsa.incore.service.hazard.models.hurricane;

import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class HurricaneSimulation {

    private String absTime;

    private List<Double> gridLats = new ArrayList<>();

    private List<Double> gridLongs = new ArrayList<>();

    private String gridCenter ="";
    private double centerVelAbs = 0;
    private String centerVelocity = "";

    private List<List<String>> surfaceVelocity = new ArrayList<>();

    private List<List<Double>> surfaceVelocityAbs = new ArrayList<>();

    public String getAbsTime() {
        return absTime;
    }

    public void setAbsTime(String absTime) {
        this.absTime = absTime;
    }

    public List<Double> getGridLats() {
        return gridLats;
    }

    public void setGridLats(List<Double> gridLats) {
        this.gridLats = gridLats;
    }

    public List<Double> getGridLongs() {
        return gridLongs;
    }

    public void setGridLongs(List<Double> gridLongs) {
        this.gridLongs = gridLongs;
    }

    public List<List<String>> getSurfaceVelocity() {
        return surfaceVelocity;
    }

    public void setSurfaceVelocity(List<List<String>> surfaceVelocity) {
        this.surfaceVelocity = surfaceVelocity;
    }

    public List<List<Double>> getSurfaceVelocityAbs() {
        return surfaceVelocityAbs;
    }

    public void setSurfaceVelocityAbs(List<List<Double>> surfaceVelocityAbs) {
        this.surfaceVelocityAbs = surfaceVelocityAbs;
    }

    public String getGridCenter() {
        return gridCenter;
    }

    public void setGridCenter(String gridCenter) {
        this.gridCenter = gridCenter;
    }

    public double getCenterVelAbs() {
        return centerVelAbs;
    }

    public void setCenterVelAbs(double centerVelAbs) {
        this.centerVelAbs = centerVelAbs;
    }

    public String getCenterVelocity() {
        return centerVelocity;
    }

    public void setCenterVelocity(String centerVelocity) {
        this.centerVelocity = centerVelocity;
    }

    public int compareTo(HurricaneSimulation sim){
        SimpleDateFormat sdf = new SimpleDateFormat("mm/dd/yyyy HH:mm"); //10/25/2005 22:00
        try {
            Date d = sdf.parse(sim.getAbsTime());
            Date dCurr = sdf.parse(this.absTime);
            if(d.after(dCurr)){
                return -1;
            }
        } catch(ParseException e){

        }
        return 1;
    }
}
