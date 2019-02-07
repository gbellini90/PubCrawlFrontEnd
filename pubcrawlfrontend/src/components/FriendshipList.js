import React from 'react'
import {connect} from 'react-redux'
import {setFriendships} from '../actions/friendships'
import PendingFriendList from './PendingFriendList'
import AcceptedFriendList from './AcceptedFriendList'

const apiFriendshipAddress = 'http://localhost:3000/api/v1/friendships'


class FriendshipList extends React.Component {

  componentDidMount = () => {
    fetch(apiFriendshipAddress)
    .then(r => r.json())
    .then(friendships => {
      this.props.setFriendships(friendships)
  })
  }


  // {this.props.friendships ? this.props.friendships.filter(friendship => (friendship.accepted === false && friendship.friender_id === this.props.user.id) || ( friendship.accepted === false && friendship.friendee_id === this.props.user.id)).map(friend => <PendingFriendCard key={friend.id} {...friend}/>) : "No friend requests at this time"}

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
      friendship:state.friendship.friendship,
      friendships:state.friendships.friendships,
      friends:state.friends.friends,
      pendingFriends:state.pendingFriends.pendingFriends
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFriendships: (friendships) => dispatch(setFriendships(friendships)),

  }
}




export default connect(mapStateToProps, mapDispatchToProps)(FriendshipList);
