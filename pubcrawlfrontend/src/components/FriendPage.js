import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {setCurrentListofBudlessUsers} from '../actions/budless'
import UserList from './UserList'
import FriendshipList from './FriendshipList'

class FriendPage extends React.Component {

  componentDidMount = () => {
  fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/budless`)
    .then(r => r.json())
    .then(budlessUsers => {
      this.props.setCurrentListofBudlessUsers(budlessUsers)
    })

  }

  render() {
    return (
      <div>
      <nav>
      <Link to='/bars'>  Search Bars  </Link>
      <Link to='/groups'>  Create a Group  </Link>
      <Link to='/profile'> Back to Profile </Link>
      </nav>
      <UserList />
      <FriendshipList />

      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    friendships:state.friendships.friendships,
    friends:state.friends.friends,
    budless:state.budless.budless,
    bars:state.bars.bars,
    user:state.user.user,
    users:state.users.users,
    pendingFriendees:state.pendingFriendees.pendingFriendees,
    pendingFrienders:state.pendingFrienders.pendingFrienders,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentListofBudlessUsers: (budlessUsers) => dispatch(setCurrentListofBudlessUsers(budlessUsers))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(FriendPage);
