// More info on Webpack"s Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.

/* eslint-disable no-console */
import webpack from "webpack";
import prodConfig from "../webpack.config.prod";
import devConfig from "../webpack.config.dev";
import { chalkError, chalkSuccess, chalkWarning, chalkProcessing } from "./chalkConfig";

if (process.env.NODE_ENV === "production"){
	let config = prodConfig;
	console.log(chalkProcessing("Building from PRODUCTION configuration..."))
}
else{
	let config = devConfig;
	console.log(chalkProcessing("Building from DEVELOPMENT configuration..."))
}
console.log(chalkProcessing("Generating minified bundle. This will take a moment..."));

webpack(config).run((error, stats) => {
	if (error) { // so a fatal error occurred. Stop here.
		console.log(chalkError(error));
		return 1;
	}

	const jsonStats = stats.toJson();

	if (stats.hasErrors()) {
		return jsonStats.errors.map(error => console.log(chalkError(error)));
	}

	if (stats.hasWarnings()) {
		console.log(chalkWarning("Webpack generated the following warnings: "));
		jsonStats.warnings.map(warning => console.log(chalkWarning(warning)));
	}

	console.log(`Webpack stats: ${stats}`);

	// if we got this far, the build succeeded.
	console.log(chalkSuccess("Your app is compiled in production mode in /dist. It\"s ready to roll!"));

	return 0;
});
