let config = {};
let hostname = process.env.INCORE_REMOTE_HOSTNAME || "";

config["hostname"] = hostname;
config["semanticService"] = "";
config["dataWolf"] = `${hostname}/datawolf/`;
config["client_id"] = "react-auth";
config["pyIncoreDocUrl"] = `${hostname}/doc/pyincore/index.html`;
config["pyIncoreVizDocUrl"] = `${hostname}/doc/pyincore_viz/index.html`;
config["pyIncoreDataDocUrl"] = `${hostname}/doc/pyincore_data/index.html`;
config["swaggerUrl"] = `${hostname}/doc/api/`;
config["webVersion"] = "0.9.5";
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
config["signUpURL"] = "https://identity.ncsa.illinois.edu/register/BSKC2UKQPU";
config["resetPwURL"] = "https://identity.ncsa.illinois.edu/reset";
config["setGravatarURL"] = "https://en.gravatar.com/support/activating-your-account/";
config["tosURL"] = `${hostname}/doc/incore/termsofservice.html`;
config["privacyURL"] = "https://www.vpaa.uillinois.edu/resources/web_privacy";
config["maxUsage"] = {
	"incore_user":{
		"datasetUsage":{"entity":200, "fileSize":"2 GB", "fileSizeByte": 2*1024*1024*1024},
		"hazardUsage":{"entity": 200, "fileSize":"2 GB", "fileSizeByte": 2*1024*1024*1024},
		"labUsage":{ "vCPU": "2", "RAM": "4 GB", "Storage":"4 GB"}
	},
	"incore_coe":{
		"datasetUsage":{"entity":500, "fileSize":"5 GB", "fileSizeByte": 5*1024*1024*1024},
		"hazardUsage":{"entity": 500, "fileSize":"5 GB", "fileSizeByte": 5*1024*1024*1024},
		"labUsage":{ "vCPU": "4", "RAM": "8 GB", "Storage":"10 GB"}
	},
	"incore_ncsa":{
		"datasetUsage":{"entity":1000, "fileSize":"10 GB", "fileSizeByte": 10*1024*1024*1024},
		"hazardUsage":{"entity": 1000, "fileSize":"10 GB", "fileSizeByte": 10*1024*1024*1024},
		"labUsage":{ "vCPU": "4", "RAM": "8 GB", "Storage":"10 GB"}
	},
	// fall back if user does not belong to any group
	"NA":{
		"datasetUsage":{"entity":0, "fileSize":"0 GB", "fileSizeByte": 0*1024*1024*1024},
		"hazardUsage":{"entity": 0, "fileSize":"0 GB", "fileSizeByte": 0*1024*1024*1024},
		"labUsage":{ "vCPU": "0", "RAM": "0 GB", "Storage":"0 GB"}
	}
};

export default config;
