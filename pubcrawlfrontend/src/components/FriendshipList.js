import React from 'react'
import {connect} from 'react-redux'
import {setFriends} from '../actions/friends'
import PendingFriendList from './PendingFriendList'
import AcceptedFriendList from './AcceptedFriendList'


class FriendshipList extends React.Component {

  componentDidMount = () => {
      fetch (`http://localhost:3000/api/v1/users/${this.props.user.id}/friends`)
      .then (r => r.json())
      .then(friends => {
        this.props.setFriends(friends)
      })
    }



  render() {
    return (
      <div>
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
      friendships:state.friendships.friendships,
      friends:state.friends.friends,
      pendingFriendees:state.pendingFriendees.pendingFriendees,
      pendingFrienders:state.pendingFrienders.pendingFrienders,
      budless:state.budless.budless,
      users:state.users.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFriends: (friends) => dispatch(setFriends(friends))
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(FriendshipList);
