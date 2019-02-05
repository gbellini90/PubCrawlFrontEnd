import React from 'react';
import './css/App.css';
import { Route} from 'react-router-dom'
import Homepage from './Homepage'
import Signup from './Signup'
import Login from './Login'
import Profile from './Profile'
import BarContainer from './BarContainer'






class App extends React.Component {

  render() {
    return (
      <div className="App">
        <>
          <Route path='/' exact component={Homepage}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/login' component={Login} />
          <Route path='/profile' component={Profile} />
          <Route path='/bars' component={BarContainer} />
        </>
      </div>
    );
  }
}



export default App
