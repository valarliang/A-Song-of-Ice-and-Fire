import React, { Component,Fragment } from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions'
import Home from './Home'
import Characters from './Characters'
import Seats from './Seats'
import Nav from './Nav'
import House from './House'
import LoadingBar from 'react-redux-loading'
import Contents from './Contents'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render() {
    let {loading}=this.props
    return (
      <Router>
      	<Fragment>
          <LoadingBar style={{position:'fixed'}} />
      		<Nav />
          {loading? null:(<Switch>
            <Route exact path='/' component={Home} />
            <Route path='/characters' component={Characters} />
            <Route path='/seats' component={Seats} />
            <Route exact path='/:id' component={House} />
            <Route path='/:id/contents' component={Contents} />
            <Route render={()=> <h1 className='text-center'>oops! Sorry, there is no content here(￣▽￣)."</h1> } />
          </Switch>)}
      	</Fragment>
      </Router>
    );
  }
}

export default connect(({seats})=>({
  loading:!seats[0]
}))(App);