import React from 'react'
import {connect} from 'react-redux'
import {addPendingFriend} from '../../actions/userActions'
import {addToFriendships} from '../../actions/userActions'
import Adapter from '../Adapter'
import Card from '@material-ui/core/Card';

class UserCard extends React.Component {

  requestClick = (id) => {
    Adapter.fetchPostFriends(id, this.props.user.id)
    .then(friendship => {
    let friendeeObj = this.props.users.find(user => user.id === id)
    this.props.addToFriendships(friendship)
    this.props.addPendingFriend(friendeeObj)
  })}



  render() {
    return (
      <div>
      <Card>
      {this.props.name}
      <button className="btn" onClick={()=> this.requestClick(this.props.id)}> Send a friend request! </button>
      </Card>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToFriendships: (friendship) => dispatch(addToFriendships(friendship)),
    addPendingFriend: (pendingFriend) => dispatch(addPendingFriend(pendingFriend))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
