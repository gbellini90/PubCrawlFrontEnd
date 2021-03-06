import React from 'react'
import {connect} from 'react-redux'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

class AcceptedFriendCard extends React.Component {

  handleClick = (user_info) => {
    console.log(user_info);
  }

  render() {
    return (
      <div>
      <List>
        <ListItem alignItems={'center'}>
          <ListItemAvatar onClick={()=>this.handleClick(this.props)} >
            <Avatar style={{borderRadius:0, width:125, height:125}} src={this.props.pic} alt={this.props.name}/>
          </ListItemAvatar>
          <ListItemText inset>
             <Typography variant={"subheading"} noWrap>
                 {this.props.name}
             </Typography>
           </ListItemText>
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

export default connect(mapStateToProps)(AcceptedFriendCard)
