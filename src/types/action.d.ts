interface LoginUserAction {
	type: "SET_USER";
	Authorization: string;
}

interface LoginErrorUserAction {
	type: "LOGIN_ERROR";
}

interface LogoutUserAction {
	type: "LOGOUT";
}

type UserAction = LoginUserAction | LoginErrorUserAction | LogoutUserAction;

interface ReceiveDatasetsAction {
	type: "RECEIVE_DATASETS";
	datasets: Datasets;
}

interface DeleteDatasetItemAction {
	type: "DELETE_ITEM";
	item: Dataset;
}

interface DeleteErrorAction {
	type: "DELETE_ERROR";
}

interface ResetErrorAction {
	type: "RESET_ERROR";
}

interface DatasetLoadingAction {
	type: "DATA_LOADING";
}

interface DatasetLoadedAction {
	type: "DATA_LOAD_COMPLETE";
}

type DatasetAction =
	| ReceiveDatasetsAction
	| DeleteDatasetItemAction
	| DeleteErrorAction
	| ResetErrorAction
	| LoginErrorUserAction
	| DatasetLoadingAction
	| DatasetLoadedAction;

interface ReceiveDFR3CurvesAction {
	type: "RECEIVE_DFR3_CURVES";
	dfr3Curves: DFR3Curves;
}

interface DeleteDFR3CurveItemAction {
	type: "DELETE_ITEM";
	item: DFR3Curve;
}

interface DFR3CurveLoadingAction {
	type: "DFR3CURVE_LOADING";
}

interface DFR3CurveLoadedAction {
	type: "DFR3CURVE_LOAD_COMPLETE";
}

type DFR3CurvesAction =
	| ReceiveDFR3CurvesAction
	| DeleteDFR3CurveItemAction
	| DeleteErrorAction
	| ResetErrorAction
	| LoginErrorUserAction
	| DFR3CurveLoadingAction
	| DFR3CurveLoadedAction;

interface ReceiveDFR3MappingsAction {
	type: "RECEIVE_DFR3_MAPPINGS";
	dfr3Mappings: DFR3Mappings;
}

interface DeleteDFR3MappingItemAction {
	type: "DELETE_ITEM";
	item: DFR3Mapping;
}

interface DFR3MappingLoadingAction {
	type: "DFR3MAPPING_LOADING";
}

interface DFR3MappingLoadedAction {
	type: "DFR3MAPPING_LOAD_COMPLETE";
}

type DFR3MappingsAction =
	| ReceiveDFR3MappingsAction
	| DeleteDFR3MappingItemAction
	| DeleteErrorAction
	| ResetErrorAction
	| LoginErrorUserAction
	| DFR3MappingLoadingAction
	| DFR3MappingLoadedAction;


