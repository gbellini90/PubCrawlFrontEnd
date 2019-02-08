import React from 'react'
import {connect} from 'react-redux'
import AcceptedFriendCard from './AcceptedFriendCard'

class AcceptedFriendList extends React.Component {

  render() {
    return (
      <div>
      <h2>Your Friend List </h2>
      {this.props.friends ? this.props.friends.map(friend => <AcceptedFriendCard key={friend.id} {...friend}/>) : null}
    </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    bars:state.bars.bars,
    user:state.user.user,
    users:state.user.users,
    friends:state.user.friends,
    friendships:state.user.friendships,
    pendingFriendees:state.user.pendingFriendees,
    pendingFrienders:state.user.pendingFrienders,
    budless:state.user.budless,
  }
}


export default connect(mapStateToProps)(AcceptedFriendList);
