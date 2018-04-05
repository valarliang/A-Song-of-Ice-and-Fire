import React from 'react'
import PropTypes from 'prop-types'
import { Link, Route } from 'react-router-dom'
import slug from 'slug'

Sidebar.propTypes={
	title:PropTypes.string.isRequired,
	list:PropTypes.array.isRequired,
}

function CostomLink({to,children}) {
	return(
		<Route path={to.pathname} children={({match})=>(
			<li style={{fontWeight:match?'bold':'normal',background:match?'black':''}} >
				<Link to={to} style={{color:match?'white':''}} >{children}</Link>
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
					<CostomLink key={e.name} to={{pathname:`${match.url}/${slug(e.name)}`,search:location.search,}} >
						{e.name.toUpperCase()}
					</CostomLink>
				))}
			</ul>
		</div>
	)
}