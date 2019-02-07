import React from 'react'
import {connect} from 'react-redux'
import AcceptedFriendList from './AcceptedFriendList'


class GroupCard extends React.Component {

  deleteGroup = (group_id) => {
    fetch(`http://localhost:3000/api/v1/groups/${group_id}`, {
      method:"DELETE"
    }).then(r => r.json())}

  addFriendsToGroup = (id) => {
    console.log(this.props.buds)
  }


  render() {
    return (
      <div>
      <ul>
      <li>{this.props.name} <button onClick={()=>this.deleteGroup(this.props.id)}>x</button><br />
      <button onClick={()=>this.addFriendsToGroup(this.props.user.id)}> Add Friends to This Group!</button>
      <button> Create A Pub Crawl With This Group </button>
      </li>
    </ul>
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
      group:state.group.group,
      groups:state.groups.groups
  }
}

export default connect(mapStateToProps)(GroupCard);
