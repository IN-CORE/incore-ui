let config = {};
let hostname = process.env.INCORE_REMOTE_HOSTNAME || "";

config["hostname"] = hostname;
config["semanticService"] = "${hostname}/semantics/api/types";
config["dataWolf"] = `${hostname}/datawolf/`;
config["client_id"] = "react-auth";
config["pyIncoreDocUrl"] = `${hostname}/doc/pyincore/index.html`;
config["pyIncoreVizDocUrl"] = `${hostname}/doc/pyincore_viz/index.html`;
config["pyIncoreDataDocUrl"] = `${hostname}/doc/pyincore_data/index.html`;
config["swaggerUrl"] = `${hostname}/doc/api/`;
config["webVersion"] = "1.6.0";
config["spaceServiceBase"] = `${hostname}/space/api/`;
config["spaceService"] = `${hostname}/space/api/spaces`;
config["dfr3ServiceBase"] = `${hostname}/dfr3/api/`;
config["fragilityService"] = `${hostname}/dfr3/api/fragilities`;
config["hazardServiceBase"] = `${hostname}/hazard/api/`;
config["semanticServiceBase"] = `${hostname}/semantics/api/`;
config["authService"] = `${hostname}/auth/realms/In-core/protocol/openid-connect/token`;
config["dataServiceBase"] = `${hostname}/data/api/`;
config["dataService"] = `${hostname}/data/api/datasets`;
config["incoreLab"] = `${hostname}/hub/`;
config["geoServer"] = `${hostname}/geoserver/incore/wms`;
config["plottingService"] = `${hostname}/plotting/api/samples`;

config["testUserInfo"] = "incrtest";
config["signUpURL"] = "https://identity.ncsa.illinois.edu/register/BSKC2UKQPU";
config["resetPwURL"] = "https://identity.ncsa.illinois.edu/reset";
config["setGravatarURL"] = "https://en.gravatar.com/support/activating-your-account/";
config["tosURL"] = `${hostname}/doc/incore/termsofservice.html`;
config["privacyURL"] = "https://www.vpaa.uillinois.edu/resources/web_privacy";
config["maxUsage"] = {
	incore_user: {
		labUsage: { vCPU: "2", RAM: "4 GB", Storage: "4 GB" }
	},
	incore_coe: {
		labUsage: { vCPU: "4", RAM: "8 GB", Storage: "10 GB" }
	},
	incore_ncsa: {
		labUsage: { vCPU: "4", RAM: "8 GB", Storage: "10 GB" }
	},
	// fall back if user does not belong to any group
	NA: {
		labUsage: { vCPU: "0", RAM: "0 GB", Storage: "0 GB" }
	}
};
config["playbookImageDetails"] = [
	{ app: "Galveston", img: "/public/galveston.jpeg", url: "/playbook/galveston/" },
	{ app: "Salt Lake City", img: "/public/salt-lake-city.jpeg", url: "/playbook/slc/" },
	{ app: "Joplin", img: "/public/joplin-main-street.jpeg", url: "/playbook/joplin/" }
];

config["mailingList"] = "incore-dev@lists.illinois.edu";

export default config;
