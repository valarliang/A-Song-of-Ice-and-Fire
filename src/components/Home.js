import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Home extends Component{
	render(){
		let {seats}=this.props;
		return(
			<div className='container' >
				<h1 className='large-header' >
					A GAME OF THRONES IN WESTEROS
				</h1>
				<h3 className='header text-center'>
					Select a Seat
				</h3>
				<div className="home-grid text-center">
					{seats.map((e,i)=>(
						<Link key={e.name} to={`/${e.id}`} style={{background:`url('https://raw.githubusercontent.com/valarliang/data/master/gotimg/sigil.jpg') -${130*i}px`}}>{e.name}</Link>
					))}
				</div>
			</div>
		)
	}
}

export default connect(({seats})=>({
	seats
}))(Home);