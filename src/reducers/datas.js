import {RECEIVE_DATA,GET_MEMBERS,GET_CHARACTER} from '../actions/datas'

export function seats(state=[],action) {
	switch(action.type){
		case RECEIVE_DATA:
			return state.concat(action.seats);
		default:
			return state;
	}
}

export function members(state=[],action) {
	switch(action.type){
		case GET_MEMBERS:
			return action.members;
		default:
			return state;
	}
}
export function character(state=[],action) {
	switch(action.type){
		case GET_CHARACTER:
			return action.character;
		default:
			return state;
	}
}