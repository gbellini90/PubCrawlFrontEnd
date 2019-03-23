import React from 'react'
import {connect} from 'react-redux'
import AcceptedFriendCard from './AcceptedFriendCard'
// import withAuth from '../withAuth'

class AcceptedFriendList extends React.Component {

  render() {
    return (
      <div className="accepted-friend-box">
      <h3>Your Friend List </h3>
      {Object.keys(this.props.friends).length > 0 ? this.props.friends.map(friend => <AcceptedFriendCard key={friend.id} {...friend}/>) : null}
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
