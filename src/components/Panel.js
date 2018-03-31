import React,{Component} from 'react'
import {connect} from 'react-redux'
import {handleCharacter} from '../actions/datas'

class Panel extends Component{
	componentDidMount(){
		const {dispatch,match}=this.props
		dispatch(handleCharacter(match.params.id))
	}
	componentWillReceiveProps(nextProps){
		const {dispatch,match}=this.props
		const id=match.params.id,nextId=nextProps.match.params.id
		id!==nextId && dispatch(handleCharacter(nextId))
	}
	render() {
		const {character,match}=this.props
		return (
			<div>{match.params.id}</div>
		);
	}
}
export default connect(({character})=>({
	character,
}))(Panel)