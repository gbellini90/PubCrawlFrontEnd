import React from 'react'
import {connect} from 'react-redux'
import {setPendingFrienders} from '../actions/pendingFriender'
import {setPendingFriendees} from '../actions/pendingFriendee'
import PendingFriendeeCard from './PendingFriendeeCard'
import PendingFrienderCard from './PendingFrienderCard'

class PendingFriendList extends React.Component {

componentDidMount() {
  fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/pendingFriendees`)
  .then(r => r.json())
  .then(pendingFrienders => {
    this.props.setPendingFrienders(pendingFrienders)
  })

  fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/pendingFrienders`)
  .then(r => r.json())
  .then(pendingFriendees => {
    this.props.setPendingFriendees(pendingFriendees)
  })
}


  render() {
    return (
      <div>
      <h3> Pending Friends </h3>
      {Object.keys(this.props.pendingFriendees).length > 0 ? this.props.pendingFriendees.map(friend => <PendingFriendeeCard key={friend.id} {...friend}/>): null}
      {Object.keys(this.props.pendingFrienders) ? this.props.pendingFrienders.map(friend => <PendingFrienderCard key={friend.id} {...friend}/>) : null}
      </div>
    )
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
    setPendingFriendees: (pendingFriends) => dispatch(setPendingFriendees(pendingFriends)),
    setPendingFrienders: (pendingFriends) => dispatch(setPendingFrienders(pendingFriends))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingFriendList);
