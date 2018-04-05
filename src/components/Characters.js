import React,{Component} from 'react'
import {Route} from 'react-router-dom'
import Sidebar from './Sidebar'
import {connect} from 'react-redux'
import {parse} from 'query-string'
import {handleMembers} from '../actions'
import CharacterPanel from './CharacterPanel'
import slug from 'slug'

class Characters extends Component{
	componentDidMount(){
		const {dispatch,members}=this.props;
		if(!members[0])dispatch(handleMembers())
	}
	render(){
		const {members,match,location}=this.props;
		return !members[0]? null : (
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

function mapStateToProps({members},{location,match}) {
	if(location.search){
		members=members.filter(e=>e.house.some(el=>slug(el)===parse(location.search).houseId))
	}
	return {members}
}

export default connect(mapStateToProps)(Characters)