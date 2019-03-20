import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {setCurrentUserList} from '../actions/userActions'
import {setFriendships} from '../actions/userActions'
import Adapter from './Adapter'



class Homepage extends React.Component {

  componentDidMount = () => {
    Adapter.fetchUsers()
    .then(allUsers => this.props.setCurrentUserList(allUsers))

    Adapter.fetchFriendships()
    .then(friendships => {
      this.props.setFriendships(friendships)
    })

  }

    render() {
      console.log(this.props);
      return (
        <div className="homepage">
          <nav>
          <span className="homepagetitle">PubHub</span>
            <Link className="homepagelink" to='/signup'>Sign Up  </Link>
            <Link className="homepagelink" to='/login'>   Log In  </Link>
          </nav>

        </div>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    user:state.user.user,
    users:state.user.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUserList: (users) => dispatch(setCurrentUserList(users)),
    setFriendships: (friendships) => dispatch(setFriendships(friendships)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
