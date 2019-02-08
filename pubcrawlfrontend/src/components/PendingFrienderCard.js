import React from 'react'
import {connect} from 'react-redux'
import {addFriend} from '../actions/addfriend'



class PendingFrienderCard extends React.Component {

  acceptFriendRequest = (id) => {
    fetch(`http://localhost:3000/api/v1/friendships/${id}`, {
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
  .then(friendship => {
    let frienderObj = this.props.users.find(user => user.id === friendship.friender_id)
    this.props.addFriend(frienderObj)
  })}



  render() {
    const pendingFriendee =
      <div>
      <li> You have a friend request from: {this.props.name}
      <img src={this.props.pic} alt={this.props.name} />
      {this.props.friendships.filter(friend => friend.friender_id === this.props.id && friend.friendee_id === this.props.user.id).map(friendship => <button onClick={()=>this.acceptFriendRequest(friendship.id)}> Accept Friend Request! </button>)}
      </li>

      </div>
      return this.props ? pendingFriendee : "You don't have any requests at this time"
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
    addFriend: (friend) => dispatch(addFriend(friend)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingFrienderCard);
