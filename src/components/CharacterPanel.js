import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleCharacter} from '../actions'
import {resetPanel} from '../actions'
import slug from 'slug'

class CharacterPanel extends Component{
	componentDidMount(){
		const {dispatch,match}=this.props
		dispatch(handleCharacter(match.params.id))
	}
	componentWillReceiveProps(nextProps){
		const {dispatch,match}=this.props
		const id=match.params.id,nextId=nextProps.match.params.id
		id!==nextId && dispatch(handleCharacter(nextId))
	}
	componentWillUnmount(){
		const {dispatch}=this.props
		dispatch(resetPanel([]))
	}
	render() {
		const {character,house,seats}=this.props
		return !character.name? null :(
			<div className='panel'>
				<img className='avatar' src={`https://raw.githubusercontent.com/valarliang/data/master/gotimg/${slug(character.name)}.jpg`} alt={character.name}/>
				<h1 className='medium-header'>{character.name}</h1>
				<div className='panel-title'>Titles</div>
				<ul className='info-list'>
					{character.titles[0]
						?character.titles.map(e=>(
						<li key={e}>
							<div>{e}</div>
						</li>
						)):<div>~remain unknown~</div>}
				</ul>
				<div className='panel-title'>Aliases</div>
				<ul className='info-list'>
					{character.aliases[0]
						?character.aliases.map(e=>(
						<li key={e}>
							<div>{e}</div>
						</li>
						)):<div>~remain unknown~</div>}
				</ul>
				<div className="row">
					<ul className='info-list' style={{marginRight:'80px'}}>
						<li>Culture<div>{character.culture?character.culture:<div>~remain unknown~</div>}</div></li>
						<li>House
							{!house[0]
								?<div>~remain unknown~</div>
								:house.map(e=>{
									const seat=seats.find(seat=>e.url.endsWith(seat.id))
									return seat
									?(<Link key={e.name} style={{color: '#68809a'}} to={`/${seat.id}`}>
											<div>{e.name}</div>
										</Link>
										)
									:(<div key={e.name}>{e.name}</div>)
								})}
						</li>
					</ul>
					<ul className="info-list">
						<li>Born<div>{character.born}</div></li>
						<li>Impersonator
							<div>{character.playedBy[0]
								?character.playedBy.join('/')
								:<div>~remain unknown~</div>}</div>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}
export default connect(({character,house,seats})=>({
	character,
	house,  //配合seats判断人物是否在九大家族之中
	seats,
}))(CharacterPanel)