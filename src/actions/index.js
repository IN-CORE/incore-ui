import Cookies from "universal-cookie";
import config from "../app.config";

const cookies = new Cookies();

export const GET_ANALYSES = "GET_ANALYSES";

export const RECEIVE_ANALYSES = "RECEIVE_ANALYSES";

export const DELETE_ITEM = "DELETE_ITEM";
export const DELETE_ERROR = "DELETE_ERROR";
export const RESET_ERROR = "RESET_ERROR";
export const resetError = {
	type: RESET_ERROR
};

export function receiveAnalyses(api, json) {
	return (dispatch) => {
		dispatch({
			type: RECEIVE_ANALYSES,
			analyses: json
		});
	};
}

export const RECEIVE_ANALYSIS = "RECEIVE_ANALYSIS";

export function receiveAnalysis(api, json) {
	return (dispatch) => {
		dispatch({
			type: RECEIVE_ANALYSIS,
			analysis: json
		});
	};
}

export const RECEIVE_DATASETS = "RECEIVE_DATASETS";

export function receiveDatasets(type, json) {
	return (dispatch) => {
		dispatch({
			type: type,
			datasets: json
		});
	};
}

export const RECEIVE_USAGE = "RECEIVE_USAGE";
export const RECEIVE_LAB_USAGE = "RECEIVE_LAB_USAGE";

export function receieveUsage(type, json) {
	return (dispatch) => {
		dispatch({
			type: type,
			usage: json
		});
	};
}

export function deleteItem(type, json) {
	return (dispatch) => {
		dispatch({
			type: type,
			item: json
		});
	};
}

export function deleteItemById(resourceType, id) {
	let endpoint = "";
	if (resourceType === "datasets") {
		endpoint = `${config.dataService}/${id}`;
	} else if (
		resourceType === "mappings" ||
		resourceType === "fragilities" ||
		resourceType === "restorations" ||
		resourceType === "repairs"
	) {
		endpoint = `${config.dfr3ServiceBase}${resourceType}/${id}`;
	} else if (
		resourceType === "earthquakes" ||
		resourceType === "tsunamis" ||
		resourceType === "floods" ||
		resourceType === "tornadoes" ||
		resourceType === "hurricanes" ||
		resourceType === "hurricaneWindfields"
	) {
		endpoint = `${config.hazardServiceBase}${resourceType}/${id}`;
	}
	return (dispatch) => {
		return fetch(endpoint, {mode: "cors", method: "DELETE", headers: getHeader()})
		.catch((error) => { dispatch(deleteItem(FORBIDDEN, []));})
		.then((response) => {
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(deleteItem(DELETE_ITEM, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(deleteItem(LOGIN_ERROR, []));
			} else if (response.status === 403) {
				dispatch(deleteItem(FORBIDDEN, []));
			} else {
				dispatch(deleteItem(DELETE_ERROR, null));
			}
		});
	};
}

export const RECEIVE_HAZARDS = "RECEIVE_HAZARDS";

export function receiveHazards(type, json) {
	return (dispatch) => {
		dispatch({
			type: type,
			hazards: json
		});
	};
}

export const RECEIVE_DFR3_CURVES = "RECEIVE_DFR3_CURVES";

export function receiveDFR3Curves(type, json) {
	return (dispatch) => {
		dispatch({
			type: type,
			dfr3Curves: json
		});
	};
}

export const RECEIVE_DFR3_MAPPINGS = "RECEIVE_DFR3_MAPPINGS";

export function receiveDFR3Mappings(type, json) {
	return (dispatch) => {
		dispatch({
			type: type,
			dfr3Mappings: json
		});
	};
}

export const RECEIVE_SPACES = "RECEIVE_SPACES";

export function receiveSpaces(type, json) {
	return (dispatch) => {
		dispatch({
			type: type,
			spaces: json
		});
	};
}

export const RECEIVE_DATATYPES = "RECEIVE_DATATYPES";

export function receiveDatatypes(type, json) {
	return (dispatch) => {
		dispatch({
			type: type,
			datatypes: json
		});
	};
}

export function searchDatasets(keyword, limit, offset) {
	let endpoint = `${config.dataService}/search?excludeHazard=true&limit=${limit}&skip=${offset}&text=${keyword}`;
	return (dispatch) => {
		dispatch(loading(DATA_LOADING));
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
		.catch((error) => { dispatch(receiveDatasets(FORBIDDEN, []));})
		.then((response) => {
			dispatch(loadComplete(DATA_LOAD_COMPLETE));
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveDatasets(RECEIVE_DATASETS, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveDatasets(LOGIN_ERROR, []));
			} else if (response.status === 403) {
				dispatch(receiveDatasets(FORBIDDEN, []));
			} else {
				dispatch(receiveDatasets(RECEIVE_DATASETS, []));
			}
		});
	};
}

export function fetchDatasets(dataType, space, limit, offset) {
	let endpoint = `${config.dataService}?excludeHazard=true&limit=${limit}&skip=${offset}`;
	if (dataType !== null && dataType !== "All") {
		endpoint = `${endpoint}&type=${dataType}`;
	}
	if (space !== null && space !== "All") {
		endpoint = `${endpoint}&space=${space}`;
	}

	return (dispatch) => {
		dispatch(loading(DATA_LOADING));
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
		.catch((error) => { dispatch(receiveDatasets(FORBIDDEN, []));})
		.then((response) => {
			dispatch(loadComplete(DATA_LOAD_COMPLETE));
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveDatasets(RECEIVE_DATASETS, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveDatasets(LOGIN_ERROR, []));
			} else if (response.status === 403) {
				dispatch(receiveDatasets(FORBIDDEN, []));
			} else {
				dispatch(receiveDatasets(RECEIVE_DATASETS, []));
			}
		});
	};
}

export function fetchUsage() {
	let endpoint = `${config.spaceServiceBase}usage`;
	return (dispatch) => {
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
		.catch((error) => {dispatch(receieveUsage(FORBIDDEN, []));})
		.then((response) => {
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receieveUsage(RECEIVE_USAGE, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receieveUsage(LOGIN_ERROR, {}));
			} else if (response.status === 403) {
				dispatch(receieveUsage(FORBIDDEN, []));
			} else {
				dispatch(receieveUsage(RECEIVE_USAGE, {}));
			}
		});
	};
}

export function fetchLabUsage() {
	// TODO implment
	return (dispatch) => {
		let json = {
			user: "commresilience",
			total_number_of_datasets: 50,
			total_file_size: "800MB",
			total_file_size_byte: 800 * 1024 * 8
		};
		dispatch(receieveUsage(RECEIVE_LAB_USAGE, json));
	};
}

export function fetchSpaces() {
	const endpoint = config.spaceService;
	return (dispatch) => {
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
		.catch((error) => {dispatch(receiveSpaces(FORBIDDEN, []));})
		.then((response) => {
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveSpaces(RECEIVE_SPACES, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveSpaces(LOGIN_ERROR, []));
			} else if (response.status === 403) {
				dispatch(receiveSpaces(FORBIDDEN, []));
			} else {
				dispatch(receiveSpaces(RECEIVE_SPACES, []));
			}
		});
	};
}

export const RECEIVE_ALLOCATIONS = "RECEIVE_ALLOCATIONS";

export function fetchAllocations() {
	const endpoint = `${config.spaceServiceBase}allocations`;
	return (dispatch) => {
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
		.catch((error) => {
			dispatch({
				type: FORBIDDEN,
				usage: {},
				receivedAt: Date.now()
			});
		})
		.then((response) => {
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch({
						type: RECEIVE_ALLOCATIONS,
						allocations: json,

					});
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch({
					type: LOGIN_ERROR,
					usage: {},

				});
			} else if (response.status === 403) {
				dispatch({
					type: FORBIDDEN,
					usage: {},
					receivedAt: Date.now()
				});
			} else {
				dispatch({
					type: RECEIVE_ALLOCATIONS,
					usage: {},

				});
			}
		});
	};
}

export function fetchUniqueDatatypes() {
	let endpoint = `${config.dataServiceBase}datatypes`;
	return (dispatch) => {
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
		.catch((error) => {
			dispatch({
				type: FORBIDDEN,
				datatypes: {},
				receivedAt: Date.now(),
			});
		})
		.then((response) => {
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveDatatypes(RECEIVE_DATATYPES, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveDatatypes(LOGIN_ERROR, []));
			} else if (response.status === 403) {
				dispatch(receiveDatatypes(FORBIDDEN, []));
			} else {
				dispatch(receiveDatatypes(RECEIVE_DATATYPES, []));
			}
		});
	};
}

export function searchDFR3Curves(dfr3_type, keyword, limit, offset) {
	let endpoint = `${config.dfr3ServiceBase}${dfr3_type}/search?limit=${limit}&skip=${offset}&text=${keyword}`;
	return (dispatch) => {
		loading(DFR3CURVE_LOADING)(dispatch);
		return fetch(endpoint, { mode: "cors", headers: getHeader() })
		.catch((error) => {dispatch(receiveDFR3Curves(FORBIDDEN, []));})
		.then((response) => {
			loadComplete(DFR3CURVE_LOAD_COMPLETE)(dispatch)
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveDFR3Curves(RECEIVE_DFR3_CURVES, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveDFR3Curves(LOGIN_ERROR, []));
			} else if (response.status === 403) {
				dispatch(receiveDFR3Curves(FORBIDDEN, []));
			} else {
				dispatch(receiveDFR3Curves(RECEIVE_DFR3_CURVES, []));
			}
		});
	};
}

export function fetchDFR3Curves(dfr3_type, space, inventory, hazard, limit, offset) {
	let endpoint = `${config.dfr3ServiceBase}${dfr3_type}?limit=${limit}&skip=${offset}`;
	if (space !== null && space !== "All") {
		endpoint = `${endpoint}&space=${space}`;
	}
	if (inventory !== null && inventory !== "All") {
		endpoint = `${endpoint}&inventory=${inventory}`;
	}
	if (hazard !== null && hazard !== "All") {
		endpoint = `${endpoint}&hazard=${hazard}`;
	}
	return (dispatch) => {
		loading(DFR3CURVE_LOADING)(dispatch);
		return fetch(endpoint, { mode: "cors", headers: getHeader() })
		.catch((error) => {dispatch(receiveDFR3Curves(FORBIDDEN, []));})
		.then((response) => {
			loadComplete(DFR3CURVE_LOAD_COMPLETE)(dispatch);
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveDFR3Curves(RECEIVE_DFR3_CURVES, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveDFR3Curves(LOGIN_ERROR, []));
			} else if (response.status === 403) {
				dispatch(receiveDFR3Curves(FORBIDDEN, []));
			} else {
				dispatch(receiveDFR3Curves(RECEIVE_DFR3_CURVES, []));
			}
		});
	};
}

//TODO: Move this to app.config?
export function getMappingTypeFromDFR3Url(dfr3_type) {
	switch (dfr3_type.toLowerCase()) {
		case "fragilities":
			return "fragility";
		case "repairs":
			return "repair";
		case "restorations":
			return "restoration";
	}
}

export function fetchDFR3Mappings(dfr3_type, space, inventory, hazard, limit, offset) {
	let endpoint = `${config.dfr3ServiceBase}mappings?limit=${limit}&skip=${offset}`;

	if (dfr3_type !== null && dfr3_type !== "All") {
		dfr3_type = getMappingTypeFromDFR3Url(dfr3_type);

		endpoint = `${endpoint}&mappingType=${dfr3_type}`;
	}
	if (space !== null && space !== "All") {
		endpoint = `${endpoint}&space=${space}`;
	}
	if (inventory !== null && inventory !== "All") {
		endpoint = `${endpoint}&inventory=${inventory}`;
	}
	if (hazard !== null && hazard !== "All") {
		endpoint = `${endpoint}&hazard=${hazard}`;
	}

	return (dispatch) => {
		loading(DFR3MAPPING_LOADING)(dispatch);
		return fetch(endpoint, { mode: "cors", headers: getHeader() })
		.catch((error) => {dispatch(receiveDFR3Mappings(FORBIDDEN, []));})
		.then((response) => {
			loadComplete(DFR3MAPPING_LOAD_COMPLETE)(dispatch);
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveDFR3Mappings(RECEIVE_DFR3_MAPPINGS, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveDFR3Mappings(LOGIN_ERROR, []));
			} else if (response.status === 403) {
				dispatch(receiveDFR3Mappings(FORBIDDEN, []));
			} else {
				dispatch(receiveDFR3Mappings(RECEIVE_DFR3_MAPPINGS, []));
			}
		});
	};
}

export function searchDFR3Mappings(dfr3_type, keyword, limit, offset) {
	let endpoint = `${config.dfr3ServiceBase}mappings/search?limit=${limit}&skip=${offset}&text=${keyword}`;

	if (dfr3_type !== null && dfr3_type !== "All") {
		dfr3_type = getMappingTypeFromDFR3Url(dfr3_type);

		endpoint = `${endpoint}&mappingType=${dfr3_type}`;
	}

	return (dispatch) => {
		loading(DFR3MAPPING_LOADING)(dispatch);
		return fetch(endpoint, { mode: "cors", headers: getHeader() })
		.catch((error) => {dispatch(receiveDFR3Mappings(FORBIDDEN, []));})
		.then((response) => {
			loadComplete(DFR3MAPPING_LOAD_COMPLETE)(dispatch);
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveDFR3Mappings(RECEIVE_DFR3_MAPPINGS, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveDFR3Mappings(LOGIN_ERROR, []));
			} else if (response.status === 403) {
				dispatch(receiveDFR3Mappings(FORBIDDEN, []));
			} else {
				dispatch(receiveDFR3Mappings(RECEIVE_DFR3_MAPPINGS, []));
			}
		});
	};
}

export function searchHazards(hazard_type, keyword, limit, offset) {
	let endpoint = `${config.hazardServiceBase}${hazard_type}/search?limit=${limit}&skip=${offset}&text=${keyword}`;
	return (dispatch) => {
		dispatch(loading(HAZARD_LOADING));
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
		.catch((error) => {dispatch(receiveHazards(FORBIDDEN, []));})
		.then((response) => {
			dispatch(loadComplete(HAZARD_LOAD_COMPLETE));
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveHazards(RECEIVE_HAZARDS, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveHazards(LOGIN_ERROR, []));
			} else if (response.status === 403) {
				dispatch(receiveHazards(FORBIDDEN, []));
			} else {
				dispatch(receiveHazards(RECEIVE_HAZARDS, []));
			}
		});
	};
}

export function fetchHazards(hazard_type, space, limit, offset) {
	let endpoint = `${config.hazardServiceBase}${hazard_type}?limit=${limit}&skip=${offset}`;
	if (space !== null && space !== "All") {
		endpoint = `${endpoint}&space=${space}`;
	}
	return (dispatch) => {
		dispatch(loading(HAZARD_LOADING));
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
		.catch((error) => {dispatch(receiveHazards(FORBIDDEN, []));})
		.then((response) => {
			dispatch(loadComplete(HAZARD_LOAD_COMPLETE));
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveHazards(RECEIVE_HAZARDS, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveHazards(LOGIN_ERROR, []));
			} else if (response.status === 403) {
				dispatch(receiveHazards(FORBIDDEN, []));
			} else {
				dispatch(receiveHazards(RECEIVE_HAZARDS, []));
			}
		});
	};
}

export const LOGIN_ERROR = "LOGIN_ERROR";
export const FORBIDDEN = "FORBIDDEN";
export const SET_USER = "SET_USER";

export function login(authJSON) {
	return (dispatch) => {
		if (authJSON !== undefined) {
			// TODO: Add expiration time
			cookies.set("Authorization", `bearer ${authJSON.token}`, {maxAge: authJSON.tokenValidity});
			return dispatch({
				type: SET_USER,
				Authorization: `bearer ${authJSON["token"]}`
			});
		} else {
			return dispatch({
				type: LOGIN_ERROR
			});
		}
	};
}

export const LOGOUT = "LOGOUT";

export function logout() {
	return (dispatch) => {
		cookies.remove("Authorization");
		return dispatch({
			type: LOGOUT
		});
	};
}

export const DATA_LOADING = "DATA_LOADING";
export const DATA_LOAD_COMPLETE = "DATA_LOAD_COMPLETE";
export const HAZARD_LOADING = "HAZARD_LOADING";
export const HAZARD_LOAD_COMPLETE = "HAZARD_LOAD_COMPLETE";
export const DFR3CURVE_LOADING = "DFR3CURVE_LOADING";
export const DFR3CURVE_LOAD_COMPLETE = "DFR3CURVE_LOAD_COMPLETE";
export const DFR3MAPPING_LOADING = "DFR3MAPPING_LOADING";
export const DFR3MAPPING_LOAD_COMPLETE = "DFR3MAPPING_LOAD_COMPLETE";
export const SEMANTIC_LOADING = "SEMANTIC_LOADING";
export const SEMANTIC_LOAD_COMPLETE = "SEMANTIC_LOAD_COMPLETE";

export function loading(component) {
	return (dispatch) => {
		return dispatch({
			type: component
		});
	};
}

export function loadComplete(component) {
	return (dispatch) => {
		return dispatch({
			type: component
		});
	};
}

export const RECEIVE_EXECUTION_ID = "RECEIVE_WORKFLOW_ID";

export function receiveDatawolfResponse(json) {
	// Get the id of the layers in geoserver to display in the map
	// Get the info from a table to display

	return (dispatch) => {
		dispatch({
			type: RECEIVE_EXECUTION_ID,
			executionId: json
		});
	};
}

// Semantic Functions
export const RECEIVE_SEMANTICS = "RECEIVE_SEMANTICS";

export function receiveSemantics(type, json) {
	return (dispatch) => {
		dispatch({
			type: type,
			semantics: json
		});
	};
}

// TODO - WIP
export function fetchSemantics(space, limit, offset) {
	let endpoint = `${config.semanticServiceType}?limit=${limit}&skip=${offset}&detail=true`;

	if (space !== null && space !== "All") {
		endpoint = `${endpoint}&space=${space}`;
	}

	return (dispatch) => {
		dispatch(loading(SEMANTIC_LOADING));
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
		.catch((error) => {dispatch(receiveSemantics(FORBIDDEN, []));})
		.then((response) => {
			dispatch(loadComplete(SEMANTIC_LOAD_COMPLETE));
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveSemantics(RECEIVE_SEMANTICS, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveSemantics(LOGIN_ERROR, []));
			} else if (response.status === 403) {
				dispatch(receiveSemantics(FORBIDDEN, []));
			} else {
				dispatch(receiveSemantics(RECEIVE_SEMANTICS, []));
			}
		});
	};
}

export function searchSemantics(keyword, limit, offset) {
	let endpoint = `${config.semanticServiceType}/search?text=${keyword}&limit=${limit}&skip=${offset}`;
	return (dispatch) => {
		dispatch(loading(SEMANTIC_LOADING));
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
		.catch((error) => {dispatch(receiveSemantics(FORBIDDEN, []));})
		.then((response) => {
			dispatch(loadComplete(SEMANTIC_LOAD_COMPLETE));
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveSemantics(RECEIVE_SEMANTICS, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveSemantics(LOGIN_ERROR, []));
			} else if (response.status === 403) {
				dispatch(receiveSemantics(FORBIDDEN, []));
			} else {
				dispatch(receiveSemantics(RECEIVE_SEMANTICS, []));
			}
		});
	};
}

export function getHeader() {
	if (config.hostname.includes("localhost")) {
		const headers = new Headers({
			"x-auth-userinfo": `{"preferred_username":"${config.testUserInfo}"}`
		});

		return headers;
	} else {
		const headers = new Headers({
			Authorization: cookies.get("Authorization")
		});

		return headers;
	}
}

function getDatawolfHeader() {
	const headers = new Headers({
		"X-Credential-Username": sessionStorage.user
	});
	return headers;
}

export async function getRepoVersion() {
	const versionRequest = await fetch("https://raw.githubusercontent.com/IN-CORE/IN-CORE/main/tags.json", {
		method: "GET",
		redirect: "follow"
	});

	const githubVersionResponseFallback = {
		"in-core": "NA",
		"incore-auth": "NA",
		"incore-docs": "NA",
		"incore-helm": "NA",
		"incore-lab": "NA",
		"incore-services": "NA",
		"incore-ui": "NA",
		"plotting-service": "NA",
		"pyincore": "NA",
		"pyincore-viz": "NA",
		"pyincore-data": "NA"
	};

	try {
		const githubVersions = await versionRequest.json();
		return githubVersions;
	} catch (error) {
		// if fail just log the erorr and return null
		console.log(error);
		// return default valued expected object.
		return githubVersionResponseFallback;
	}
}

export const OPEN_WARNING_MESSAGE = "OPEN_WARNING_MESSAGE";
export const CLOSE_WARNING_MESSAGE = "CLOSE_WARNING_MESSAGE";

export const openWarningMessage = (message) => ({
	type: OPEN_WARNING_MESSAGE,
	message: message,
});

export const closeWarningMessage = () => ({
	type: CLOSE_WARNING_MESSAGE,
});
