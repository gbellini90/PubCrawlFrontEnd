import React from 'react'
import {connect} from 'react-redux'
// import {setCurrentListofBudlessUsers} from '../actions/budless'
import UserCard from './UserCard'


class UserList extends React.Component {

  render() {
    return (
      <div>
      <h3>All Users</h3>
      {this.props.budless ? this.props.budless.map(budlessuser => <UserCard key= {budlessuser.id} {...budlessuser} />) : null}
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





export default connect(mapStateToProps)(UserList);
