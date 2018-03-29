import {combineReducers} from 'redux'
import {characters,houses} from './datas'
import {loadingBarReducer} from 'react-redux-loading'

export default combineReducers({
	characters,
	houses,
	loadingBar:loadingBarReducer,
})