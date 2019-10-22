// @flow

import type {AnalysesMetadata, Analysis, Datasets, Fragilities, Hazards, Dispatch} from "../utils/flowtype";
import config from "../app.config";

export const GET_ANALYSES = "GET_ANALYSES";

export const RECEIVE_ANALYSES = "RECEIVE_ANALYSES";

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
			receivedAt: Date.now(),
		});
	};
}

export const RECEIVE_HAZARDS = "RECEIVE_HAZARDS";

export function receiveHazards(type: string, json: Hazards) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: type,
			hazards: json,
			recievedAt: Date.now(),
		});
	};
}

export const RECEIVE_FRAGILITIES = "RECEIVE_FRAGILITIES";

export function receiveFragilities(type: string, json: Fragilities){
	return (dispatch: Dispatch) =>{
		dispatch({
			type: type,
			fragilities: json,
			recievedAt: Date.now(),
		});
	};
}

export const RECEIVE_SPACES = "RECEIVE_SPACES";

export function receiveSpaces(type: string, json) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: type,
			spaces: json,
			receivedAt: Date.now(),
		});
	};
}

export function fetchAnalyses() {
	const endpoint = `${ config.maestroService }/api/analyses?full=false`;

	return (dispatch: Dispatch) => {
		return fetch(endpoint, {
			headers: getHeader()
		})
			.then(response => response.json())
			.then(json =>
				dispatch(receiveAnalyses(endpoint, json))
			);
	};
}

export function getAnalysisById(id: String) {
	//TODO: Move to a configuration file
	const endpoint = `${ config.maestroService }/api/analyses/${ id }`;

	return (dispatch: Dispatch) => {
		return fetch(endpoint, {
			headers: getHeader()
		})
			.then(response => response.json())
			.then(json =>
				dispatch(receiveAnalysis(config.maestroService, json))
			);
	};

}

export function searchDatasets(keyword, limit, offset) {
	let endpoint = `${config.dataService}/search?limit=${limit}&skip=${offset}&text=${keyword}`;
	return (dispatch: Dispatch) => {
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
			.then(response =>{
				if (response.status === 200){
					response.json().then(json =>{
						dispatch(receiveDatasets(RECEIVE_DATASETS, json));
					});
				}
				else if (response.status === 403){
					dispatch(receiveDatasets(LOGIN_ERROR, []));
				}
				else{
					dispatch(receiveDatasets(RECEIVE_DATASETS, []));
				}
			});
	};
}

export function fetchDatasets(dataType, space, limit, offset) {
	let endpoint = `${config.dataService}?limit=${limit}&skip=${offset}`;
	if (dataType !== null && dataType !== "All") {
		endpoint = `${endpoint}&type=${dataType}`;
	}
	if (space !== null && space !== "All"){
		endpoint = `${endpoint}&space=${space}`;
	}
	return (dispatch: Dispatch) => {
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
			.then(response =>{
				if (response.status === 200){
					response.json().then(json =>{
						dispatch(receiveDatasets(RECEIVE_DATASETS, json));
					});
				}
				else if (response.status === 403){
					dispatch(receiveDatasets(LOGIN_ERROR, []));
				}
				else{
					dispatch(receiveDatasets(RECEIVE_DATASETS, []));
				}
			});
	};
}

export function fetchSpaces() {
	const endpoint = config.spaceService;
	return (dispatch: Dispatch) => {
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
			.then(response =>{
				if (response.status === 200){
					response.json().then(json =>{
						dispatch(receiveSpaces(RECEIVE_SPACES, json));
					});
				}
				else if (response.status === 403){
					dispatch(receiveSpaces(LOGIN_ERROR, []));
				}
				else{
					dispatch(receiveSpaces(RECEIVE_SPACES, []));
				}
			});
	};
}

export function searchFragilities(keyword, limit, offset){
	let endpoint = `${config.fragilityService}/search?limit=${limit}&skip=${offset}&text=${keyword}`;
	return (dispatch: Dispatch) => {
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
		.then(response =>{
			if (response.status === 200){
				response.json().then(json =>{
					dispatch(receiveFragilities(RECEIVE_FRAGILITIES, json));
				});
			}
			else if (response.status === 403){
				dispatch(receiveFragilities(LOGIN_ERROR, []));
			}
			else{
				dispatch(receiveFragilities(RECEIVE_FRAGILITIES, []));
			}
		});
	};
}

export function fetchFragilities(space: string, inventory: string, hazard: string, limit, offset){
	let endpoint = `${config.fragilityService}?limit=${limit}&skip=${offset}`;
	if (space !== null && space !== "All"){
		endpoint = `${endpoint}&space=${space}`;
	}
	if (inventory !== null && inventory !== "All"){
		endpoint = `${endpoint}&inventory=${inventory}`;
	}
	if (hazard !== null && hazard !== "All"){
		endpoint = `${endpoint}&hazard=${hazard}`;
	}
	return (dispatch:Dispatch) => {
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
		.then(response => {
			if (response.status === 200){
				response.json().then(json =>{
					dispatch(receiveFragilities(RECEIVE_FRAGILITIES, json));
				});
			}
			else if (response.status === 403){
				dispatch(receiveFragilities(LOGIN_ERROR, []));
			}
			else{
				dispatch(receiveFragilities(RECEIVE_FRAGILITIES, []));
			}
		});
	};
}

export function searchHazards(hazard_type, keyword, limit, offset) {
	let endpoint = `${config.hazardServiceBase}${hazard_type}/search?limit=${limit}&skip=${offset}&text=${keyword}`;
	return (dispatch: Dispatch) => {
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
			.then(response =>{
				if (response.status === 200){
					response.json().then(json =>{
						dispatch(receiveHazards(RECEIVE_HAZARDS, json));
					});
				}
				else if (response.status === 403){
					dispatch(receiveHazards(LOGIN_ERROR, []));
				}
				else{
					dispatch(receiveHazards(RECEIVE_HAZARDS, []));
				}
			});
	};
}

export function fetchHazards(hazard_type: string, space: string, limit, offset) {
	let endpoint = `${config.hazardServiceBase}${hazard_type}?limit=${limit}&skip=${offset}`;
	if (space !== null && space !== "All"){
		endpoint = `${endpoint}&space=${space}`;
	}
	return (dispatch: Dispatch) => {
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
			.then(response =>{
				if (response.status === 200){
					response.json().then(json =>{
						dispatch(receiveHazards(RECEIVE_HAZARDS, json));
					});
				}
				else if (response.status === 403){
					dispatch(receiveHazards(LOGIN_ERROR, []));
				}
				else{
					dispatch(receiveHazards(RECEIVE_HAZARDS, []));
				}
			});
	};
}

export async function loginHelper(username, password) {
	const endpoint = config.authService;
	let formData = [
		encodeURIComponent("grant_type") + "=" + encodeURIComponent("password"),
		encodeURIComponent("username") + "=" + encodeURIComponent(username),
		encodeURIComponent("password") + "=" + encodeURIComponent(password),
		encodeURIComponent("client_id") + "=" + encodeURIComponent(config.client_id),
	];

	const tokenRequest = await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body:formData.join("&"),
	});

	const tokens = await tokenRequest.json();

	return tokens;
}

export const LOGIN_ERROR = "LOGIN_ERROR";
export const SET_USER = "SET_USER";

export function login(username, password) {
	return async (dispatch: Dispatch) => {
		const json = await loginHelper(username, password);
		if (typeof(Storage) !== "undefined" && json["access_token"] !== undefined) {
			sessionStorage.setItem("access_token", json["access_token"]);
			sessionStorage.setItem("refresh_token", json["refresh_token"]);
			return dispatch({
				type: SET_USER,
				refresh_token: json["refresh_token"],
				access_token: json["access_token"]
			});
		} else {
			return dispatch({
				type: LOGIN_ERROR
			});
		}

	};
}

export function readCredentials(tokens) {
	// reading credentials from tokens passed in URL and stored in sessionStorage
	// if there's token passed in, reset the sessionStorage to save that token
	if (typeof(Storage) !== "undefined") {
		sessionStorage.setItem("access_token", tokens["access_token"]);
		sessionStorage.setItem("refresh_token", tokens["refresh_token"]);

		if (tokens["location"] !== undefined) sessionStorage.setItem("locationFrom", tokens["location"]);
	}
}


export const LOGOUT = "LOGOUT";

export function logout() {
	return (dispatch: Dispatch) => {
		if (typeof(Storage) !== "undefined") {
			sessionStorage.removeItem("access_token");
			sessionStorage.removeItem("refresh_token");
			sessionStorage.removeItem("locationFrom");
		}
		return dispatch({
			type: LOGOUT
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
	const datawolfUrl = `${ config.dataWolf }executions/${ executionId }`;
	const headers = getDatawolfHeader();
	const datawolf_execution_fetch = await fetch(datawolfUrl, {
		method: "GET",
		headers: headers
	});

	const datawolfExecution = await datawolf_execution_fetch.json();

	const output_dataset_id = datawolfExecution.datasets["7774de32-481f-48dd-8223-d9cdf16eaec1"];
	const endpoint = `${ config.dataService }/${ output_dataset_id }`;
	const output_dataset = await fetch(endpoint, {
		headers: getHeader()
	});

	const outputDataset = await output_dataset.json();
	const fileId = outputDataset.fileDescriptors[0].id;

	const fileDownloadUrl = `${ config.dataServiceBase }data/api/files/${ fileId }/blob`;
	const fileBlob = await fetch(fileDownloadUrl, {method: "GET", mode: "CORS", headers: getHeader()});

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

export async function executeDatawolfWorkflowHelper(workflowid, creatorid, title, description, parameters, datasets) {
	const datawolfUrl = `${ config.dataWolf }executions`;
	const dataToSubmit = {
		"title": title,
		"parameters": parameters,
		"datasets": datasets,
		"workflowId": workflowid,
		"creatorId": creatorid,
		"description": description
	};
	const headers = getDatawolfHeader();
	headers.append("Content-Type", "application/json");

	const datawolfExecution = await fetch(datawolfUrl, {
		method: "POST",
		headers: headers,
		body: JSON.stringify(dataToSubmit),
		credentials: "include",
	});

	const executionId = await datawolfExecution.text();

	return executionId;
}

export function executeDatawolfWorkflow(workflowid, creatorid, title, description, parameters, datasets) {

	return async (dispatch: Dispatch) => {
		const json = await  executeDatawolfWorkflowHelper(workflowid, creatorid, title, description, parameters, datasets);
		return dispatch({
			type: RECEIVE_EXECUTION_ID,
			executionId: json,
			receivedAt: Date.now()
		});
	};

}

export function getHeader() {
	const headers = new Headers({
		"Authorization": `Bearer ${sessionStorage.access_token}`,
	});
	return headers;
}

function getDatawolfHeader() {
	const headers = new Headers({
		"X-Credential-Username": sessionStorage.user
	});
	return headers;
}
