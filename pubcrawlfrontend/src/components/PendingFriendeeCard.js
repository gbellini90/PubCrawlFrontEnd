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
    users:state.user.users,
    friendships:state.user.friendships,
    pendingFriendees:state.user.pendingFriendees,
    pendingFrienders:state.user.pendingFrienders,
    budless:state.user.budless,
  }
}


export default connect(mapStateToProps)(PendingFriendeeCard);
