import React from 'react'
import {connect} from 'react-redux'
import {removeGroup} from '../actions/removegroup'
import {addToUserGroup} from '../actions/addtousergroup'
import {setUserGroups} from '../actions/usergroups'




class GroupCard extends React.Component {

  state= {
    clicked:false
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/api/v1/user_groups')
    .then(r => r.json())
    .then(usergroups => this.props.setUserGroups(usergroups))
  }

  deleteGroup = (group_id) => {
    fetch(`http://localhost:3000/api/v1/groups/${group_id}`, {
      method:"DELETE"
    })
    let deleteGroup = this.props.groups.find(group => group.id === group_id)
    this.props.removeGroup(deleteGroup)
  }

  addFriendToGroup = (id) => {
    this.setState({clicked:true})
    fetch('http://localhost:3000/api/v1/user_groups', {
      method:"POST",
      headers: {
              "Content-Type": "application/json",
              "Accept":"application/json"},
      body:
        JSON.stringify({
          user_id:id ,
          group_id:this.props.id
        })
      })
      .then(r =>r.json())
      .then(userGroup => this.props.addToUserGroup(userGroup))
  }
//
// {this.props.usergroups ? this.props.usergroups.filter(usergroup => usergroup.group_id === this.props.id).map(usergroup => <li>{usergroup.id} {usergroup.group_id} {usergroup.user_id} </li>) : null}


  render() {
    return (
      <div>
      <ul>
      <li>{this.props.name} <button onClick={()=>this.deleteGroup(this.props.id)}>x</button><br />
      {this.props.friends.map(friend => <li> {friend.name} <button onClick={()=>this.addFriendToGroup(friend.id)}> {this.state.clicked ? `Added! to ${this.props.name}` : "Add to Group?"} </button> </li>)}
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
      users:state.user.users,
      friendships:state.user.friendships,
      groups:state.groups.groups,
      friends:state.user.friends,
      usergroups:state.groups.usergroups
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeGroup: (group) => dispatch(removeGroup(group)),
    setUserGroups: (groups) => dispatch(setUserGroups(groups)),
    addToUserGroup : (usergroup)=> dispatch(addToUserGroup(usergroup))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(GroupCard);
