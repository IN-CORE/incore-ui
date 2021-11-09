import config from "../app.config";
import Cookies from "universal-cookie";

import {
	getHeader,
} from "./index";

const cookies = new Cookies();

export async function fetchPlot(fragilitySet) {
	let endpoint = `${config.plottingService}`;
	let request = await fetch(endpoint, {method:"post", mode: "cors", headers: getHeader(), body: JSON.stringify(fragilitySet)});
	if (request.status === 200) {
		return [request.status, request.json()];
	}
	else if (request.status === 401) {
		cookies.remove("Authorization");
		return [401, "Not Authorized"];
	}
	else {
		return [request.status, request.json()];
	}
}
