import React from 'react'
import {connect} from 'react-redux'

class FriendCard extends React.Component {

findFrienderUserObj = (friender_id) => {
  let foundFriender = this.props.users.find(user => user.id === friender_id)
  return (foundFriender ? foundFriender.name : null)
}

findFriendeeUserObj = (friendee_id) => {
  let foundFriendee = this.props.users.find(user => user.id === friendee_id)
  return (foundFriendee ? foundFriendee.name : null)
}

  // Checking for friender_id in friendships: {this.props.friender_id === this.props.user.id ? "YEPP Sender of a friend request" : "NOT the friender in this friendship"} <br/>
  // Checking for friendee_id in friendships: {this.props.friendee_id=== this.props.user.id ? "YEPP Recipient of a friend request" : "NOT the friendee in this friendship"} <br/>

  render() {
    console.log(this.props)
    return (
      <div>
        <li>Friendship id: {this.props.id} <br/>
            Friender_id: {this.props.friender_id} <br/>
            Friendee_id {this.props.friendee_id} <br/>
            Friend Request Made by you?:   {this.props.friender_id === this.props.user.id ? "Your friend request is pending" : "No"} <br/>
            Friend Request SENT to you?:  {this.props.friendee_id === this.props.user.id ? <button> Accept Friend Request </button>: "No"} <br/>
            Who did you friend: {this.props.friender_id === this.props.user.id ? `${this.findFriendeeUserObj(this.props.friendee_id)}` : "nobody"} <br/>
            Who friended you: {this.props.friendee_id === this.props.user.id ? `${this.findFrienderUserObj(this.props.friender_id)}` : "nobody"}<br/>
            Accepted? : {this.props.accepted ? "Accepted" : "Not Accepted"}
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

export default connect(mapStateToProps)(FriendCard);
