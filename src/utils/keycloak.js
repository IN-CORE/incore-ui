import Keycloak from "keycloak-js";
import config from "../app.config";

let keycloakConfig = config.keycloakConfig;
const keycloak = new Keycloak(keycloakConfig);

// A Keycloak instance can only be initialized once, but React 18 StrictMode
// invokes effects twice in development, and a remount would call this again in
// production. Memoize the promise so every caller awaits the same init.
let initPromise = null;

export const initKeycloak = (options) => {
	if (initPromise === null) {
		initPromise = keycloak.init(options);
	}

	return initPromise;
};

export default keycloak;
