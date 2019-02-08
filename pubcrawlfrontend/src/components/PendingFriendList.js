import React from 'react'
import {connect} from 'react-redux'
import {setPendingFrienders} from '../actions/pendingFriender'
import {setPendingFriendees} from '../actions/pendingFriendee'
import PendingFriendeeCard from './PendingFriendeeCard'
import PendingFrienderCard from './PendingFrienderCard'
class PendingFriendList extends React.Component {


handleFriendeeClick = (id) => {
  fetch(`http://localhost:3000/api/v1/users/${id}/pendingFriendees`)
  .then(r => r.json())
  .then(pendingFrienders => this.props.setPendingFrienders(pendingFrienders))
}


handleFrienderClick = (id) => {
  fetch(`http://localhost:3000/api/v1/users/${id}/pendingFrienders`)
  .then(r => r.json())
  .then(pendingFriendees => this.props.setPendingFriendees(pendingFriendees))
}



  // {this.props.friendships.filter(friendship=>((friendship.friender_id === this.props.user.id && friendship.accepted === false)|| (friendship.friendee_id === this.props.user.id && friendship.accepted === false))).map(friend => (<PendingFriendCard key={friend.id} {...friend} /> ))}
  // {this.props.pendingFriends.map(friend => <PendingFriendCard key={friend.id} {...friend}/>)}
  // <button onClick={()=>this.AllPendingFriends(this.props.user.id)}>View All Pending Friendships </button>


  render() {
    console.log(this.props)
    return (
      <div>
      <h2> Pending Friends </h2>
      <button onClick={()=>this.handleFriendeeClick(this.props.user.id)}>View Pending Requests Sent To You You </button>
      <button onClick={()=>this.handleFrienderClick (this.props.user.id)}>View Pending Requests Sent By You </button>
      {this.props.pendingFriendees ? this.props.pendingFriendees.map(friend => <PendingFriendeeCard key={friend.id} {...friend}/>): null}
      {this.props.pendingFrienders ? this.props.pendingFrienders.map(friend => <PendingFrienderCard key={friend.id} {...friend}/>) : null}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
      bars:state.bars.bars,
      user:state.user.user,
      users:state.users.users,
      friendships:state.friendships.friendships,
      pendingFriendees:state.pendingFriendees.pendingFriendees,
      pendingFrienders:state.pendingFrienders.pendingFrienders,
      budless:state.budless.budless,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPendingFriendees: (pendingFriends) => dispatch(setPendingFriendees(pendingFriends)),
    setPendingFrienders: (pendingFriends) => dispatch(setPendingFrienders(pendingFriends))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PendingFriendList);
