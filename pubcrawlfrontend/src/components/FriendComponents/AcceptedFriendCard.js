import React from 'react'
import {connect} from 'react-redux'
import Card from '@material-ui/core/Card';

class AcceptedFriendCard extends React.Component {

  render() {
    return (
      <div>
      <Card>
        {this.props.name} <br/> <br/>
        <img src={this.props.pic} alt={this.props.name}/><br/>
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

export default connect(mapStateToProps)(AcceptedFriendCard)
