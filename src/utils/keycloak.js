import Keycloak from "keycloak-js";
import config from "../app.config";

let keycloakConfig = config.keycloakConfig;
const keycloak = new Keycloak(keycloakConfig);
export default keycloak;

