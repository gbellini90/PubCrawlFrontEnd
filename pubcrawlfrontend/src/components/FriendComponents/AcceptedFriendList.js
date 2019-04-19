import React from 'react'
import {connect} from 'react-redux'
import AcceptedFriendCard from './AcceptedFriendCard'
// import withAuth from '../withAuth'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


class AcceptedFriendList extends React.Component {

  render() {
    return (
      <div className="accepted-friend-box">
      <ExpansionPanel defaultExpanded={true}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant={"display1"} align={"center"} noWrap>Your Friend List</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography align={"center"}>
            {Object.keys(this.props.friends).length > 0 ? this.props.friends.map(friend => <AcceptedFriendCard key={friend.id} {...friend}/>) : null}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    bars:state.bars.bars,
    user:state.user.user,
    users:state.user.users,
    friends:state.user.friends,
    friendships:state.user.friendships,
    pendingFriendees:state.user.pendingFriendees,
    pendingFrienders:state.user.pendingFrienders,
    budless:state.user.budless,
  }
}


export default connect(mapStateToProps)(AcceptedFriendList);
