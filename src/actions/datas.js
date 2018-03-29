import axios from 'axios'
import {showLoading,hideLoading} from 'react-redux-loading'

export const RECEIVE_DATA='RECEIVE_DATA'

function receiveData(characters,houses) {
	return {
		type:RECEIVE_DATA,
		characters,
		houses,
	}
}
export function handleInitialData() {
	return (dispatch)=>{
		dispatch(showLoading())
		return axios.get('https://raw.githubusercontent.com/valarliang/data/master/datas.js').then((json)=>{
			let {characters,houses}=json.data
			dispatch(receiveData(characters,houses))
			dispatch(hideLoading())
		})
	}
}