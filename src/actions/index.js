// @flow

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

export function receiveAnalyses(api: string, json: AnalysesMetadata) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: RECEIVE_ANALYSES,
			analyses: json,
			receivedAt: Date.now()
		});
	};
}

export const RECEIVE_ANALYSIS = "RECEIVE_ANALYSIS";

export function receiveAnalysis(api: string, json: Analysis) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: RECEIVE_ANALYSIS,
			analysis: json,
			receivedAt: Date.now()
		});
	};
}

export const RECEIVE_DATASETS = "RECEIVE_DATASETS";

export function receiveDatasets(type: string, json: Datasets) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: type,
			datasets: json,
			receivedAt: Date.now()
		});
	};
}

export const RECEIVE_USAGE = "RECEIVE_USAGE";
export const RECEIVE_LAB_USAGE = "RECEIVE_LAB_USAGE";
export function receieveUsage(type, json) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: type,
			usage: json,
			receivedAt: Date.now()
		});
	};
}

export function deleteItem(type: string, json) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: type,
			item: json,
			receivedAt: Date.now()
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
	return (dispatch: Dispatch) => {
		return fetch(endpoint, { mode: "cors", method: "DELETE", headers: getHeader() }).then((response) => {
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(deleteItem(DELETE_ITEM, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(deleteItem(LOGIN_ERROR, []));
			} else {
				dispatch(deleteItem(DELETE_ERROR, null));
			}
		});
	};
}

export const RECEIVE_HAZARDS = "RECEIVE_HAZARDS";

export function receiveHazards(type: string, json: Hazards) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: type,
			hazards: json,
			recievedAt: Date.now()
		});
	};
}

export const RECEIVE_DFR3_CURVES = "RECEIVE_DFR3_CURVES";

export function receiveDFR3Curves(type: string, json: DFR3Curves) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: type,
			dfr3Curves: json,
			recievedAt: Date.now()
		});
	};
}

export const RECEIVE_DFR3_MAPPINGS = "RECEIVE_DFR3_MAPPINGS";

export function receiveDFR3Mappings(type: string, json: DFR3Mappings) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: type,
			dfr3Mappings: json,
			recievedAt: Date.now()
		});
	};
}

export const RECEIVE_SPACES = "RECEIVE_SPACES";

export function receiveSpaces(type: string, json) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: type,
			spaces: json,
			receivedAt: Date.now()
		});
	};
}

export const RECEIVE_DATATYPES = "RECEIVE_DATATYPES";

export function receiveDatatypes(type: string, json) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: type,
			datatypes: json,
			receivedAt: Date.now()
		});
	};
}

export function fetchAnalyses() {
	const endpoint = `${config.maestroService}/api/analyses?full=false`;

	return (dispatch: Dispatch) => {
		return fetch(endpoint, {
			headers: getHeader()
		})
			.then((response) => response.json())
			.then((json) => dispatch(receiveAnalyses(endpoint, json)));
	};
}

export function getAnalysisById(id: String) {
	//TODO: Move to a configuration file
	const endpoint = `${config.maestroService}/api/analyses/${id}`;

	return (dispatch: Dispatch) => {
		return fetch(endpoint, {
			headers: getHeader()
		})
			.then((response) => response.json())
			.then((json) => dispatch(receiveAnalysis(config.maestroService, json)));
	};
}

export function searchDatasets(keyword, limit, offset) {
	let endpoint = `${config.dataService}/search?excludeHazard=true&limit=${limit}&skip=${offset}&text=${keyword}`;
	return (dispatch: Dispatch) => {
		dispatch(loading(DATA_LOADING));
		return fetch(endpoint, { mode: "cors", headers: getHeader() }).then((response) => {
			dispatch(loadComplete(DATA_LOAD_COMPLETE));
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveDatasets(RECEIVE_DATASETS, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveDatasets(LOGIN_ERROR, []));
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

	return (dispatch: Dispatch) => {
		dispatch(loading(DATA_LOADING));
		return fetch(endpoint, { mode: "cors", headers: getHeader() }).then((response) => {
			dispatch(loadComplete(DATA_LOAD_COMPLETE));
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveDatasets(RECEIVE_DATASETS, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveDatasets(LOGIN_ERROR, []));
			} else {
				dispatch(receiveDatasets(RECEIVE_DATASETS, []));
			}
		});
	};
}

export function fetchUsage() {
	let endpoint = `${config.spaceServiceBase}usage`;
	return (dispatch: Dispatch) => {
		return fetch(endpoint, { mode: "cors", headers: getHeader() }).then((response) => {
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receieveUsage(RECEIVE_USAGE, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receieveUsage(LOGIN_ERROR, {}));
			} else {
				dispatch(receieveUsage(RECEIVE_USAGE, {}));
			}
		});
	};
}

export function fetchLabUsage() {
	// TODO implment
	return (dispatch: Dispatch) => {
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
	return (dispatch: Dispatch) => {
		return fetch(endpoint, { mode: "cors", headers: getHeader() }).then((response) => {
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveSpaces(RECEIVE_SPACES, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveSpaces(LOGIN_ERROR, []));
			} else {
				dispatch(receiveSpaces(RECEIVE_SPACES, []));
			}
		});
	};
}

export const RECEIVE_ALLOCATIONS = "RECEIVE_ALLOCATIONS";
export function fetchAllocations() {
	const endpoint = `${config.spaceServiceBase}allocations`;
	return (dispatch: Dispatch) => {
		return fetch(endpoint, { mode: "cors", headers: getHeader() }).then((response) => {
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch({
						type: RECEIVE_ALLOCATIONS,
						allocations: json,
						receivedAt: Date.now()
					});
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch({
					type: LOGIN_ERROR,
					usage: {},
					receivedAt: Date.now()
				});
			} else {
				dispatch({
					type: RECEIVE_ALLOCATIONS,
					usage: {},
					receivedAt: Date.now()
				});
			}
		});
	};
}

export function fetchUniqueDatatypes() {
	let endpoint = `${config.dataServiceBase}datatypes`;
	return (dispatch: Dispatch) => {
		return fetch(endpoint, { mode: "cors", headers: getHeader() }).then((response) => {
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveDatatypes(RECEIVE_DATATYPES, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveDatatypes(LOGIN_ERROR, []));
			} else {
				dispatch(receiveDatatypes(RECEIVE_DATATYPES, []));
			}
		});
	};
}

export function searchDFR3Curves(dfr3_type, keyword, limit, offset) {
	let endpoint = `${config.dfr3ServiceBase}${dfr3_type}/search?limit=${limit}&skip=${offset}&text=${keyword}`;
	return (dispatch: Dispatch) => {
		dispatch(loading(DFR3CURVE_LOADING));
		return fetch(endpoint, { mode: "cors", headers: getHeader() }).then((response) => {
			dispatch(loadComplete(DFR3CURVE_LOAD_COMPLETE));
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveDFR3Curves(RECEIVE_DFR3_CURVES, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveDFR3Curves(LOGIN_ERROR, []));
			} else {
				dispatch(receiveDFR3Curves(RECEIVE_DFR3_CURVES, []));
			}
		});
	};
}

export function fetchDFR3Curves(dfr3_type: string, space: string, inventory: string, hazard: string, limit, offset) {
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
	return (dispatch: Dispatch) => {
		dispatch(loading(DFR3CURVE_LOADING));
		return fetch(endpoint, { mode: "cors", headers: getHeader() }).then((response) => {
			dispatch(loadComplete(DFR3CURVE_LOAD_COMPLETE));
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveDFR3Curves(RECEIVE_DFR3_CURVES, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveDFR3Curves(LOGIN_ERROR, []));
			} else {
				dispatch(receiveDFR3Curves(RECEIVE_DFR3_CURVES, []));
			}
		});
	};
}

//TODO: Move this to app.config?
export function getMappingTypeFromDFR3Url(dfr3_type: string) {
	switch (dfr3_type.toLowerCase()) {
		case "fragilities":
			return "fragility";
		case "repairs":
			return "repair";
		case "restorations":
			return "restoration";
	}
}

export function fetchDFR3Mappings(dfr3_type: string, space: string, inventory: string, hazard: string, limit, offset) {
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

	return (dispatch: Dispatch) => {
		dispatch(loading(DFR3MAPPING_LOADING));
		return fetch(endpoint, { mode: "cors", headers: getHeader() }).then((response) => {
			dispatch(loadComplete(DFR3MAPPING_LOAD_COMPLETE));
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveDFR3Mappings(RECEIVE_DFR3_MAPPINGS, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveDFR3Mappings(LOGIN_ERROR, []));
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

	return (dispatch: Dispatch) => {
		dispatch(loading(DFR3MAPPING_LOADING));
		return fetch(endpoint, { mode: "cors", headers: getHeader() }).then((response) => {
			dispatch(loadComplete(DFR3MAPPING_LOAD_COMPLETE));
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveDFR3Mappings(RECEIVE_DFR3_MAPPINGS, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveDFR3Mappings(LOGIN_ERROR, []));
			} else {
				dispatch(receiveDFR3Mappings(RECEIVE_DFR3_MAPPINGS, []));
			}
		});
	};
}

export function searchHazards(hazard_type, keyword, limit, offset) {
	let endpoint = `${config.hazardServiceBase}${hazard_type}/search?limit=${limit}&skip=${offset}&text=${keyword}`;
	return (dispatch: Dispatch) => {
		dispatch(loading(HAZARD_LOADING));
		return fetch(endpoint, { mode: "cors", headers: getHeader() }).then((response) => {
			dispatch(loadComplete(HAZARD_LOAD_COMPLETE));
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveHazards(RECEIVE_HAZARDS, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveHazards(LOGIN_ERROR, []));
			} else {
				dispatch(receiveHazards(RECEIVE_HAZARDS, []));
			}
		});
	};
}

export function fetchHazards(hazard_type: string, space: string, limit, offset) {
	let endpoint = `${config.hazardServiceBase}${hazard_type}?limit=${limit}&skip=${offset}`;
	if (space !== null && space !== "All") {
		endpoint = `${endpoint}&space=${space}`;
	}
	return (dispatch: Dispatch) => {
		dispatch(loading(HAZARD_LOADING));
		return fetch(endpoint, { mode: "cors", headers: getHeader() }).then((response) => {
			dispatch(loadComplete(HAZARD_LOAD_COMPLETE));
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveHazards(RECEIVE_HAZARDS, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveHazards(LOGIN_ERROR, []));
			} else {
				dispatch(receiveHazards(RECEIVE_HAZARDS, []));
			}
		});
	};
}

export const loginHelper = async (username, password) => {
	const endpoint = config.authService;
	let formData = [
		`${encodeURIComponent("grant_type")}=${encodeURIComponent("password")}`,
		`${encodeURIComponent("username")}=${encodeURIComponent(username)}`,
		`${encodeURIComponent("password")}=${encodeURIComponent(password)}`,
		`${encodeURIComponent("client_id")}=${encodeURIComponent(config.client_id)}`
	];

	const tokenRequest = await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: formData.join("&")
	});

	const tokens = await tokenRequest.json();

	return tokens;
};

export const LOGIN_ERROR = "LOGIN_ERROR";
export const SET_USER = "SET_USER";

export function login(username, password) {
	return async (dispatch: Dispatch) => {
		const json = await loginHelper(username, password);
		if (json["access_token"] !== undefined) {
			cookies.set("Authorization", `bearer ${json["access_token"]}`, { maxAge: json["expires_in"] });
			return dispatch({
				type: SET_USER,
				Authorization: `bearer ${json["access_token"]}`
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
	return (dispatch: Dispatch) => {
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
	return (dispatch: Dispatch) => {
		return dispatch({
			type: component
		});
	};
}

export function loadComplete(component) {
	return (dispatch: Dispatch) => {
		return dispatch({
			type: component
		});
	};
}

export const RECEIVE_EXECUTION_ID = "RECEIVE_WORKFLOW_ID";

export function receiveDatawolfResponse(json) {
	// Get the id of the layers in geoserver to display in the map
	// Get the info from a table to display

	return (dispatch: Dispatch) => {
		dispatch({
			type: RECEIVE_EXECUTION_ID,
			executionId: json,
			receivedAt: Date.now()
		});
	};
}

async function getOutputDatasetHelper(executionId: String) {
	const datawolfUrl = `${config.dataWolf}executions/${executionId}`;
	const headers = getDatawolfHeader();
	const datawolf_execution_fetch = await fetch(datawolfUrl, {
		method: "GET",
		headers: headers
	});

	const datawolfExecution = await datawolf_execution_fetch.json();

	const output_dataset_id = datawolfExecution.datasets["7774de32-481f-48dd-8223-d9cdf16eaec1"];
	const endpoint = `${config.dataService}/${output_dataset_id}`;
	const output_dataset = await fetch(endpoint, {
		headers: getHeader()
	});

	const outputDataset = await output_dataset.json();
	const fileId = outputDataset.fileDescriptors[0].id;

	const fileDownloadUrl = `${config.dataServiceBase}files/${fileId}/blob`;
	const fileBlob = await fetch(fileDownloadUrl, { method: "GET", mode: "CORS", headers: getHeader() });

	const fileText = await fileBlob.text();

	return [outputDataset.id, fileText];
}

export const RECEIVE_OUTPUT = "RECEIVE_OUTPUT";

export function getOutputDataset(executionId: String) {
	return async (dispatch: Dispatch) => {
		const data = await getOutputDatasetHelper(executionId);
		dispatch({
			type: RECEIVE_OUTPUT,
			outputDatasetId: data[0],
			file: data[1].replace(/"/g, "").split("\n")
		});
	};
}

// Semantic Functions
export const RECEIVE_SEMANTICS = "RECEIVE_SEMANTICS";

export function receiveSemantics(type: string, json) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: type,
			semantics: json,
			receivedAt: Date.now()
		});
	};
}

// TODO - WIP
export function fetchSemantics(space, limit, offset) {
	let endpoint = `${config.semanticServiceType}?limit=${limit}&skip=${offset}&detail=true`;

	if (space !== null && space !== "All") {
		endpoint = `${endpoint}&space=${space}`;
	}

	return (dispatch: Dispatch) => {
		dispatch(loading(SEMANTIC_LOADING));
		return fetch(endpoint, { mode: "cors", headers: getHeader() }).then((response) => {
			dispatch(loadComplete(SEMANTIC_LOAD_COMPLETE));
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveSemantics(RECEIVE_SEMANTICS, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveSemantics(LOGIN_ERROR, []));
			} else {
				dispatch(receiveSemantics(RECEIVE_SEMANTICS, []));
			}
		});
	};
}

export function searchSemantics(keyword, limit, offset) {
	let endpoint = `${config.semanticServiceType}/search?text=${keyword}&limit=${limit}&skip=${offset}`;
	return (dispatch: Dispatch) =>{
		dispatch(loading(SEMANTIC_LOADING));
		return fetch(endpoint, { mode: "cors", headers: getHeader() }).then((response) => {
			dispatch(loadComplete(SEMANTIC_LOAD_COMPLETE));
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveSemantics(RECEIVE_SEMANTICS, json));
				});
			} else if (response.status === 401) {
				cookies.remove("Authorization");
				dispatch(receiveSemantics(LOGIN_ERROR, []));
			} else {
				dispatch(receiveSemantics(RECEIVE_SEMANTICS, []));
			}
		});
	};
}

export async function executeDatawolfWorkflowHelper(workflowid, creatorid, title, description, parameters, datasets) {
	const datawolfUrl = `${config.dataWolf}executions`;
	const dataToSubmit = {
		title: title,
		parameters: parameters,
		datasets: datasets,
		workflowId: workflowid,
		creatorId: creatorid,
		description: description
	};
	const headers = getDatawolfHeader();
	headers.append("Content-Type", "application/json");

	const datawolfExecution = await fetch(datawolfUrl, {
		method: "POST",
		headers: headers,
		body: JSON.stringify(dataToSubmit),
		credentials: "include"
	});

	const executionId = await datawolfExecution.text();

	return executionId;
}

export function executeDatawolfWorkflow(workflowid, creatorid, title, description, parameters, datasets) {
	return async (dispatch: Dispatch) => {
		const json = await executeDatawolfWorkflowHelper(
			workflowid,
			creatorid,
			title,
			description,
			parameters,
			datasets
		);
		return dispatch({
			type: RECEIVE_EXECUTION_ID,
			executionId: json,
			receivedAt: Date.now()
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
