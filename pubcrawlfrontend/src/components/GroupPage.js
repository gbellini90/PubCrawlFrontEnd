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

meh = (groups) => {
  const myGroups = groups.filter(group => {
    const userIds = group.users.map(user => user.id)
    return userIds.includes(this.props.user.id)
  })
  return myGroups
}



  render() {
    console.log((this.props.groups));
    return (
      <div className="group-page">
      <nav>
      <Link to='/profile'>  Back to Profile  </Link>
      <Link to='/friends'> Back to Friend Page </Link>
      </nav>
        <h6> Create a New Group Below</h6>
      <form onSubmit={this.createGroup}>
        <input onChange={this.handleChange} name="groupName" value={this.state.groupName} type="text" placeholder="Enter Group Name here!"/>
        <input type="submit" />
      </form>
      <h4> Your Groups </h4>

    <div className='container'>
      <h5> Your Created Group(s) </h5>
      <div className='cardcontainer'>
      {Object.keys(this.props.groups).length > 0 ? this.props.groups.filter(group => (group.creator_id === this.props.user.id)).map(mygroup => <GroupCard key={mygroup.id} {...mygroup} usersfromgroup={mygroup.users} />) : null}
      </div>

      <h5> Groups You're In </h5>
      <div className='cardcontainer'>
      {Object.keys(this.props.groups).length > 0 ? this.meh(this.props.groups).map(mygroup => <GroupCard key={mygroup.id} {...mygroup} usersfromgroup={mygroup.users} />) : null}
      </div>
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
