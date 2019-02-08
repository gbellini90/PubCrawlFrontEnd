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
