import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import datasets from "./datasets";
import hazards from "./hazards";
import DFR3Curves from "./dfr3Curves";
import user from "./user";
import spaces from "./spaces";

const rootReducer = combineReducers({
	routing: routerReducer,
	data: datasets,
	user: user,
	hazard: hazards,
	dfr3Curve: DFR3Curves,
	space: spaces
});

export default rootReducer;
