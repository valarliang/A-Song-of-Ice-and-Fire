import {combineReducers} from 'redux'
import {seats,members,character} from './datas'
import {loadingBarReducer} from 'react-redux-loading'

export default combineReducers({
	seats,
	members,
	character,
	loadingBar:loadingBarReducer,
})