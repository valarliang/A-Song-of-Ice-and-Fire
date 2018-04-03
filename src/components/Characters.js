import React,{Component} from 'react'
import {Route} from 'react-router-dom'
import Sidebar from './Sidebar'
import {connect} from 'react-redux'
import {parse} from 'query-string'
import {resetPanel} from '../actions'
import {handleMembers} from '../actions'
import CharacterPanel from './CharacterPanel'

class Characters extends Component{
	componentDidMount(){
		const {location,dispatch}=this.props;
		location.search
		? dispatch(handleMembers(parse(location.search).houseId))
		: dispatch(handleMembers())
	}
	componentWillReceiveProps(nextProps){
		const {location,dispatch}=this.props;
		location.search && nextProps.location.search!==location.search
		&& dispatch(handleMembers())
	}
	componentWillUnmount(){
		const {dispatch}=this.props
		dispatch(resetPanel([]))
	}
	render(){
		const {members,match,location}=this.props;
		return (
			<div className='container two-column' >
				<Sidebar 
					title='POV Characters'
					list={members}
					{...this.props} />
				{location.pathname==='/characters'
					?<div className='sidebar-instruction header'>Select a character</div>
					:null}

				<Route path={`${match.url}/:id`} component={CharacterPanel} />

			</div>
		)
	}
}

export default connect(({members})=>({
	members,
}))(Characters)