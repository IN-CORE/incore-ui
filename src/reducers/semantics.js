import config from "../app.config";
import {
	SEMANTIC_LOADING,
	SEMANTIC_LOAD_COMPLETE,
	LOGIN_ERROR,
	RECEIVE_SEMANTICS,
	DELETE_ITEM,
	DELETE_ERROR,
	RESET_ERROR
} from "../actions";

const defaultState = {semantics: [], loading: false};

const semantics = (state = defaultState, action) => {
	switch(action.type) {
	case RECEIVE_SEMANTICS:
		return Object.assign({}, state, {semantics: action.semantics});
	case DELETE_ITEM:
		return Object.assign({}, state, {
			semantics: state.semantics.filter(dataset => dataset.id !== action.item.id),
			deleteError: false
		});
	case DELETE_ERROR:
		return Object.assign({}, state, {semantics:state.semantics, deleteError:true});
	case RESET_ERROR:
		return Object.assign({}, state, {deleteError:false});
	case LOGIN_ERROR:
		return Object.assign({}, state, {semantics: [], Authorization: "", loginError: true});
	case SEMANTIC_LOADING:
		return Object.assign({}, state, {...state, loading: true});
	case SEMANTIC_LOAD_COMPLETE:
		return Object.assign({}, state, {...state, loading: false, deleteError: false});
	default:
		return state;
	}
};

export default semantics;
