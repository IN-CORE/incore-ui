# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).


## [1.11.0] - 2024-04-30

### Changed
- New IN-CORE logo and color palette [#193](https://github.com/IN-CORE/incore-ui/issues/193)

## [1.10.0] - 2024-02-07

### Changed
- Remodel the landing page [#170](https://github.com/IN-CORE/incore-ui/issues/170)
- Hazard viewer previewing hazard datasets [#172](https://github.com/IN-CORE/incore-ui/pull/172)

## [1.9.1] - 2023-12-14

### Security
- Bump loader-utils from 2.0.2 to 2.0.4 [#98](https://github.com/IN-CORE/incore-ui/pull/98)
- Bump json5 from 1.0.1 to 1.0.2 [#101](https://github.com/IN-CORE/incore-ui/pull/101)
- Bump http-cache-semantics from 4.1.0 to 4.1.1 [#103](https://github.com/IN-CORE/incore-ui/pull/103)
- Bump webpack from 5.74.0 to 5.76.0 [#109](https://github.com/IN-CORE/incore-ui/pull/109)
- Bump Browser-Sync version to 2.29.3 [#165](https://github.com/IN-CORE/incore-ui/pull/165)


## [1.9.0] - 2023-11-09

### Added
- Links to Slack channel and mailing list to the landing page [#160](https://github.com/IN-CORE/incore-ui/issues/160)

### Changed
- Missing Filters title for both Data viewer and Semantics Viewer [#156](https://github.com/IN-CORE/incore-ui/issues/156)
- Semantic viewer needs to show description [#157](https://github.com/IN-CORE/incore-ui/issues/157)


## [1.8.0] - 2023-10-11

### Changed
- Read IN-CORE lab quota from service endpoint [#141](https://github.com/IN-CORE/incore-ui/issues/141)
- Change Semantic type api call logic, get complete details at first load instead of fetching on the fly. [#144](https://github.com/IN-CORE/incore-ui/issues/144)
- Add a multi-hazard type Earthquake+Tsunami in DFR3 Viewer [#147](https://github.com/IN-CORE/incore-ui/issues/147)

### Added
- Display DFR3 quota [#137](https://github.com/IN-CORE/incore-ui/issues/137)
- Add Semantic template link in Semantics viewer [#143](https://github.com/IN-CORE/incore-ui/issues/143)


## [1.7.0] - 2023-08-16

### Added
- Added a viewer for Semantics [#122](https://github.com/IN-CORE/incore-ui/issues/122)
- Added clickable link in DataViewer to show semantic definition for datatype [#123](https://github.com/IN-CORE/incore-ui/pull/123)

### Fixed
- When-user-has-no-usage-display-zero-instead-of-undefined [#110](https://github.com/IN-CORE/incore-ui/issues/110)
- Github action to grab correct version when merged to main. [#115](https://github.com/IN-CORE/incore-ui/issues/115)
- Improper functionality when close icon is clicked [#124](https://github.com/IN-CORE/incore-ui/issues/124)


## [1.6.0] - 2023-04-25
### Changed
- Change the getVersionTags scripts to get tags from the central IN-CORE repository.[#104](https://github.com/IN-CORE/incore-ui/issues/104)


## [1.5.0] - 2023-03-15
### Changed
- builds are done on amd64 and then artifact copied to different platforms.

### Added
- Add Community playbook landing page. [#72](https://github.com/IN-CORE/incore-ui/issues/72)


## [1.4.0] - 2022-11-16
### Added
- Typescript configurations and interfaces and types for majority of the objects used in the project [#62](https://github.com/IN-CORE/incore-ui/issues/62)

### Changed
- Remove class based component for login component and associated container to support functional components and hooks [#62](https://github.com/IN-CORE/incore-ui/issues/62)

### Security
- Bump loader-utils from 2.0.2 to 2.0.3 [#94](https://github.com/IN-CORE/incore-ui/pull/94)


## [1.3.0] - 2022-09-14
### Security
- Upgrade webpack from v4 to v5; addressing security vulnerabilities [#86](https://github.com/IN-CORE/incore-ui/issues/86)


## [1.2.0] - 2022-07-27
### Added
- Enable preview of model based EQ [#67](https://github.com/IN-CORE/incore-ui/issues/67)

### Changed
- Use github release instead of github tag to display the latest versions on the landing page [#81](https://github.com/IN-CORE/incore-ui/issues/81)
- Update CHANGELOG link for branch renaming [#78](https://github.com/IN-CORE/incore-ui/issues/78)
- New space/api/usage endpoint to get correct user usage info [#79](https://github.com/IN-CORE/incore-ui/issues/79)
- Use the allocation quota from service endpoint [#69](https://github.com/IN-CORE/incore-ui/issues/69)

### Security
- Bump shell-quote from 1.7.2 to 1.7.3 [#75](https://github.com/IN-CORE/incore-ui/pull/75)
- Bump moment from 2.29.1 to 2.29.4 #76 [#76](https://github.com/IN-CORE/incore-ui/pull/76)


## [1.0.1] - 2022-03-30
### Security
- Bump nanoid from 3.1.23 to 3.2.0 [#53](https://github.com/IN-CORE/incore-ui/pull/53)
- Bump node-sass from 6.0.1 to 7.0.0 [#58](https://github.com/IN-CORE/incore-ui/pull/58)
- Bump follow-redirects from 1.14.1 to 1.14.8 [#59](https://github.com/IN-CORE/incore-ui/pull/59)

## [1.0.0] -2022-02-07

### Changed
- Renamed master branch to main [#50](https://github.com/IN-CORE/incore-ui/issues/50)
- Updating DFR3 fields matching the change of repair/restoration on the backend [#48](https://github.com/IN-CORE/incore-ui/issues/48)
- Tracking frontend usage by each viewer [#37](https://github.com/IN-CORE/incore-ui/issues/37)

## [0.9.9] -2021-12-15

### Added
- UIUC Web Privacy Notification [#42](https://github.com/IN-CORE/incore-ui/issues/42)
- Capability to report error when DFR3 viewer failed to display preview [#19](https://github.com/IN-CORE/incore-ui/issues/19)

### Changed
- Expand and collapse button to toggle the metadata section [#24](https://github.com/IN-CORE/incore-ui/issues/24)


## [0.9.8] -2021-10-27

### Addded
- Preview 3D fragility curves [#21](https://github.com/IN-CORE/incore-ui/issues/21)
- Add Github action to build docker images [#32](https://github.com/IN-CORE/incore-ui/issues/32)
- Add version and changelog for pyincore-data package on the landing page [#20](https://github.com/IN-CORE/incore-ui/issues/20)

### Fixed
- Shift filtering out hazard dataset based on dataset types from frontend to backend [#23](https://github.com/IN-CORE/incore-ui/issues/23)


## [0.9.7] -2021-09-01

### Added
- Create a button in profile page allowing access token copy [INCORE1-1314](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1314)
- Display more information in the fragility preview popup [INCORE1-1338](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1338)


## [0.9.6] - 2021-08-04

### Fixed
- Disable link on Email on the profile page [INCORE1-1329](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1329)

### Added
- Enable new format 2d fragility curve preview supported by plotting service [INCORE1-883](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-883)


## [0.9.5] - 2021-07-31

### Added
- Create a profile component to display user info and quota [INCORE1-1148](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1148)
- Link for pyincore data in the dropdown [ICNORE1-1297](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1297)

### Changed
- Update versioning and tagging of web tool docker images [INCORE1-1261](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1261)
- Sort "spaces" dropdown on viewers alphabetically [INCORE1-1312](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1312)


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
