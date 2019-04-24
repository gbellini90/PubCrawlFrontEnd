import React from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import {addGroup} from '../../actions/groupActions'
import {setGroups} from '../../actions/groupActions'
import {logoutUser} from '../../actions/userActions'
import GroupCard from './GroupCard'
import Adapter from '../Adapter'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
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

      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="headline" color="inherit">PubHub</Typography>
            <Button variant="text" align="right">
              <Link to='/profile'>  Back to Profile  </Link>
              </Button>
              <Button variant="text" align="right">
                <Link to='/' onClick={this.props.logoutUser}> Logout </Link>
              </Button>
          </Toolbar>
      </AppBar>

  <form onSubmit={this.createGroup}>
      <TextField
          style={{ margin: 8 }}
          name="groupName"
          placeholder="Enter group name here!"
          onChange={this.handleChange}
          fullWidth
          margin="normal"
          variant="filled"
          value={this.state.groupName}
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>

        <h1 style={{textDecorationLine:'underline'}}> Your Groups </h1>

        <div className='container'>
            {this.props.groups.length > 0 ?  <h1> Your Created Group(s): </h1> : null}
            <div className='cardcontainer'>
            {Object.keys(this.props.groups).length > 0 ? this.props.groups.filter(group => (group.creator_id === this.props.user.id)).map(mygroup => <GroupCard key={mygroup.id} {...mygroup} usersfromgroup={mygroup.users} />) : null}
            </div>

            {this.memberOfGroups(this.props.groups).length > 0 ? <h1> Group(s) You're In: </h1> : null}
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
