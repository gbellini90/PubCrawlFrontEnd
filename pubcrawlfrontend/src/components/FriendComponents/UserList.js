import React from 'react'
import {connect} from 'react-redux'
import UserCard from './UserCard'
import withAuth from '../withAuth'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class UserList extends React.Component {

  render() {
    return (
      <div className="all-users">

      <div>
      <br/>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"display1"} align={"center"} noWrap>All Users</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                    {Object.keys(this.props.budless).length > 0 ? this.props.budless.map(budlessuser => <UserCard key= {budlessuser.id} {...budlessuser} />) : null}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
      </div>


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







export default withAuth(connect(mapStateToProps)(UserList));
