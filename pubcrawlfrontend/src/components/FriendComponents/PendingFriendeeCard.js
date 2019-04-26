import React from 'react'
import {connect} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

class PendingFriendeeCard extends React.Component {



  render() {
    const pendingFriender =
      <div>
      <List>
        <ListItem alignItems={'center'}>
        <ListItemAvatar>
          <Avatar style={{width:100, height:100}} src={this.props.pic} alt={this.props.name}/>
        </ListItemAvatar>
        <ListItemText
          primary={`You sent a friend request to: ${this.props.name}`}>
        </ListItemText>
        </ListItem>
      </List>
      </div>
      return this.props ? pendingFriender : "No Friend Requests Sent By You Pending At This Time"

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


export default connect(mapStateToProps)(PendingFriendeeCard);
