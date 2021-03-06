# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.9.4] - 2021-06-16

### Fixed
- Repair and Restoration curves selection [INCORE1-1227](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1227)


## [0.9.3] - 2021-05-26

### Added
- Term of Service link on login page [INCORE1-1198](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1198)


## [0.9.2] - 2021-05-21

### Added
- Register and reset password link under login page [INCORE1-1115](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1115)

### Security
- Fix security warnings and upgrade a few dependencies [INCORE1-1164](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1164)


## [0.9.1] - 2021-04-08

### Added
- Capability of delete items on Data Viewer, DFR3 Viewer and Hazard Viewer [INCORE1-868](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-868)
- Loading spinner on Viewers [INCORE1-931](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-931)

### Fixed
- table row alignment on the DFR3 fragility tab [INCORE1-994](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-994)


## [0.9.0] - 2021-02-23

### Added
- For each DFR3, dataset, and hazard item, display the spaces it belongs to [INCORE1-509](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-509)

### Changed
- Use relative URL in frontend configuration [INCORE1-888](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-888)
- Temporarily disable previewing equation based refactored fragility curves until figuring out future solution [INCORE1-935](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-935)
- Setting hostname instead of deploy_env through environment variables [INCORE1-947](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-947)

### Fixed
- When clicking, close dropdown menu on top bar [INCORE1-927](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-927)
- Demand types and units as X-axis in fragililty previewing [INCORE1-965](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-965)


## [0.8.0] - 2020-12-15

### Changed
- Move the side menu to the top and reorganize the structure of side menu items [INCORE1-860](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-860)


## [0.7.0] - 2020-10-27

### Changed
- Dynamically querying service API to update data type filter in DataViewer [INCORE1-554](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-554)
- Update hazard fitler in DFR3Viewer [INCORE1-775](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-775)
- Use relative path in configuration file [INCORE1-782](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-782)

### Fixed
- Fix the x-axis title in repair and restoration curve in DFR3Viewer [INCORE1-829](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-829)


## [0.6.0] - 2020-09-03

### Added
- In Hazard Viewer add new option floods [INCORE1-751](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-751)
- Close button on the error message alert [INCORE1-714](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-714)
- Link of pyincore-viz documentation [INCORE1-756](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-756)

### Fixed
- Preview period building fragility curves [INCORE1-744](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-744)


## [0.5.1] - 2020-08-04

### Security
- Resolve npm package security alert and remove redundant packages [INCORE1-548](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-548)


## [0.5.0] - 2020-07-28

### Fixed
- Remove null legacyID text in the list of DFR3 curves in DFR3 viewer [INCORE1-541](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-541)

### Added
- Add widget that display custom error message parsed from query parameter "error" in the URL [INCORE1-620](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-620)
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
