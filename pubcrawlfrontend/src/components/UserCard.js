import React from 'react'
import {connect} from 'react-redux'
import {setFriendship} from '../actions/friendship'

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
    this.props.setFriendship(friendship)
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
    setFriendship: (friendship) => dispatch(setFriendship(friendship))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
