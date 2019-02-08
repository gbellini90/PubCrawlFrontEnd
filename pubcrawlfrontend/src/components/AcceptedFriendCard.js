import React from 'react'
import {connect} from 'react-redux'

class AcceptedFriendCard extends React.Component {

  render() {
    return (
      <div>
        <li>{this.props.name} <br/>
        <img src={this.props.pic} alt={this.props.name}/> </li><br/>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    friendships:state.friendships.friendships,
    friends:state.friends.friends,
    budless:state.budless.budless,
    bars:state.bars.bars,
    user:state.user.user,
    users:state.users.users,
    pendingFriendees:state.pendingFriendees.pendingFriendees,
    pendingFrienders:state.pendingFrienders.pendingFrienders,
  }
}


export default connect(mapStateToProps)(AcceptedFriendCard)
