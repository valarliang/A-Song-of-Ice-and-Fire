import {RECEIVE_DATA} from '../actions/datas'

export function characters(state=[],action) {
	switch(action.type){
		case RECEIVE_DATA:
			return state.concat(action.characters);
		default:
			return state;
	}
}

export function houses(state=[],action) {
	switch(action.type){
		case RECEIVE_DATA:
			return state.concat(action.houses);
		default:
			return state;
	}
}