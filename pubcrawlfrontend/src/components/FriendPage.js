import React from 'react'
import {connect} from 'react-redux'
import {setFriends} from '../actions/friends'
import {setCurrentListofBudlessUsers} from '../actions/budless'
// import {setFriendships} from '../actions/friendships'
import {Link} from 'react-router-dom'
import UserList from './UserList'
import FriendshipList from './FriendshipList'
// import Profile from './Profile'

// const apiFriendshipAddress = 'http://localhost:3000/api/v1/friendships'

class FriendPage extends React.Component {

  componentDidMount = () => {
  fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/budless`)
    .then(r => r.json())
    .then(budlessUsers => {
      this.props.setCurrentListofBudlessUsers(budlessUsers)
    })

    fetch (`http://localhost:3000/api/v1/users/${this.props.user.id}/friends`)
    .then (r => r.json())
    .then(friends => {
      this.props.setFriends(friends)
    })
  }

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
    bars:state.bars.bars,
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
    setCurrentListofBudlessUsers: (budlessUsers) => dispatch(setCurrentListofBudlessUsers(budlessUsers)),
    setFriends: (friends) => dispatch(setFriends(friends)),
    // setFriendships: (friendships) => dispatch(setFriendships(friendships)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FriendPage);
