import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import UserList from './UserList'
import FriendshipList from './FriendshipList'
// import withAuth from '../withAuth'

class FriendPage extends React.Component {


  render() {
    return (
      <div>
      <nav>
      <Link to='/groups'>  Visit the Group Page  </Link>
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


export default connect(mapStateToProps)(FriendPage);
