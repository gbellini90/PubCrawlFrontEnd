import React from 'react';
import './css/Homepage.css';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

class Homepage extends React.Component {

  render() {
    return (
      <div className="Homepage">
      Hi from the Homepage
        <nav>
          <Link to='/signup'>  Sign Up  </Link>
          <Link to='/login'>  Log In  </Link>
        </nav>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    user:state.user.user
  }
}

export default connect(mapStateToProps)(Homepage);
