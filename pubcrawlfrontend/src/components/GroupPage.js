import React from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import {addGroup} from '../actions/addgroup'
import {setGroups} from '../actions/groups'
import GroupCard from './GroupCard'

const apiGroupsAddress = 'http://localhost:3000/api/v1/groups'

class Group extends React.Component {

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
        .then(groupObj => this.props.addGroup(groupObj))
    }



  handleChange = (event) => {
    this.setState({
   [event.target.name]: event.target.value
 })
}


  render() {
    console.log(this.props)
    return (
      <div>
      <h1> Group Page </h1>
        <h3> Create a New Group!</h3>
      <form onSubmit={this.createGroup}>
      <input onChange={this.handleChange} name="groupName" value={this.state.groupName} type="text" placeholder="Enter Group Name here!"/>
      <input type="submit" />
      </form>
      <h3> Your Created Group(s) </h3>
      {this.props.groups ? this.props.groups.filter(group => (group.creator_id === this.props.user.id)).map(mygroup => <GroupCard key={mygroup.id} {...mygroup} />) : "WUUTT" }
      <nav>
      <Link to='/bars'>  Search Bars  </Link>
      <Link to='/profile'>  Back to Profile  </Link>
      </nav>

      </div>
    );
  }

}



const mapStateToProps = (state) => {
  return {
    bars:state.bars.bars,
    user:state.user.user,
    users:state.users.users,
    friendships:state.friendships.friendships,
    groups:state.groups.groups,
    friends:state.friends.friends,
    pendingFriendees:state.pendingFriendees.pendingFriendees,
    pendingFrienders:state.pendingFrienders.pendingFrienders,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addGroup: (group) => dispatch(addGroup(group)),
    setGroups: (groups) => dispatch(setGroups(groups))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Group);
