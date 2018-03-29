import React,{Component} from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component{
	render(){
		let arr=['North','Vale','Riverlands','Iron Islands','Westerlands','Crownlands','Reach','Dorne','Dragonstone'];
		return(
			<div className='container' >
				<h1 className='large-header' >
					A GAME OF THRONES IN WESTEROS
				</h1>
				<h3 className='header text-center'>
					Select a House
				</h3>
				<div className="home-grid text-center">
					{arr.map((e,i)=>(
						<Link key={e} to={`/${e}`} style={{background:`url(${require('../sigil.jpg')}) -${130*i}px`}}>{e}</Link>
					))}
				</div>
			</div>
		)
	}
}