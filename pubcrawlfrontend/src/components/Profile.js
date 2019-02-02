import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Bars from './Bars'


class Profile extends React.Component {

  render() {
    return (
      <div>Profile Page
        <Link to='/bars'> Bars </Link>
        <Route path='/bars' component={Bars} />
      </div>
    );
  }

}

export default Profile;
