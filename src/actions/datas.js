import axios from 'axios'
import {showLoading,hideLoading} from 'react-redux-loading'

export const RECEIVE_DATA='RECEIVE_DATA'
export const GET_MEMBERS='GET_MEMBERS'
export const GET_CHARACTER='GET_CHARACTER'

function receiveData(seats) {
	return {
		type:RECEIVE_DATA,
		seats,
	}
}
function getMembers(members) {
	return {
		type:GET_MEMBERS,
		members,
	}
}
function getCharacter(character) {
	return {
		type:GET_CHARACTER,
		character,
	}
}
export function handleInitialData() {
	return (dispatch)=>{
		dispatch(showLoading())
		return axios.get('https://raw.githubusercontent.com/valarliang/data/master/datas.js')
			.then(({data})=>{
			let {seats}=data
			dispatch(receiveData(seats))
			dispatch(hideLoading())
		})
	}
}
export function handleMembers(id) {
	return (dispatch)=>{
		dispatch(showLoading())
		return  id? match(id,dispatch):all(dispatch)
	}
}
export function handleCharacter(id) {
	return (dispatch)=>{
		dispatch(showLoading())
		return axios.get('https://www.anapioficeandfire.com/api/characters/'+id)
			.then(({data})=>{
			dispatch(getCharacter(data))
			dispatch(hideLoading())
		})
	}
}


/**********************************/
function all(dispatch) {
	return axios.get('https://raw.githubusercontent.com/valarliang/data/master/datas.js')
		.then(({data})=>{
		let {characters}=data
		dispatch(getMembers(characters))
		dispatch(hideLoading())
	})
}
function match(id,dispatch) {
	return axios.all([axios.get('https://www.anapioficeandfire.com/api/houses/'+id),axios.get('https://raw.githubusercontent.com/valarliang/data/master/datas.js')])
		.then(([res1,res2])=>{
		let {characters}=res2.data
		let {swornMembers}=res1.data
		let members=characters.filter(e=>swornMembers.some(el=>el.endsWith(e.id)))
		dispatch(getMembers(members))
		dispatch(hideLoading())
	})
}


