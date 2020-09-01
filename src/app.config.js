let apiprotocol = "https";

let config = {};
let apihost;
let apiurl;

if (process.env.DEPLOY_ENV === "production"){
	apihost = "incore.ncsa.illinois.edu";
	apiurl = `${apiprotocol}://${apihost}`;
	config = {
		geoServer: "https://incore-geoserver.ncsa.illinois.edu/geoserver/incore/wms",
	};
}
else if(process.env.DEPLOY_ENV === "test"){
	apihost = "incore-test-kube.ncsa.illinois.edu";
	apiurl = `${apiprotocol}://${apihost}`;
	config = {
		geoServer: "https://incore-test-kube.ncsa.illinois.edu/geoserver/incore/wms",
	};
}
else if (process.env.DEPLOY_ENV === "local"){
	apihost = "localhost:8080";
	apiurl = `http://${apihost}`;
	config = {
		geoServer: "https://incore-test-kube.ncsa.illinois.edu/geoserver/incore/wms",
	};
}
else { // default case that used dev environment
	apihost = "incore-dev-kube.ncsa.illinois.edu";
	apiurl = `${apiprotocol}://${apihost}`;
	config = {
		geoServer: "https://incore-dev-kube.ncsa.illinois.edu/geoserver/incore/wms",
	};
}
config["semanticService"] = "";
config["dataWolf"] = "https://incore2-datawolf.ncsa.illinois.edu/datawolf/";
config["client_id"] = "react-auth";
config["pyIncoreDocUrl"] = "/doc/pyincore/index.html";
config["pyIncoreVizDocUrl"] = "/doc/pyincore_viz/index.html";
config["swaggerUrl"] = "/doc/api/";
config["webVersion"] = "0.5.1";
config["spaceService"] = `${apiurl}/space/api/spaces`;
config["dfr3Service"] = `${apiurl}/dfr3/api/`;
config["fragilityService"] = `${apiurl}/dfr3/api/fragilities`;
config["hazardServiceBase"] = `${apiurl}/hazard/api/`;
config["authService"] =  `${apiurl}/auth/realms/In-core/protocol/openid-connect/token`;
config["dataServiceBase"] = `${apiurl}/`;
config["dataService"] =  `${apiurl}/data/api/datasets`;
config["incoreLab"] = `${apiurl}/lab`;
config["testUserInfo"] = "incrtest";

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
