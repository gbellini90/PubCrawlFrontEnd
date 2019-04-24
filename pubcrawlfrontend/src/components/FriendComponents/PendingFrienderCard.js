import React from 'react'
import {connect} from 'react-redux'
import {addFriend} from '../../actions/userActions'
import Adapter from '../Adapter'
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';


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
        <List>
          <ListItem alignItems={'center'}>
            <ListItemAvatar>
              <Avatar style={{borderRadius:0, width:150, height:150}} src={this.props.pic} alt={this.props.name}/>
            </ListItemAvatar>
          </ListItem>
          <ListItem alignItems={'center'}>
            <ListItemText
              primary={`You have a friend request from: ${this.props.name}`}
              secondary={this.props.friendships.filter(friend => friend.friender_id === this.props.id && friend.friendee_id === this.props.user.id).map(friendship => <Button size={"small"}  variant={"contained"} color={"secondary"} key={friendship.id} onClick={()=>this.acceptFriendRequest(friendship.id)}> Accept Friend Request! </Button>)}>
              </ListItemText>
          </ListItem>
        </List>
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
