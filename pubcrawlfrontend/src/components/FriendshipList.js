import React from 'react'
import {connect} from 'react-redux'
import PendingFriendList from './PendingFriendList'
import AcceptedFriendList from './AcceptedFriendList'
// import {setPendingFrienders} from '../actions/pendingFriender'
// import {setPendingFriendees} from '../actions/pendingFriendee'


class FriendshipList extends React.Component {

  // componentDidMount() {
  //   fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/pendingFriendees`)
  //   .then(r => r.json())
  //   .then(pendingFrienders => {
  //     this.props.setPendingFrienders(pendingFrienders)
  //   })
  //
  //   fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/pendingFrienders`)
  //   .then(r => r.json())
  //   .then(pendingFriendees => {
  //     this.props.setPendingFriendees(pendingFriendees)
  //   })
  // }


  render() {
    return (
      <div className ="friendlist-box">
        <AcceptedFriendList />
        <PendingFriendList />
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
    friends:state.user.friends
  }
}
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     setPendingFriendees: (pendingFriends) => dispatch(setPendingFriendees(pendingFriends)),
//     setPendingFrienders: (pendingFriends) => dispatch(setPendingFrienders(pendingFriends))
//   }
// }

export default connect(mapStateToProps)(FriendshipList);
