import React from 'react'
import PropTypes from 'prop-types'
import { Link, Route } from 'react-router-dom'

Sidebar.propTypes={
	title:PropTypes.string.isRequired,
	list:PropTypes.array.isRequired,
}

function CostomLink({to,children}) {
	return(
		<Route path={to.pathname} children={({match})=>(
			<li style={{fontWeight:match?'bold':'normal'}} >
				<Link to={to}>{match? children+' >':children}</Link>
			</li>
		)} />
	)
}

export default function Sidebar({title,list,location,match}) {
	return (
		<div>
			<h3 className='header'>{title}</h3>
			<ul className='sidebar-list'>
				{list.map(e=>(
					<CostomLink key={e.name} to={{pathname:`${match.url}/${e.id.slice(11)}`,search:location.search,}} >
						{e.name.toUpperCase()}
					</CostomLink>
				))}
			</ul>
		</div>
	)
}