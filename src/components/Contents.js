import React,{Component} from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import Sidebar from './Sidebar'
import slug from 'slug'

class Contents extends Component {
	render() {
		return (
			<div className="container two-column">
				<Sidebar
					title='Contents'
					{...this.props} />
				<Route path={`${this.props.match.url}/:articleId`} render={({match})=>{
					const {contents}=this.props
					const title=Object.keys(contents).find(e=>slug(e)===match.params.articleId)
					const article=contents[title]
					const type=Object.prototype.toString.call(article).match(/\[object (.*)\]/)[1].toLowerCase()
					return(
			      <div className='panel'>
			        <article className='contents'>
			        	{type==='string'
			        	?<section><p>{article.replace(/\[\d+\]/g,'')}</p></section>
			        	:Object.keys(article).map(e=>(
			        		<section key={e}>
				        		<h1 className='panel-title'>{e}</h1>
				        		<p>{article[e].replace(/\[\d+\]/g,'')}</p>
			        		</section>
			        	))}
			        </article>
			      </div>
					)
				}} />
			</div>
		);
	}
}
function mapStateToProps({houseInfo},{match}) {
	const id=match.params.id
	const contents=houseInfo[362]    //houseInfo[id]
	const list=Object.keys(contents).map(e=>({ 
		name:e,
		id:slug(e)
	}))

	return {
		list,
		contents,
	}
}

export default connect(mapStateToProps)(Contents)