import React from 'react'
import {connect} from 'react-redux'
import UserCard from './UserCard'


class UserList extends React.Component {

  render() {
    return (
      <div className="all-users">
      <h3>All Users</h3>
      {Object.keys(this.props.budless).length > 0 ? this.props.budless.map(budlessuser => <UserCard key= {budlessuser.id} {...budlessuser} />) : null}
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
  }
}





export default connect(mapStateToProps)(UserList);
