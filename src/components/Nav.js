import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
	return (
		<div className='container navbar' >
			<Link to='/' >Home</Link>
			<nav className='nav-links' >
				<Link to='/povcharacters' >POVCharacters</Link>
				<Link to='/seats' >Seats</Link>
			</nav>
		</div>
	)
}