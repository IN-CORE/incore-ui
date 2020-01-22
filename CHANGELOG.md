# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

change fragility viewer to dfr3 viewer and add support for viewing restoration and repair curves

## [0.3.5] - 2020-01-09

fixing the security warning of some dependency libraries

## [0.3.4] - 2020-01-08

fixing the INCORE release versions

## [0.3.3] - 2019-12-20

IN-CORE Web tools for IN-CORE 1.0 release.

## [0.3.2] - 2019-10-24

## [0.3.1] - 2019-08-30

## [0.3.0] - 2019-08-23

## [0.2.0] - 2019-03-06

## [0.1.0] - 2018-01-24

Prototype for IN-CORE v2, a web application with a service oriented architecture based on IN-CORE v1.


### Added

- Authentication service - uses LDAP
- Data service - MongoDB, file storage and Geoserver with initial implementation to fetch/store data
- Fragility service - MongoDB with initial implementation to return building fragilities
- Hazard service - MongoDB with initial implementation of scenario earthquake using Atkinson and Boore 1995 model
- Maestro service - MongoDB with initial implementation of building damage based on version 1 analysis
- Kong provides API Gateway pattern to service layer
- Initial web frontend providing login page, data browsing, fragility viewer, and analysis page to run building damage analysis
