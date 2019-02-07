import React from 'react'
import {connect} from 'react-redux'

class FriendRequests extends React.Component {

  render() {
    console.log(this.props)
    return (
      <div>
      hi from requests
      {this.props.id}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      bars:state.bars.bars,
      user:state.user.user,
      users:state.users.users,
      friendship:state.friendship.friendship,
      friendships:state.friendships.friendships,
      groups:state.groups.groups,
      group:state.group.group,
      friends:state.friends.friends,
      pendingFriends:state.pendingFriends.pendingFriends
  }
}

export default connect(mapStateToProps)(FriendRequests);
