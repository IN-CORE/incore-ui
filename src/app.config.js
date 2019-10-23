let prefix = process.env.basePath === "/" ? "" : process.env.basePath;
let apiprotocol = "https";
let apihost = "incore2-services.ncsa.illinois.edu";
let apiurl = `${apiprotocol}://${apihost}`;

const config = {
	spaceService:`${apiurl}/space/api/spaces`,
	dfr3Service:`${apiurl}/dfr3/api/`,
	fragilityService: `${apiurl}/dfr3/api/fragilities`,
	semanticService: "",
	hazardServiceBase: `${apiurl}/hazard/api/`,
	maestroService: `${apiurl}/maestro`,
	authService: `${apiurl}/auth/api/login`,
	dataServiceBase: `${apiurl}/`,
	dataService: `${apiurl}/data/api/datasets`,
	dataWolf: "https://incore2-datawolf.ncsa.illinois.edu/datawolf/",
	incoreLab: "https://incore-lab.ncsa.illinois.edu/",
	geoServer: "https://incore2-services.ncsa.illinois.edu/geoserver/incore/wms",
	baseUrl: process.env.basePath,
	urlPrefix: prefix,
	pyIncoreDocUrl:"/doc/pyincore/index.html",
	swaggerUrl:"/doc/api",
	pyincoreVersion:"0.5.2",
	webVersion:"0.3.2"
};

export default config;

export const uniqueDataType = [
	"All",
	"ergo:buildingDisruptionCost",
	"ergo:buildingIndoorDeathFractions",
	"ergo:buildingIndoorInjuryFractions",
	"ergo:buildingInitialProjectCost",
	"ergo:buildingPercentOwnerOccupied",
	"ergo:buildingRecoveryTime",
	"ergo:buildingRecoveryTimeMultiplier",
	"ergo:buildingRentalCost",
	"ergo:utilityFunctionTable",
	"ergo:buildingFireIgnitionOccupancy",
	"ergo:buildingFireIgnitionThreshold",
	"ergo:buildingInventoryVer5",
	"ergo:deepsoilLongPeriodSiteFactors",
	"ergo:deepsoilShortPeriodSiteFactors",
	"ergo:demSlopePolygon",
	"ergo:hazardEvent",
	"ergo:longPeriodSiteFactors",
	"ergo:shortPeriodSiteFactors",
	"ergo:toroSilvaGeologyPolgyon",
	"ergo:torosilvaLongPeriodSiteFactors",
	"ergo:torosilvaShortPeriodSiteFactors",
	"ergo:electricPowerPlantFragilityMapping",
	"ergo:hzElectricPowerFacilityFragilityMapping",
	"ergo:hzElectricPowerTankFragilities",
	"ergo:hzPipelineFragilities",
	"ergo:hzPipelineFragilityMapping",
	"ergo:hzPotableWaterFacilityFragilityMapping",
	"ergo:hzPotableWaterTankFragilities",
	"ergo:gasFacilityInventory",
	"ergo:gasFacilityTopology",
	"ergo:gasUtilNetwork",
	"ergo:maevizWaterUtilNetwork",
	"ergo:powerUtilNetwork",
	"ergo:buriedPipeFragilityMapping",
	"ergo:buriedPipelineInventory2",
	"ergo:buriedPipelineTopology",
	"ergo:electricFragilities",
	"ergo:electricSubstationFragilityMapping",
	"ergo:electricSubstationInventory",
	"ergo:gasFacilityFragilities",
	"ergo:gasFacilityFragilityMapping",
	"ergo:lifelineElecInventory",
	"ergo:lifelineWaterInventory",
	"ergo:lifelineWaterTankFragilityMapping",
	"ergo:pipelineFragilities",
	"ergo:powerFacilityTopo",
	"ergo:powerLineTopo",
	"ergo:waterFacilityTopo",
	"ergo:waterTankFragilities",
	"ergo:demandProfileTable",
	"ergo:odTableFile",
	"ergo:originDestinationTable",
	"ergo:roadLinkTopo",
	"ergo:roadNetwork",
	"ergo:roadNetworkVer2",
	"ergo:roadNodeTopo",
	"ergo:interdependentMatrixTable",
	"ergo:bridgeDamage",
	"ergo:bridgeDamageRatios",
	"ergo:bridgeFragilities",
	"ergo:bridgeFragilityMapping",
	"ergo:bridgeFunctionality",
	"ergo:bridgeReplacementData",
	"ergo:bridgeRetrofitCost",
	"ergo:bridgeRetrofitCostEstimationResult",
	"ergo:bridges",
	"ergo:buildingASDamageRatios",
	"ergo:buildingContentDamageRatios",
	"ergo:buildingDSDamageRatios",
	"ergo:buildingDamageRatios",
	"ergo:buildingDamageVer4",
	"ergo:buildingEconomicLossVer4",
	"ergo:buildingFragilities",
	"ergo:buildingFragilityMapping",
	"ergo:buildingInventoryVer4",
	"ergo:buildingNSContentDamageV4",
	"ergo:buildingNSFragilities",
	"ergo:buildingOccupancyDamageMultiplier",
	"ergo:buildingOccupancyMapping",
	"ergo:buildingRepairCost",
	"ergo:buildingRetrofitCost",
	"ergo:censustract",
	"ergo:county",
	"ergo:cpiTable",
	"ergo:defaultSeismicSources",
	"ergo:demRaster",
	"ergo:deterministicHazardRaster",
	"ergo:embaymentPolygon",
	"ergo:freeway",
	"ergo:geology",
	"ergo:hazardRaster",
	"ergo:liquefactionSusceptibilityPolygon",
	"ergo:shelbyTNHazardLPICoefficients",
	"ergo:shelbyTNHazardLPIMagnitudeScaling",
	"ergo:soilDepthRaster",
	"ergo:soilTypes",
	"ergo:surficialGeology",
	"ergo:zipCodeArea",
	"ergo:censusdata",
	"ergo:annualGrossSalesOrProduction",
	"ergo:buildingIndoorCasualtiesTable",
	"ergo:buildingPopulationDislocation",
	"ergo:businessInventory",
	"ergo:businessRecaptureFactors",
	"ergo:contentsDamageRatios",
	"ergo:percentBusinessInventoryDamage",
	"ergo:potentialHazards",
	"ergo:proprietorsIncomeTable",
	"ergo:socialScienceDevelopedArea",
	"ergo:tempHousingBldgPerformanceTable",
	"ergo:tempHousingBldgTypesTable",
	"ergo:temporaryHousingAlternatives",
	"ergo:temporaryHousingEnvironmentalAreas",
	"ergo:socialvulnerability",
	"ergo:Scenarios",
	"ergo:anonymousLineString",
	"ergo:anonymousPoint",
	"ergo:anonymousPolygon",
	"ergo:defaultset",
	"ergo:demSlopeRaster",
	"http://localhost:8080/semantics/edu.illinois.ncsa.ergo.eq.schemas.buildingDamageVer4.v1.0",
	"Unknown",
	"http://localhost:8080/semantics/edu.illinois.ncsa.ergo.eq.schemas.deterministicHazardRaster.v1.0",
	"http://localhost:8080/semantics/edu.illinois.ncsa.incore.tornado.hazard.schemas.tornadohazard.v1.0",
	"edu.illinois.ncsa.ergo.eq.schemas.deterministicHazardRaster.v1.0",
	"edu.illinois.ncsa.ergo.eq.schemas.censustract.v1.0",
	"incore:epnNodeVer1",
	"incore:epnLinkeVer1",
	"tornadowindfield",
	"deterministicHazardRaster",
	"incore:TornadoEpnDamageVer1",
	"boundary",
	"probabilisticHazardRaster",
	"incore:EPNRecoveryVer1",
	"probabilisticTsunamiRaster",
	"HurricaneDataset",
	"ergo:PopAllocation",
	"ergo:blockGroupData",
	"ergo:censusBlockPopulation",
	"ergo:addressPoints",
	"ergo:buildingInventory",
	"incore:waternodeBuildingRelations",
	"incore:waterNetworkDemand",
	"incore:waterNetworkEpanetInp",
	"ergo:pipelineDamage",
	"ergo:pumpDamage",
	"ergo:lifelineWaterTankInventoryDamage",
	"incore:pipeZoning",
	"incore:waterFacility",
	"incore:waterPipeline",
	"incore:ADT",
	"incore:bridgeDamageValue",
	"incore:unrepairedBridge",
	"incore:NBR",
	"incore:portfolioBuildingInventory",
	"incore:portfolioOccupancyMapping",
	"incore:portfolioBuildingDamage",
	"incore:portfolioDamageRatios",
	"incore:portfolioUtilityAvailability",
	"incore:portfolioCoefficients",
	"pytest - edu.illinois.ncsa.ergo.eq.schemas.censustract.v1.0",
	"ergo:test"];
