import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import datasets from './datasets';
import hazards from './hazards';
import dfr3Curves from './dfr3Curves';
import dfr3Mappings from './dfr3Mappings';
import spaces from './spaces';
import datatypes from './datatypes';
import usage from './usage';

const rootReducer = combineReducers({
	routing: routerReducer,
	data: datasets,
	usage: usage,
	hazard: hazards,
	dfr3Curve: dfr3Curves,
	dfr3Mapping: dfr3Mappings,
	space: spaces,
	datatype: datatypes
});

export default rootReducer;
