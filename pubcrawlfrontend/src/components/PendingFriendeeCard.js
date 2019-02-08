import React from 'react'
import {connect} from 'react-redux'




class PendingFriendeeCard extends React.Component {


  render() {
    const pendingFriender =
      <div>
      <li>You sent a friend request to : {this.props.name}
      <img src={this.props.pic} alt={this.props.name}/>
      </li>
      </div>
      return this.props ? pendingFriender : "No Friend Requests Sent By You Pending At This Time"

  }
}

const mapStateToProps = (state) => {
  return {
      bars:state.bars.bars,
      user:state.user.user,
      users:state.users.users,
      friendships:state.friendships.friendships,
      groups:state.groups.groups,
      friends:state.friends.friends,
      pendingFriendees:state.pendingFriendees.pendingFriendees,
      pendingFrienders:state.pendingFrienders.pendingFrienders,
  }
}


export default connect(mapStateToProps)(PendingFriendeeCard);
