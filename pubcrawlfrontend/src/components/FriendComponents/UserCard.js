import React from 'react'
import {connect} from 'react-redux'
import {addPendingFriend} from '../../actions/userActions'
import {addToFriendships} from '../../actions/userActions'
// import withAuth from '../withAuth'

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
      <button className="btn" onClick={()=> this.requestClick(this.props.id)}> Send a friend request! </button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    addToFriendships: (friendship) => dispatch(addToFriendships(friendship)),
    addPendingFriend: (pendingFriend) => dispatch(addPendingFriend(pendingFriend))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
