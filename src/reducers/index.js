import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import datasets from "./datasets";
import hazards from "./hazards";
import DFR3Curves from "./DFR3Curves";
import user from "./user";
import spaces from "./spaces";

const rootReducer = combineReducers({
	routing: routerReducer,
	data: datasets,
	user: user,
	hazard: hazards,
	fragility: DFR3Curves,
	space: spaces
});

export default rootReducer;
