import React,{Component} from 'react'
import Sidebar from './Sidebar'

export default class Characters extends Component{
	state={
		characters:'',
		loading:true,
	}
	componentDidMount(){
	}
	render(){
		let {characters,loading}=this.state;
		let {match,location}=this.props;
		return(
			<div className='container two-column' >
				{loading?'LOADING':console.log(this.state.characters)}
			</div>
		)
	}
}