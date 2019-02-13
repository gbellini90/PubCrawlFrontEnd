import React from 'react';
// import './css/App.css';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
// import Pouring from 'pouring'

// const sectionStyle = {
//   width: "100%",
//   height: "400px",
//   backgroundImage: `url(https://unsplash.com/photos/QehrgvNJSKg)`
// };

// <img src='../pouring.jpg' alt="beer" />


class Homepage extends React.Component {


  render() {
    return (
      <div className="homepage">


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
