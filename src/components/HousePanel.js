import {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import slug from 'slug'

class HousePanel extends Component{
	static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
  }
	render() {
		return (
			this.props.children(this.props.house)
		);
	}
}

function mapStateToProps({seats},{id}) {
	const house=seats.find(e=>slug(e.name)===id).house
	return {house}
}

export default connect(mapStateToProps)(HousePanel)