import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {setCurrentUser} from '../actions/user'
import Login from './Login'
import Signup from './Signup'
import BarContainer from './BarContainer'
import Profile from './Profile'




class App extends React.Component {

  render() {

    return (
      <div className="App">
      <Router>
        <>
        <nav>
          <Link to='/signup'>  Sign Up  </Link>
          <Link to='/login'>  Log In  </Link>


        </nav>
        <Route path='/signup' render={() => <Signup  />}
   />
          <Route path='/login' component={Login} />
          <Route path='/bars' component={BarContainer} />
          <Route path='/profile' render={() => <Profile />}
     />


        </>
      </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user:state.user.user
  }
}

export default connect(mapStateToProps)(App);
