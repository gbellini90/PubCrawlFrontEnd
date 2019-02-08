import React from 'react'
import {connect} from 'react-redux'
// import {setFriends} from '../actions/friends'
import AcceptedFriendCard from './AcceptedFriendCard'

class AcceptedFriendList extends React.Component {

  // handleClick = () => {
  //   fetch (`http://localhost:3000/api/v1/users/${this.props.user.id}/friends`)
  //   .then (r => r.json())
  //   .then(friends => {
  //     this.props.setFriends(friends)
  //   })
  // }

  // {this.props.friends ? this.props.friends.map(friend => <li> {friend.name} <img src={friend.pic}/> </li>) : null}
  // <button onClick={()=>this.handleClick(this.props.user.id)}>View Your friends</button>

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
      users:state.users.users,
      friendships:state.friendships.friendships,
      groups:state.groups.groups,
      friends:state.friends.friends,
      budless:state.budless.budless
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setFriends: (friends) => dispatch(setFriends(friends))
//   }
// }

export default connect(mapStateToProps)(AcceptedFriendList);
