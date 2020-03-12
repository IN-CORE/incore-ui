import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import datasets from "./datasets";
import hazards from "./hazards";
import dfr3Curves from "./dfr3Curves";
import dfr3Mappings from "./dfr3Mappings";
import user from "./user";
import spaces from "./spaces";

const rootReducer = combineReducers({
	routing: routerReducer,
	data: datasets,
	user: user,
	hazard: hazards,
	dfr3Curve: dfr3Curves,
	dfr3Mapping: dfr3Mappings,
	space: spaces
});

export default rootReducer;
