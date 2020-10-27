let apiprotocol = "https";

let config = {};
let apihost;
let apiurl;

if (process.env.DEPLOY_ENV === "production") {
	apihost = "incore.ncsa.illinois.edu";
	apiurl = `${apiprotocol}://${apihost}`;
	config = {
		geoServer: "https://incore-geoserver.ncsa.illinois.edu/geoserver/incore/wms",
	};
} else if (process.env.DEPLOY_ENV === "test") {
	apihost = "incore-test-kube.ncsa.illinois.edu";
	apiurl = `${apiprotocol}://${apihost}`;
	config = {
		geoServer: "https://incore-test-kube.ncsa.illinois.edu/geoserver/incore/wms",
	};
} else if (process.env.DEPLOY_ENV === "local") {
	apihost = "localhost:8080";
	apiurl = `http://${apihost}`;
	config = {
		geoServer: "https://incore-test-kube.ncsa.illinois.edu/geoserver/incore/wms",
	};
} else if (process.env.DEPLOY_ENV === "develop") {
	apihost = "incore-dev-kube.ncsa.illinois.edu";
	apiurl = `${apiprotocol}://${apihost}`;
	config = {
		geoServer: "https://incore-dev-kube.ncsa.illinois.edu/geoserver/incore/wms",
	};
} else { // default case that used dev environment
	apihost = "";
	apiurl = "";
	config = {
		geoServer: "/geoserver/incore/wms",
	};
}
config["semanticService"] = "";
config["dataWolf"] = "https://incore2-datawolf.ncsa.illinois.edu/datawolf/";
config["client_id"] = "react-auth";
config["pyIncoreDocUrl"] = "/doc/pyincore/index.html";
config["pyIncoreVizDocUrl"] = "/doc/pyincore_viz/index.html";
config["swaggerUrl"] = "/doc/api/";
config["webVersion"] = "0.7.0";
config["spaceService"] = `${apiurl}/space/api/spaces`;
config["dfr3Service"] = `${apiurl}/dfr3/api/`;
config["fragilityService"] = `${apiurl}/dfr3/api/fragilities`;
config["hazardServiceBase"] = `${apiurl}/hazard/api/`;
config["authService"] = `${apiurl}/auth/realms/In-core/protocol/openid-connect/token`;
config["dataServiceBase"] = `${apiurl}/`;
config["dataService"] = `${apiurl}/data/api/datasets`;
config["incoreLab"] = `${apiurl}/lab`;
config["testUserInfo"] = "incrtest";

export default config;
