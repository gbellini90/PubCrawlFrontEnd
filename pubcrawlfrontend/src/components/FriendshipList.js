import React from 'react'
import {connect} from 'react-redux'
import PendingFriendList from './PendingFriendList'
import AcceptedFriendList from './AcceptedFriendList'


class FriendshipList extends React.Component {


  render() {
    return (
      <div>
        <AcceptedFriendList />
        <PendingFriendList />
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

export default connect(mapStateToProps)(FriendshipList);
