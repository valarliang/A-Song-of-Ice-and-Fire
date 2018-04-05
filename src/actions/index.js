import axios from 'axios'
import {showLoading,hideLoading} from 'react-redux-loading'

export const RECEIVE_DATA='RECEIVE_DATA'
export const GET_MEMBERS='GET_MEMBERS'

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

export function handleInitialData() {
	return (dispatch)=>{
		dispatch(showLoading())
		return axios.all([axios.get('https://raw.githubusercontent.com/valarliang/data/master/gotcontents.js'),axios.get('https://raw.githubusercontent.com/valarliang/data/master/gotdata.js')])
			.then(([{data},{data:{seats}}])=>{
				let promises=[],promises2=[]
				seats.forEach(e=>{
					promises.push(axios.get('https://www.anapioficeandfire.com/api/houses/'+e.id)
						.then(({data})=>{
							!data.currentLord
							?e.house=data
							:promises2.push(axios.get(data.currentLord)
								.then(({data:{name}})=>{
									data.currentLord=name
									e.house=data
								}))
						}))
				})
				Promise.all(promises)
				.then(()=>{
					Promise.all(promises2)
					.then(()=>{
						dispatch(receiveData(seats,data))
						dispatch(hideLoading())
					})
				})
			})
	}
}
export function handleMembers() {
	return (dispatch)=>{
		dispatch(showLoading())
		return axios.get('https://raw.githubusercontent.com/valarliang/data/master/gotdata.js')
			.then(({data:{characters}})=>{
				axios.all(characters.map(e=>axios.get('https://www.anapioficeandfire.com/api/characters/'+e.id)))
				.then(res=>{
					const members=res.map(e=>e.data)
					let promises=[]
					members.forEach((e,i,all)=>{
						//没有allegiances或culture的话去看有没有亲人，有亲人的话再看亲人的allegiances或culture有没有
						const relatives=all.filter(el=>{
							const relLastName=el.name.split(' ').pop(),selfLastName=e.name.split(' ').pop(),
								relFirstName=el.name.split(' ')[0],selfFirstName=e.name.split(' ')[0]
							return relLastName===selfLastName && relFirstName!==selfFirstName
						})  //找亲人
						if ((!e.allegiances[0] || !e.culture[0]) && relatives[0]){
							let hasHouse=relatives.find(el=>el.allegiances[0])
							let hasCulture=relatives.find(el=>el.culture)
							if(!e.allegiances[0] && hasHouse) e.allegiances=hasHouse.allegiances
							if(!e.culture && hasCulture) e.culture=hasCulture.culture
						}
						//获取houseName
						promises.push(axios.all(e.allegiances.map(el=>axios.get(el)))
							.then(res=>{
								res[0]? e.house=res.map(el=>el.data.name) : e.house=[]
							}))
					})
					Promise.all(promises)
					.then(()=>{
						dispatch(getMembers(members))
						dispatch(hideLoading())
					})
				})
			})
	}
}
