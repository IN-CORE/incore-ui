/*******************************************************************************
 * Copyright (c) 2018 University of Illinois and others.  All rights reserved.
 * This program and the accompanying materials are made available under the
 * terms of the BSD-3-Clause which accompanies this distribution,
 * and is available at https://opensource.org/licenses/BSD-3-Clause
 *
 * Contributors:
 * Chris Navarro (NCSA) - initial API and implementation
 *******************************************************************************/
package edu.illinois.ncsa.incore.service.hazard.dao;

import com.mongodb.MongoClientURI;
import edu.illinois.ncsa.incore.service.hazard.models.hurricane.HistoricHurricane;

import java.net.URL;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import javax.ws.rs.NotFoundException;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;


public class DBHurricaneRepository {
    private String hostUri;
    private String databaseName;
    private int port;
    private MongoClientURI mongoClientURI;

    private JSONObject jsonParams;

    public DBHurricaneRepository() {
        this.port = 27017;
        this.hostUri = "localhost";
        this.databaseName = "hazarddb";
    }

    public DBHurricaneRepository(String hostUri, String databaseName, int port) {
        this.databaseName = databaseName;
        this.hostUri = hostUri;
        this.port = port;
    }

//    @Override
//    public void initialize() {
//        this.initializeDataStore();
//    }

    //@Override
    public HistoricHurricane getHurricaneByModel(String model) {
        JSONParser parser = new JSONParser();
        HistoricHurricane hurricane = new HistoricHurricane();
        JSONObject jsonParams = new JSONObject();
        hurricane.setHurricaneModel(model);

        try {

            String fileName = model+".json";
            URL modelURL = this.getClass().getClassLoader().getResource("/hazard/hurricane/models/" + fileName);
            Object obj = parser.parse(new FileReader(modelURL.getFile()));

            jsonParams =  (JSONObject) obj;

        } catch (FileNotFoundException e) {
            e.printStackTrace();
            throw new NotFoundException("Model not found in the database");
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }

        hurricane.setHurricaneParameters(jsonParams);

        return hurricane;
    }


}