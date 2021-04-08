let config = {};
let hostname = process.env.INCORE_REMOTE_HOSTNAME || "";

config["hostname"] = hostname;
config["semanticService"] = "";
config["dataWolf"] = `${hostname}/datawolf/`;
config["client_id"] = "react-auth";
config["pyIncoreDocUrl"] = `${hostname}/doc/pyincore/index.html`;
config["pyIncoreVizDocUrl"] = `${hostname}/doc/pyincore_viz/index.html`;
config["swaggerUrl"] = `${hostname}/doc/api/`;
config["webVersion"] = "0.9.1";
config["spaceService"] = `${hostname}/space/api/spaces`;
config["dfr3Service"] = `${hostname}/dfr3/api/`;
config["fragilityService"] = `${hostname}/dfr3/api/fragilities`;
config["hazardServiceBase"] = `${hostname}/hazard/api/`;
config["authService"] = `${hostname}/auth/realms/In-core/protocol/openid-connect/token`;
config["dataServiceBase"] = `${hostname}/data/api/`;
config["dataService"] = `${hostname}/data/api/datasets`;
config["incoreLab"] = `${hostname}/hub/`;
config["geoServer"] = `${hostname}/geoserver/incore/wms`;
config["testUserInfo"] = "incrtest";
config["hazardDatasetTypes"] = [
	"ergo:probabilisticEarthquakeRaster",
	"ergo:deterministicEarthquakeRaster",
	"incore:probabilisticTsunamiRaster",
	"incore:deterministicTsunamiRaster",
	"incore:probabilisticHurricaneRaster",
	"incore:deterministicHurricaneRaster",
	"incore:hurricaneGridSnapshot",
	"incore:tornadoWindfield",
	"incore:deterministicFloodRaster",
	"incore:probabilisticFloodRaster",
	"ergo:hazardRaster"
];

export default config;
