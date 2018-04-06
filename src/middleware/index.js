import {applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

// const logger=(store)=>(next)=>(action)=>{
// 	console.group(action.type)
// 	const result=next(action)
// 	console.log('The new state:',store.getState())
// 	console.groupEnd()
// 	return result
// }

export default applyMiddleware(
	thunk,
	// logger
)