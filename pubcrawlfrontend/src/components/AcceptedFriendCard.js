import React from 'react'
import {connect} from 'react-redux'
import {setBuds} from '../actions/buds'

class AcceptedFriendCard extends React.Component {

  findFriendeeUserObjName = () => {
    let foundFriendee = this.props.users.find(user => user.id === this.props.friendee_id || user.id === this.props.friender_id)
    return (foundFriendee ? foundFriendee.name : null)
  }

  findFriendeeUserObjPic = () => {
    let foundFriendee = this.props.users.find(user => user.id === this.props.friendee_id || user.id === this.props.friender_id)
    return (foundFriendee ? foundFriendee.pic : null)
  }


  componentDidMount = () => {
    if (this.props.friendships)
    {this.props.setBuds(this.props.friendships.filter(friendship =>(friendship.accepted === true && friendship.friender_id === this.props.user.id) || ( friendship.accepted === true && friendship.friendee_id === this.props.user.id)))
    }
  }

  // addToGroup = (id) => {
  //   console.log(id)
  //   let groupChoices = this.props.groups.filter(group => group.id === id)
  // }

  // <button onClick={()=>this.addToGroup(this.props.user.id)}> Add to Group! </button>

  render() {
    return (
      <div>
      <h3> Your List of Friends </h3>
      <li> Name : {this.findFriendeeUserObjName()} <br />
      <img src={this.findFriendeeUserObjPic()} alt={this.findFriendeeUserObjName()}/> <br />

      </li> <br/>

    </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
      bars:state.bars.bars,
      user:state.user.user,
      users:state.users.users,
      friendship:state.friendship.friendship,
      friendships:state.friendships.friendships,
      groups:state.groups.groups,
      group:state.group.group
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBuds: (buds) => dispatch(setBuds(buds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptedFriendCard);
