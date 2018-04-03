import {Component} from 'react'
import {handleHouse} from '../actions'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class HousePanel extends Component{
	static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
  }
	componentDidMount(){
		const {dispatch,id}=this.props
		dispatch(handleHouse(id))
	}
	componentWillReceiveProps(nextProps){
		const {dispatch,id}=this.props
		const nextId=nextProps.id
		id!==nextId && dispatch(handleHouse(nextId))
	}
	render() {
		return (
			this.props.children(this.props.house)
		);
	}
}

export default connect(({house})=>({
	house,
}))(HousePanel)