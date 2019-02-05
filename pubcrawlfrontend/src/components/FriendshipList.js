import React from 'react'
import {connect} from 'react-redux'
import {setFriendships} from '../actions/friendships'
import FriendCard from './FriendCard'

const apiFriendshipAddress = 'http://localhost:3000/api/v1/friendships'


class FriendshipList extends React.Component {

  componentDidMount = () => {
    fetch(apiFriendshipAddress)
    .then(r => r.json())
    .then(friendships => this.props.setFriendships(friendships))
  }

  // {this.props.friendships ? let friends = this.props.friendships.filter(friendship => friendship.friender_id === this.props.user.id) ? friends.map(friend => <FriendCard key=friend.id {...friend}/>) : null}

  // filterFunction = () => {
  //   this.props.friendships ? this.props.friendship.filter(friendship => friendship.friender_id === this.props.user.id || friendship.friendee_id ===this.props.user.id) : null
  // }

  //
  // filterAndMapFunction = () => {
  //   console.log(this.props.friendships)
  //   if (this.props.friendships) {
  //     let filteredFriendships = this.props.friendships.filter(friendship => friendship.friender_id === this.props.user.id || friendship.friendee_id === this.props.user.id)
  //       console.log(filteredFriendships)
  //       filteredFriendships.map(friend => {
  //         return <FriendCard key={friend.id} {...friend} />
  //       })
  //   }
  //   else {
  //     return "Why doesn't this workkkk"
  //   }
  // }


  render() {
    return (
      <div>
        <h3>Pending Friendships</h3>
        {this.props.friendships ? this.props.friendships.filter(friendship => friendship.friender_id === this.props.user.id || friendship.friendee_id ===this.props.user.id).map(friend => <FriendCard key={friend.id} {...friend}/>) : null}
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
      friendships:state.friendships.friendships
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFriendships: (friendships) => dispatch(setFriendships(friendships))
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(FriendshipList);
