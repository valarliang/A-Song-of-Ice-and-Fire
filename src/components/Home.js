import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoadingBar } from 'react-redux-loading'
import {handleInitialData} from '../actions/datas'

class Home extends Component{
	componentDidMount(){
		let {dispatch}=this.props;
		dispatch(handleInitialData())
	}
	render(){
		let {houses}=this.props;
		return(
			<div className='container' >
				<LoadingBar />
				<h1 className='large-header' >
					A GAME OF THRONES IN WESTEROS
				</h1>
				<h3 className='header text-center'>
					Select a House
				</h3>
				<div className="home-grid text-center">
					{houses.map((e,i)=>(
						<Link key={e} to={`/${e}`} style={{background:`url('https://raw.githubusercontent.com/valarliang/data/master/sigil.jpg') -${130*i}px`}}>{e}</Link>
					))}
				</div>
			</div>
		)
	}
}

export default connect((state)=>({
	houses:state.houses,
}))(Home);