import React from 'react'
import {connect} from 'react-redux'
import {addPendingFriend} from '../../actions/userActions'
import {addToFriendships} from '../../actions/userActions'
import Adapter from '../Adapter'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


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
      <List>
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar style={{width:100, height:100}} alt={this.props.name} src={this.props.pic} />
            </ListItemAvatar>
            <ListItemText
              primary={this.props.name}
              secondary= {<Button min={true} variant={'outlined'} color={"secondary"} onClick={()=> this.requestClick(this.props.id)}> Send a friend request! </Button>}>
            </ListItemText> <br/>
        </ListItem>
      </List>
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
