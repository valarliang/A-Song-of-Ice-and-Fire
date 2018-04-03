import {combineReducers} from 'redux'
import {RECEIVE_DATA,GET_MEMBERS,GET_CHARACTER,GET_HOUSE,RESET_PANEL} from '../actions'
import {loadingBarReducer} from 'react-redux-loading'

export default combineReducers({
	seats,
	members,
	character,
	house,
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
		case RESET_PANEL:
			return action.panel;
		default:
			return state;
	}
}
function character(state=[],action) {
	switch(action.type){
		case GET_CHARACTER:
			return action.character;
		case RESET_PANEL:
			return action.panel;
		default:
			return state;
	}
}
function house(state=[],action) {
	switch(action.type){
		case GET_HOUSE:
			return action.house;
		case RESET_PANEL:
			return action.panel;
		default:
			return state;
	}
}