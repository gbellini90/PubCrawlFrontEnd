import React from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import {addGroup} from '../actions/addgroup'
import {setGroups} from '../actions/groups'
import GroupCard from './GroupCard'


const apiGroupsAddress = 'http://localhost:3000/api/v1/groups'

class Group extends React.Component {

    // {this.props.groups ? this.props.groups.filter(group =>(group.creator_id !== this.props.user.id))}

  state = {
    groupName : ''
  }

  componentDidMount = () => {
    fetch(apiGroupsAddress)
    .then(r => r.json())
    .then(groups => this.props.setGroups(groups))
  }

  createGroup = (event) => {
      event.preventDefault()
       const postConfig = {
      	method:"POST",
      	headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
            name: this.state.groupName,
            creator_id: this.props.user.id
          }
        )
      }

      fetch(apiGroupsAddress,postConfig)
        .then(r=>r.json())
        .then(groupObj => {
          this.props.addGroup(groupObj)
        })
      }

  handleChange = (event) => {
    this.setState({
   [event.target.name]: event.target.value
 })
}


  render() {
    console.log((this.props.groups));
    return (
      <div>
      <h1> Group Page </h1>
        <h4> Create a New Group Below !</h4>
      <form onSubmit={this.createGroup}>
        <input onChange={this.handleChange} name="groupName" value={this.state.groupName} type="text" placeholder="Enter Group Name here!"/>
        <input type="submit" />
      </form>
      <h3> Your Created Group(s) </h3>
      {this.props.groups ? this.props.groups.filter(group => (group.creator_id === this.props.user.id)).map(mygroup => <GroupCard key={mygroup.id} {...mygroup} usersfromgroup={mygroup.users} />) : null}
      <h3> Groups You're In </h3>
      {this.props.groups.users ? this.props.groups.users.filter(user => user.id === this.props.user.id).map(group => <li>{group.name}</li>) : "None at this time"}
      <nav>
      <Link to='/bars'>  Search Bars  </Link>
      <Link to='/profile'>  Back to Profile  </Link>
      <Link to='/friends'> Back to Friend Page </Link>
      </nav>
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
    pendingFriendees:state.user.pendingFriendees,
    pendingFrienders:state.user.pendingFrienders,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGroups: (groups) => dispatch(setGroups(groups)),
    addGroup: (group) => dispatch(addGroup(group))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Group);
