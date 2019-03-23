import React from 'react'
import {connect} from 'react-redux'
import {setPendingFrienders} from '../../actions/userActions'
import {setPendingFriendees} from '../../actions/userActions'
import PendingFriendeeCard from './PendingFriendeeCard'
import PendingFrienderCard from './PendingFrienderCard'
import Adapter from '../Adapter'
// import withAuth from '../withAuth'

class PendingFriendList extends React.Component {

componentDidMount() {
  Adapter.fetchPendingFriendees(this.props.user.id)
  .then(pendingFrienders => {
    this.props.setPendingFrienders(pendingFrienders)
  })

  Adapter.fetchPendingFrienders(this.props.user.id)
  .then(pendingFriendees => {
    this.props.setPendingFriendees(pendingFriendees)
  })
}


  render() {
    return (
      <div className="pending-friend-box">
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
