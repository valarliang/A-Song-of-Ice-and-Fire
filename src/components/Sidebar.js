import React from 'react'
import PropTypes from 'prop-types'
import { Link, Route } from 'react-router-dom'

Sidebar.propTypes={
	title:PropTypes.string.isRequired,
	list:PropTypes.array.isRequired,
	loading:PropTypes.bool.isRequired,
}

function CostomLink({to,children}) {
	return(
		<Route path={to.pathname} children={({match})=>(
			<li style={{fontWeight:match?'bold':'normal'}} >
				<Link to={to}>{children}</Link>
			</li>
		)} />
	)
}

export default function Sidebar({title,list,loading,location,match}) {
	return loading? <h1>Loading</h1> : (
		<div>
			<h3 className='header'>{title}</h3>
			<ul className='sidebar-list'>
				{list.map(e=>(
					<CostomLink key={e} to={{pathname:`${match.url}/${e}`,search:location.search,}} >
						{e.toUpperCase()}
					</CostomLink>
				))}
			</ul>
		</div>
	)
}