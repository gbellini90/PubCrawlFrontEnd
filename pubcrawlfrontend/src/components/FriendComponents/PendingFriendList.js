import React from 'react'
import {connect} from 'react-redux'
import {setPendingFrienders} from '../../actions/userActions'
import {setPendingFriendees} from '../../actions/userActions'
import PendingFriendeeCard from './PendingFriendeeCard'
import PendingFrienderCard from './PendingFrienderCard'
import Adapter from '../Adapter'
// import withAuth from '../withAuth'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class PendingFriendList extends React.Component {

componentDidMount() {
  Adapter.fetchPendingFriendees(this.props.user.id)
  .then(pendingFrienders => {
    this.props.setPendingFrienders(pendingFrienders)
  })

  Adapter.fetchPendingFrienders(this.props.user.id)
  .then(pendingFriendees => {
    this.props.setPendingFriendees(pendingFriendees)
  })
}




  render() {
    return (
      <div className="pending-friend-box">
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant={"display1"} align={"center"} noWrap>Pending Friends</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography paragraph={true} align={"center"}>
          {Object.keys(this.props.pendingFriendees).length > 0 ? this.props.pendingFriendees.map(friend => <PendingFriendeeCard key={friend.id} {...friend}/>): null}<br/>
          {Object.keys(this.props.pendingFrienders) ? this.props.pendingFrienders.map(friend => <PendingFrienderCard key={friend.id} {...friend}/>) : null}<br/>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      </div>
    )
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
    setPendingFriendees: (pendingFriends) => dispatch(setPendingFriendees(pendingFriends)),
    setPendingFrienders: (pendingFriends) => dispatch(setPendingFrienders(pendingFriends))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingFriendList);
