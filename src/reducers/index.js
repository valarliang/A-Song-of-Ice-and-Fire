import {combineReducers} from 'redux'
import {RECEIVE_DATA,GET_MEMBERS} from '../actions'
import {loadingBarReducer} from 'react-redux-loading'

export default combineReducers({
	seats,
	members,
	houseInfo,
	loadingBar:loadingBarReducer,
})

function seats(state=[],action) {
	switch(action.type){
		case RECEIVE_DATA:
			return state.concat(action.seats);
		default:
			return state;
	}
}
function houseInfo(state={},action) {
	switch(action.type){
		case RECEIVE_DATA:
			return {
				...state,
				...action.houseInfo
			};
		default:
			return state;
	}
}
function members(state=[],action) {
	switch(action.type){
		case GET_MEMBERS:
			return action.members;
		default:
			return state;
	}
}