import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import BarContainer from './BarContainer'
import {Card} from 'react-materialize'



class Profile extends React.Component {

  render() {
    console.log(this.props.currentUser);
    return (
      <div>
      <div className="card horizontal">

          <div className="card-image waves-effect waves-block waves-light">
            <img className="card-image" src={this.props.currentUser.pic}/>
          </div>

          <div className="card-content">
            <span className="card-title grey-text text-darken-4">{this.props.currentUser.name}<i className="material-icons right">{this.props.currentUser.age}</i></span>
            <p>{this.props.currentUser.bio}.</p>
          </div>

      </div>
      <Router>
        <>
        <nav>
        <Link to='/bars'>  Bars  </Link>
        </nav>
        <Route path='/bars' component={BarContainer} />
        </>
      </Router>
      </div>







    );
  }

}



export default Profile;
