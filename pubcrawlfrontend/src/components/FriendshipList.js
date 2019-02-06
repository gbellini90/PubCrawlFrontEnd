import React from 'react'
import {connect} from 'react-redux'
import {setFriendships} from '../actions/friendships'
import PendingFriendCard from './PendingFriendCard'
import AcceptedFriendCard from './AcceptedFriendCard'

const apiFriendshipAddress = 'http://localhost:3000/api/v1/friendships'


class FriendshipList extends React.Component {

  componentDidMount = () => {
    fetch(apiFriendshipAddress)
    .then(r => r.json())
    .then(friendships => {
      this.props.setFriendships(friendships)
  })
  }




  render() {
    return (
      <div>
        <h3>Friendships</h3>
        {this.props.friendships ? this.props.friendships.filter(friendship => (friendship.accepted === true && friendship.friender_id === this.props.user.id) || ( friendship.accepted === true && friendship.friendee_id === this.props.user.id)).map(friend => <AcceptedFriendCard key={friend.id} {...friend}/>) : null}
        {this.props.friendships ? this.props.friendships.filter(friendship => (friendship.accepted === false && friendship.friender_id === this.props.user.id) || ( friendship.accepted === false && friendship.friendee_id === this.props.user.id)).map(friend => <PendingFriendCard key={friend.id} {...friend}/>) : null}
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
      buds:state.buds.buds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFriendships: (friendships) => dispatch(setFriendships(friendships)),

  }
}




export default connect(mapStateToProps, mapDispatchToProps)(FriendshipList);
