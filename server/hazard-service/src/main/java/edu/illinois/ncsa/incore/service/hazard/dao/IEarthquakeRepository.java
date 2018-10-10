/*******************************************************************************
 * Copyright (c) 2017 University of Illinois and others.  All rights reserved.
 * This program and the accompanying materials are made available under the
 * terms of the BSD-3-Clause which accompanies this distribution,
 * and is available at https://opensource.org/licenses/BSD-3-Clause
 *
 * Contributors:
 * Chris Navarro (NCSA) - initial API and implementation
 *******************************************************************************/
package edu.illinois.ncsa.incore.service.hazard.dao;

import edu.illinois.ncsa.incore.service.hazard.models.eq.Earthquake;
import org.mongodb.morphia.Datastore;

import java.util.List;

public interface IEarthquakeRepository {
    void initialize();

    Earthquake getEarthquakeById(String id);

    Earthquake addEarthquake(Earthquake earthquake);

    List<Earthquake> getEarthquakes();

    Datastore getDataStore();
}
