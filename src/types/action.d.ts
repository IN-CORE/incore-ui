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

interface ResetDeleteDatasetErrorAction {
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
	| DeleteDatasetErrorAction
	| ResetDeleteDatasetErrorAction
	| LoginErrorUserAction
	| DatasetLoadingAction
	| DatasetLoadedAction;
