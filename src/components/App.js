import React, { Component,Fragment } from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/datas'
import Home from './Home'
import Characters from './Characters'
import Seats from './Seats'
import Nav from './Nav'
import LoadingBar from 'react-redux-loading'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
      	<Fragment>
          <LoadingBar />
      		<Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/povcharacters' component={Characters} />
            <Route path='/seats' component={Seats} />
            <Route render={()=> <h1 className='text-center'>404</h1> } />
          </Switch>
      	</Fragment>
      </Router>
    );
  }
}

export default connect(({seats})=>({
  loading:seats === []
}))(App);