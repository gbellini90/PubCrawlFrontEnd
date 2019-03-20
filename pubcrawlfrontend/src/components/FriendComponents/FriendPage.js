import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import UserList from './UserList'
import FriendshipList from './FriendshipList'
import {logoutUser} from '../../actions/userActions'

class FriendPage extends React.Component {


  render() {
    return (
      <div>
      <nav>
        <Link to='/groups'>  Visit the Group Page  </Link>
        <Link to='/' onClick={this.props.logoutUser}> Logout </Link>
      </nav>

        <div className= "friend-box">
          <UserList />
          <FriendshipList />
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    user:state.user.user,
    users:state.user.users,
    friendships:state.user.friendships,
    pendingFriendees:state.user.pendingFriendees,
    pendingFrienders:state.user.pendingFrienders,
    budless:state.user.budless,
    friends:state.user.friends
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      logoutUser: () =>dispatch(logoutUser())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FriendPage);
