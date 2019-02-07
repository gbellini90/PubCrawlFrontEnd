import React from 'react'
import {connect} from 'react-redux'
import {setFriendship} from '../actions/friendship'
import {setPendingFriends} from '../actions/pendingfriends'
import PendingFriendCard from './PendingFriendCard'

class PendingFriendList extends React.Component {


componentDidLoad = (id) => {
  fetch(`http://localhost:3000/api/v1/users/${id}/pending`)
  .then(r => r.json())
  .then(pendingFriends => this.props.setPendingFriends(pendingFriends))
}

  render() {
    return (
      <div>
      {()=>this.componentDidMount(this.props.user.id)}
      <h2> Pending Friends </h2>
      {this.props.friendships.filter(friendship=>((friendship.friender_id === this.props.user.id && friendship.accepted === false)|| (friendship.friendee_id === this.props.user.id && friendship.accepted === false))).map(friend => (<PendingFriendCard key={friend.id} {...friend} /> ))}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
      bars:state.bars.bars,
      user:state.user.user,
      users:state.users.users,
      friendship:state.friendship.friendship,
      friendships:state.friendships.friendships,
      pendingFriends:state.pendingFriends.pendingFriends
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFriendship: (friendship) => dispatch(setFriendship(friendship)),
    setPendingFriends: (pendingFriends) => dispatch(setPendingFriends(pendingFriends))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PendingFriendList);
