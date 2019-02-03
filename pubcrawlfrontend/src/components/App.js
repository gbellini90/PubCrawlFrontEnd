import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Homepage from './Homepage'
import Signup from './Signup'
import BarContainer from './BarContainer'
import Profile from './Profile'




class App extends React.Component {

  state={
    currentUser:null
  }

  setCurrentUser = userObj => this.setState({currentUser:userObj},()=>{})

  render() {

    return (
      <div className="App">
      <Router>
        <>
        <nav>
          <Link to='/signup'>  Sign Up  </Link>
          <Link to='/homepage'>  Log In  </Link>


        </nav>
        <Route path='/signup' render={() => <Signup setCurrentUser={this.setCurrentUser} currentUser={this.state.currentUser} />}
   />
          <Route path='/homepage' component={Homepage} />
          <Route path='/bars' component={BarContainer} />
          <Route path='/profile' render={() => <Profile setCurrentUser={this.setCurrentUser} currentUser={this.state.currentUser} />}
     />


        </>
      </Router>
      </div>
    );
  }
}



export default App;
