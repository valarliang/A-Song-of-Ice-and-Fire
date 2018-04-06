import React,{Component} from 'react'
import {Redirect,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import HousePanel from './HousePanel'
import {handleHouse} from '../actions'
import {resetPanel} from '../actions'
import slug from 'slug'

class House extends Component {
	comonentDidMount(){
		const {match,dispatch}=this.props
		dispatch(handleHouse(match.params.id))
	}
	componentWillUnmount(){
		const {dispatch}=this.props
		dispatch(resetPanel([]))
	}
	render() {
		const {img,loading,match,contents,seats}=this.props
		const {id}=match.params
    const seat=seats.find(e=>e.id===Number(id))
		if (!loading && !seat) {
			return <Redirect to='/' />
		}
		return (
      <HousePanel id={id}>
        {(house)=> !house.name
          ? null
          : <div className='panel'>
              <img className='house-avatar' src={`https://raw.githubusercontent.com/valarliang/data/master/gotimg/${slug(seat.name)}.jpg`} alt={house.name}/>
              <h1 className='medium-header'>{house.name}</h1>
              <h4 style={{margin: 10}}>
                <Link
                  style={{cursor: 'pointer'}}
                  to={{ pathname: '/characters', search: `?houseId=${id}` }}>
                    View POV Characters
                </Link>
              </h4>
              <h4>SwornMembers:{house.swornMembers.length}</h4>
              <div className='panel-title'>{house.words?`"${house.words}"`:'None'}</div>
              <ul className='info-list row'>
                <li>CurrentLord<div>{house.currentLord}</div></li>
                <li>CoatOfArms<div>{house.coatOfArms?house.coatOfArms:<div>unknown</div>}</div></li>
                <li>Region<div>{house.region}</div></li>
                <li>Seats<div>{house.seats.join('/')}</div></li>
              </ul>
              <h2 className='header'>Contents</h2>
              <ul className='contents'>
                {contents.map((e) => (
                  <li key={e}>
                    <Link to={`${match.url}/contents/${slug(e)}`}>
                      <h4 className='contents-title'>{e}</h4>
                    </Link>
                  </li>))}
              </ul>
            </div>}
      </HousePanel>
		);
	}
}

function mapStateToProps({houseInfo,seats},{match:{params}}) {
	const contents=Object.keys(houseInfo[362]) //houseInfo[params.id]
	return {
		contents,
		seats,
		loading:!seats[0]
	}
}

export default connect(mapStateToProps)(House)