import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Homepage from './Homepage'
import Signup from './Signup'
import Bars from './Bars'




class App extends React.Component {

  render() {

    return (
      <div className="App">
      <Router>
        <>
        <nav>
          <Link to='/signup'>  Sign Up  </Link>
          <Link to='/homepage'>  Log In  </Link>
          <Link to='/bars'> Bars </Link>


        </nav>
          <Route path='/signup' component={Signup} />
          <Route path='/homepage' component={Homepage} />
          <Route path='/bars' component={Bars} />


        </>
      </Router>
      </div>
    );
  }
}



export default App;
