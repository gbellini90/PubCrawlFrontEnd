import React from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import {addGroup} from '../../actions/groupActions'
import {setGroups} from '../../actions/groupActions'
import {logoutUser} from '../../actions/userActions'
import GroupCard from './GroupCard'
import Adapter from '../Adapter'
import {Navbar} from 'react-materialize'
import withAuth from '../withAuth'


class Group extends React.Component {

  state = {
    groupName : ''
  }

  componentDidMount = () => {
    Adapter.fetchGroups().then(groups => this.props.setGroups(groups))
  }

  createGroup = (event) => {
    event.preventDefault()
    Adapter.fetchCreateGroup(this.state.groupName, this.props.user.id).then(groupObj => {
      this.props.addGroup(groupObj)
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })}

  memberOfGroups = (groups) => {
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

      <Navbar brand="PubHub" right>
        <li><Link to='/profile'>  Back to Profile  </Link></li>
        <li><Link to='/' onClick={this.props.logoutUser}> Logout </Link></li>
      </Navbar>



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
            {Object.keys(this.props.groups).length > 0 ? this.memberOfGroups(this.props.groups).map(mygroup => <GroupCard key={mygroup.id} {...mygroup} usersfromgroup={mygroup.users} />) : null}
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
    addGroup: (group) => dispatch(addGroup(group)),
    logoutUser: () =>dispatch(logoutUser())
  }
}


export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Group));
