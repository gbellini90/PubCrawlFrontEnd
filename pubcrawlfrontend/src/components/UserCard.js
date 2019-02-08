import React from 'react'
import {connect} from 'react-redux'
import {addPendingFriend} from '../actions/addPendingFriend'
import {addToFriendships} from '../actions/addToFriendships'

class UserCard extends React.Component {

  requestClick = (id) => {
    fetch('http://localhost:3000/api/v1/friendships', {
      method:"POST",
      headers: {
              "Content-Type": "application/json",
              "Accept":"application/json"},
      body:
        JSON.stringify({
          friendee_id: id,
          friender_id: this.props.user.id
        })
      }
  ).then(r =>r.json())
  .then(friendship => {
    let friendeeObj = this.props.users.find(user => user.id === id)
    this.props.addToFriendships(friendship)
    this.props.addPendingFriend(friendeeObj)
  })}



  render() {
    return (
      <div>
      <li>{this.props.name}</li>
      <button onClick={()=> this.requestClick(this.props.id)}> Send a friend request! </button>
      </div>
    );
  }

}


const mapStateToProps = (state) => {
  return {
      friendships:state.friendships.friendships,
      friends:state.friends.friends,
      budless:state.budless.budless,
      bars:state.bars.bars,
      user:state.user.user,
      users:state.users.users,
      pendingFriendees:state.pendingFriendees.pendingFriendees,
      pendingFrienders:state.pendingFrienders.pendingFrienders,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToFriendships: (friendship) => dispatch(addToFriendships(friendship)),
    addPendingFriend: (pendingFriend) => dispatch(addPendingFriend(pendingFriend))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
