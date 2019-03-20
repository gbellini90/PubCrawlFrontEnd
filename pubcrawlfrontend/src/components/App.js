import React from 'react';
import './css/App.css';
import { Route} from 'react-router-dom'
import Homepage from './Homepage'
import Signup from './Signup'
import Login from './Login'
import Profile from './Profile'
import BarContainer from './BarComponents/BarContainer'
import GroupPage from './GroupComponents/GroupPage'
import FriendPage from './FriendComponents/FriendPage'
import PubCrawlPage from './PubCrawlComponents/pubcrawlpage'
import PubCrawlShow from './PubCrawlComponents/pubcrawlshow'



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
          <Route path='/groups' component={GroupPage} />
          <Route path='/friends' component={FriendPage} />
          <Route path='/pubcrawl' component={PubCrawlPage} />
          <Route path ='/mypubcrawl' component={PubCrawlShow}/>
        </>
      </div>
    );
  }
}



export default App
