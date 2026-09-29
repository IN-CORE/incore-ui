/* eslint-disable */
// Runs as an npm "preinstall" script, before any dependency is installed.
// Keep this file dependency-free CommonJS so it works on any Node version.

var MIN_MAJOR = 20;

var major = parseInt(process.versions.node.split(".")[0], 10);

if (major < MIN_MAJOR) {
	throw new Error(
		"incore-ui requires Node " +
			MIN_MAJOR +
			" or greater (found " +
			process.versions.node +
			"). See .nvmrc for the version used in CI and Docker."
	);
}
