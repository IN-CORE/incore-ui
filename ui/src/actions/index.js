// @flow

import type {Dispatch, AnalysesMetadata, Analysis} from "../utils.flowtype";

export const GET_ANALYSES = "GET_ANALYSES";

export const  RECEIVE_ANALYSES = "RECEIVE_ANALYSES";
export function receiveAnalyses(api:string, json:AnalysesMetadata) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: RECEIVE_ANALYSES,
			analyses: json,
			receivedAt: Date.now()
		});
	};
}

export const RECEIVE_ANALYSIS = "RECEIVE_ANALYSIS";
export function receiveAnalysis(api: string, json:Analysis) {
	console.log(json);
	return(dispatch: Dispatch) => {
		dispatch({
			type: RECEIVE_ANALYSIS,
			analysis: json,
			receivedAt: Date.now()
		});
	};
}

export function fetchAnalyses() {
	//TODO: Move to a configuration file
	const api = "http://localhost:8080";
	const endpoint = `${api  }/maestro/api/analyses/metadata`;

	return (dispatch: Dispatch) => {
		return fetch(endpoint)
			.then(response => response.json())
			.then( json =>
				dispatch(receiveAnalyses(api, json))
			);
	};
}

export function getAnalysisById(id: String) {
	//TODO: Move to a configuration file
	const api = "http://localhost:8080";
	const endpoint = `${api  }/maestro/api/analyses/${  id}`;

	return (dispatch: Dispatch) => {
		return fetch(endpoint)
			.then(response => response.json())
			.then(json =>
				dispatch(receiveAnalysis(api, json))
			);
	};

}
