import React,{Component} from 'react'
import {Redirect,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import HousePanel from './HousePanel'
import slug from 'slug'

class House extends Component {
	render() {
		const {match,contents,seats}=this.props
		const {id}=match.params
		if (!seats.some(e=>slug(e.name)===id)) {
			return <Redirect to='/' />
		}
		return (
      <HousePanel id={id}>
        {(house)=> !house
          ? null
          : <div className='panel'>
              <img className='house-avatar' src={`https://raw.githubusercontent.com/valarliang/data/master/gotimg/${slug(id)}.jpg`} alt={house.name}/>
              <h1 className='medium-header'>{house.name}</h1>
              <h4 style={{margin: 10}}>
                <Link
                  style={{cursor: 'pointer'}}
                  to={{ pathname: '/characters', search: `?houseId=${slug(house.name)}` }}>
                    View POV Characters
                </Link>
              </h4>
              <h4>SwornMembers:{house.swornMembers.length}</h4>
              <div className='panel-title'>{house.words?`"${house.words}"`:'None'}</div>
              <ul className='info-list row'>
                <li>CurrentLord<div>{house.currentLord?house.currentLord:<div>unknown</div>}</div></li>
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

function mapStateToProps({houseInfo,seats},{match:params}) {
	const contents=Object.keys(houseInfo[362]) //houseInfo[params.id]
	return {
		contents,
		seats,
	}
}

export default connect(mapStateToProps)(House)