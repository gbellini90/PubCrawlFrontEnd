import React from 'react'
import {connect} from 'react-redux'
import {setFriendship} from '../actions/friendship'

class PendingFriendCard extends React.Component {

findFrienderUserObj = (friender_id) => {
  let foundFriender = this.props.users.find(user => user.id === friender_id)
  return (foundFriender ? foundFriender.name : null)
}

findFriendeeUserObj = (friendee_id) => {
  let foundFriendee = this.props.users.find(user => user.id === friendee_id)
  return (foundFriendee ? foundFriendee.name : null)
}

acceptFriendRequest = (friend_id) => {
  console.log('accepteeed',friend_id);
  fetch(`http://localhost:3000/api/v1/friendships/${friend_id}`, {
    method:"PATCH",
    headers: {
            "Content-Type": "application/json",
            "Accept":"application/json"},
    body:
      JSON.stringify({
        accepted: true
      })
    }
).then(r =>r.json())
.then(friendship => this.props.setFriendship(friendship))
}



  render() {
    return (
      <div>
      <h3>Pending Friendships:</h3>
        <li>Friendship id: {this.props.id} <br/>
            Friender_id: {this.props.friender_id} <br/>
            Friendee_id {this.props.friendee_id} <br/>
            Friend Request Made by you?:  {this.props.friender_id === this.props.user.id ? `Your friend request is ${this.props.accepted ? "has been accepted" : "pending"}` : null} <br/>
            Friend Request SENT to you?:  {this.props.friendee_id === this.props.user.id  && this.props.accepted === false ? <button onClick={() => this.acceptFriendRequest(this.props.id)}> Accept Friend Request </button>: "No"} <br/>
            Who did you friend: {this.props.friender_id === this.props.user.id ? `${this.findFriendeeUserObj(this.props.friendee_id)}` : "nobody"} <br/>
            Who friended you: {this.props.friendee_id === this.props.user.id ? `${this.findFrienderUserObj(this.props.friender_id)}` : "nobody"}<br/>
            Accepted? : {this.props.accepted ? "ACCEPTED!!!!" : "Pending"}
        </li> <br/>




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
      friendships:state.friendships.friendships
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFriendship: (friendship) => dispatch(setFriendship(friendship))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PendingFriendCard);
