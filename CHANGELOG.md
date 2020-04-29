# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## Changed
- Fixed all ESLint errors and some warnings. Mostly related to indentations, string notations etc. Some eslint warnnings still remain. [INCORE1-529](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-529)

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
