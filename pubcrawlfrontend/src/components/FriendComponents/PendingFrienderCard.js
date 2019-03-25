import React from 'react'
import {connect} from 'react-redux'
import {addFriend} from '../../actions/userActions'
import Adapter from '../Adapter'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


class PendingFrienderCard extends React.Component {

  acceptFriendRequest = (id) => {
    Adapter.fetchPatchFriendship(id)
    .then(friendship => {
    let frienderObj = this.props.users.find(user => user.id === friendship.friender_id)
    this.props.addFriend(frienderObj)
  })}



  render() {
    const pendingFriendee =
      <div>
      <Card>
        <CardContent>You have a friend request from: <br/> {this.props.name}
         <img src={this.props.pic} alt={this.props.name} />
        {this.props.friendships.filter(friend => friend.friender_id === this.props.id && friend.friendee_id === this.props.user.id).map(friendship => <Button key={friendship.id} onClick={()=>this.acceptFriendRequest(friendship.id)}> Accept Friend Request! </Button>)}
        </CardContent>
      </Card>
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
