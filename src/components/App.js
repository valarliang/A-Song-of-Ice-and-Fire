import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Characters from './Characters'
import Houses from './Houses'
import Nav from './Nav'

class App extends Component {
  render() {
    return (
      <Router>
      	<div>
      		<Nav />

      		<Switch>
	      		<Route exact path='/' component={Home} />
	      		<Route path='/characters' component={Characters} />
	      		<Route path='/houses' component={Houses} />
						<Route render={()=> <h1 className='text-center'>404</h1> } />
      		</Switch>
      	</div>
      </Router>
    );
  }
}

export default App;
