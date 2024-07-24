import Cookies from "universal-cookie";

const cookies = new Cookies();

// This is a fallback value for when a component that is not in a Context provider tries to access its value.
export const userStateInitialValue: UserState = {
	Authorization: cookies.get("Authorization"),
	loginError: false,
	loginSuccess: false,
	forbidden: false
};

export const datasetsStateInitialValue: DatasetState = { datasets: [], loading: false, deleteError: false, forbidden: false };

export const dfr3CurvesStateInitialValue: DFR3CurveState = { dfr3Curves: [], loading: false, deleteError: false, forbidden: false };

export const dfr3MappingsStateInitialValue: DFR3MappingState = { dfr3Mappings: [], loading: false, deleteError: false, forbidden: false };
