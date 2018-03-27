import React,{Component} from 'react'
import HouseLogo from './HouseLogo'
import { Link } from 'react-router-dom'

export default class Home extends Component{
	render(){
		return(
			<div className='container' >
				<h1 className='large-header' >
					A GAME OF THRONES IN WESTEROS
				</h1>
				<h3 className='header text-center'>
					Select a House
				</h3>
				<div className="home-grid">
					<HouseLogo id='baratheon' width='125px' />
					<HouseLogo id='foxes' width='125px' />
					<HouseLogo id='hedgehogs' width='125px' />
					<HouseLogo id='lemurs' width='125px' />
					<HouseLogo id='koalas' width='125px' />
				</div>
			</div>
		)
	}
}