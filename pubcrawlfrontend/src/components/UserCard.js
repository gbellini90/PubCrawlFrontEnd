import React from 'react'
import {connect} from 'react-redux'
import {addPendingFriend} from '../actions/addPendingFriend'

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
    this.props.addPendingFriend(friendship)
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
      bars:state.bars.bars,
      user:state.user.user,
      friendship:state.friendship.friendship,
      budless:state.budless.budless
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPendingFriend: (pendingFriend) => dispatch(addPendingFriend(pendingFriend)),

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
