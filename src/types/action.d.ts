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

interface DeleteDatasetErrorAction {
	type: "DELETE_ERROR";
}

interface ResetDeleteErrorAction {
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
	| ResetDeleteErrorAction
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

interface DeleteDFR3ErrorAction {
	type: "DELETE_ERROR";
}

interface ResetDeleteDFR3ErrorAction {
	type: "RESET_ERROR";
}

interface DFR3CurveLoadingAction {
	type: "DFR3CURVE_LOADING";
}

interface DFR3CurveLoadedAction {
	type: "DFR3CURVE_LOAD_COMPLETE";
}

type DFR3Action =
	| ReceiveDFR3CurvesAction
	| DeleteDFR3CurveItemAction
	| DeleteDFR3ErrorAction
	| ResetDeleteDFR3ErrorAction
	| DFR3CurveLoadingAction
	| DFR3CurveLoadedAction;
