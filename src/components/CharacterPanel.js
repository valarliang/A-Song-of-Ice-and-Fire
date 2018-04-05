import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import {TransitionGroup,CSSTransition} from 'react-transition-group'
import {connect} from 'react-redux'
import slug from 'slug'

class CharacterPanel extends Component{
	render() {
		const {character,seats,location}=this.props
		return (
			<TransitionGroup className='panel'>
				<CSSTransition
					key={location.key}
					timeout={300}
					classNames='fade'>
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
								)):<div>~unknown~</div>}
						</ul>
						<div className='panel-title'>Aliases</div>
						<ul className='info-list'>
							{character.aliases[0]
								?character.aliases.map(e=>(
								<li key={e}>
									<div>{e}</div>
								</li>
								)):<div>~unknown~</div>}
						</ul>
						<div className="row">
							<ul className='info-list' style={{marginRight:'80px'}}>
								<li>Culture<div>{character.culture?character.culture:<div>~unknown~</div>}</div></li>
								<li>House
									{!character.house[0]
										?<div>~unknown~</div>
										:character.house.map((e,i)=>{
											const seat=seats.find(seat=>e===seat.house.name)
											return seat
											?(<Link key={e} style={{color: '#68809a'}} to={`/${slug(seat.name)}`}>
													<div>{e}</div>
												</Link>
												)
											:(<div key={e}>{e}</div>)
										})}
								</li>
							</ul>
							<ul className="info-list">
								<li>Born<div>{character.born}</div></li>
								<li>Impersonator
									<div>{character.playedBy[0]
										?character.playedBy.join('/')
										:<div>~unknown~</div>}</div>
								</li>
							</ul>
						</div>
					</div>
				</CSSTransition>
			</TransitionGroup>
					
		);
	}
}

function mapStateToProps({members,seats},{match}) {
	const character=members.find(e=>slug(e.name)===match.params.id)
	return {
		character,
		seats      //判断人物是否在九大家族之中
	}
}

export default connect(mapStateToProps)(CharacterPanel)