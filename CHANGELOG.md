# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).


## [Unreleased]
### Fixed
- Remove null legacyID text in the list of DFR3 curves in DFR3 viewer [INCORE1-541](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-541)

### Added
- In Hazard Viewer, rename dropdown selection hurricane to hurricane windfield, add new option hurricane to view Hurricanes [INCORE1-699](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-699)
- Version tags now read from local json file which is updated periodically using cronjob, and later that will be volume mounted to /usr/share/nginx/html/public folder to ensure dynamic updates.[INCORE1-638](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-638)

### Changed
- Allow preview of both shapefile as well as raster dataset in Data Viewer.[INCORE1-699](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-699)


## [0.4.5] - 2020-06-17

### Added
- Preview parametric and conditional fragility curves [INCORE1-508](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-508)

### Changed
- No need to hide incore-lab from the sidebar when user not logged in [INCORE1-619](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-619)


## [0.4.4] - 2020-05-27

### Changed
- Fixed all ESLint errors and some warnings. Mostly related to indentations, string notations etc. Some eslint warnnings still remain. [INCORE1-529](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-529)

### Fixed
- Remove "is3dplot" field from downloaded metadata for fragility viewer [INCORE1-525](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-525)
- Fix the bug that landing page not showing components at all if github tag API is down [INCORE1-574](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-574)

### Added
- Allow web app to connect to localhost incore services [INCORE1-531](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-531)


## [0.4.3] - 2020-04-22

### Fixed
- Point changelog to master branch for incore-lab in the landing page


## [0.4.2] - 2020-03-26

### Security
- Resolve npm package security alert [INCORE1-547](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-547)

### Added

- DFR3 Mappings are added to the DFR3 Viewer in a separate tab [INCORE1-497](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-497)
- Add "test" as a deployment environment variable option and configure the services domain URLs accordingly

## [0.4.1] - 2020-03-02

### Fixed
- Fix the bug that custom expression fragility curves are not displaying in preview [INCORE1-481](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-481)

## [0.4.0] - 2020-01-31

### Added

- Turn fragility viewer to dfr3 viewer and add support for viewing restoration and repair curves [INCORE1-432](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-432)
- Add Environment variable DEPLOY_ENV to differentiate prod versus dev settings (various different urls) [INCORE1-443](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-443)
### Fixed

- Fix the problem that the header image covers the topbar when screen is small [INCORE1-437](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-437)
- Update dependency libraries to resolve security vulnerabilities [INCORE1-412](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-412)


## [0.3.5] - 2020-01-09

Fixing the security warning of some dependency libraries

## [0.3.4] - 2020-01-08

Fixing the INCORE release versions

## [0.3.3] - 2019-12-20

IN-CORE Web tools for IN-CORE 1.0 release

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
