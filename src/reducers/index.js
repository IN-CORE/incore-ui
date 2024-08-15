import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import datasets from "./datasets.ts";
import hazards from "./hazards";
import dfr3Curves from "./dfr3Curves.ts";
import dfr3Mappings from "./dfr3Mappings";
import spaces from "./spaces";
import datatypes from "./datatypes";
import semantics from "./semantics";
import usage from "./usage";
import user from "./user.ts";
import warning from "./warning";

const rootReducer = combineReducers({
	routing: routerReducer,
	data: datasets,
	usage: usage,
	hazard: hazards,
	dfr3Curve: dfr3Curves,
	dfr3Mapping: dfr3Mappings,
	space: spaces,
	user: user,
	datatype: datatypes,
	semantics: semantics,
	warning: warning
});

export default rootReducer;
