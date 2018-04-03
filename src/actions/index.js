import axios from 'axios'
import {showLoading,hideLoading} from 'react-redux-loading'

export const RECEIVE_DATA='RECEIVE_DATA'
export const GET_MEMBERS='GET_MEMBERS'
export const GET_CHARACTER='GET_CHARACTER'
export const GET_HOUSE='GET_HOUSE'
export const RESET_PANEL='RESET_PANEL'

function receiveData(seats,houseInfo) {
	return {
		type:RECEIVE_DATA,
		seats,
		houseInfo,
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
function getHouse(house) {
	return {
		type:GET_HOUSE,
		house,
	}
}
export function resetPanel(panel) {
	return {
		type:RESET_PANEL,
		panel,
	}
}
export function handleInitialData() {
	return (dispatch)=>{
		dispatch(showLoading())
		return axios.all([axios.get('https://raw.githubusercontent.com/valarliang/data/master/gotcontents.js'),axios.get('https://raw.githubusercontent.com/valarliang/data/master/gotdata.js')])
			.then(res=>{
			let {seats}=res[1].data,houseInfo=res[0].data
			dispatch(receiveData(seats,houseInfo))
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
export function handleHouse(id) {
	return (dispatch)=>{
		dispatch(showLoading())
		return axios.get('https://www.anapioficeandfire.com/api/houses/'+id)
			.then(({data})=>{
				if(!data.currentLord) {
					data.currentLord='unknown'
					dispatch(getHouse(data))
					dispatch(hideLoading())
				}else{
					axios.get(data.currentLord)
					.then((res)=>{
						data.currentLord=res.data.name
						dispatch(getHouse(data))
						dispatch(hideLoading())
					})
				}
		})
	}
}
export function handleCharacter(id) {
	return (dispatch,getState)=>{
		dispatch(showLoading())
		return axios.get('https://www.anapioficeandfire.com/api/characters/'+id)
			.then(({data})=>{
				const relatives=getState().members.filter(e=>{
					const relLastName=e.name.split(' ').pop(),selfLastName=data.name.split(' ').pop(),
						relFirstName=e.name.split(' ')[0],selfFirstName=data.name.split(' ')[0]
					return relLastName===selfLastName && relFirstName!==selfFirstName
				})  //找亲人
				if ((!data.allegiances[0] || !data.culture[0]) && relatives[0]) {
					return axios.all(relatives.map(e=>axios.get(`https://www.anapioficeandfire.com/api/characters/${e.id}`)))
					.then((res)=>{
						let hasHouse=res.find(e=>e.data.allegiances[0])
						let hasCulture=res.find(e=>e.data.culture)
						if(!data.allegiances[0] && hasHouse) data.allegiances=hasHouse.data.allegiances
						if(!data.culture && hasCulture) data.culture=hasCulture.data.culture
						return data
					})//没有allegiances或culture的话去看有没有亲人，有亲人的话再看亲人的allegiances或culture有没有,还没有就不管了
				}else {
					return data
				}
			})
			.then((data)=>{
				axios.all(data.allegiances.map(e=>axios.get(e)))
				.then(arr=>{
					dispatch(getHouse(arr.map(e=>e.data)))
					dispatch(getCharacter(data))
					dispatch(hideLoading())
				})
			})
	}
}


/**********************************/
function all(dispatch) {
	return axios.get('https://raw.githubusercontent.com/valarliang/data/master/gotdata.js')
		.then(({data})=>{
		let {characters}=data
		characters.sort((a,b)=>a.name.split(' ').pop()>b.name.split(' ').pop()?1:-1)
		dispatch(getMembers(characters))
		dispatch(hideLoading())
	})
}
function match(id,dispatch) {
	return axios.all([axios.get('https://www.anapioficeandfire.com/api/houses/'+id),axios.get('https://raw.githubusercontent.com/valarliang/data/master/gotdata.js')])
		.then(([res1,res2])=>{
		let {characters}=res2.data
		let {swornMembers,name}=res1.data
		let members=characters.filter(e=>swornMembers.some(el=>el.endsWith('/'+e.id)) || name.includes(e.name.split(' ').pop())).sort((a,b)=>a.name>b.name?1:-1)
		dispatch(getMembers(members))
		dispatch(hideLoading())
	})
}

