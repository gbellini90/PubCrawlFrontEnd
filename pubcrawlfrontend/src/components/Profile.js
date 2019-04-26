import React from 'react'
import {connect} from 'react-redux'
import {setFriends} from '../actions/userActions'
import {setCurrentListofBudlessUsers} from '../actions/userActions'
import {logoutUser} from '../actions/userActions'
import UserList from './FriendComponents/UserList'
import withAuth from './withAuth'
import FriendshipList from './FriendComponents/FriendshipList'
import Adapter from './Adapter'
import {Link} from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


class Profile extends React.Component {

  componentDidMount = () => {
    Adapter.fetchBudlessUsers(this.props.user.id)
      .then(budlessUsers => {
        this.props.setCurrentListofBudlessUsers(budlessUsers)
    })

    Adapter.fetchFriends(this.props.user.id)
      .then(friends => {
        this.props.setFriends(friends)
    })
  }

  render() {
  const profile =

  <div className="profile-page">

        <AppBar position="static" color="secondary">
          <Toolbar variant="dense">
            <Typography variant="headline" color="inherit">PubCrawlin'</Typography>
              <Button variant="text" align="right">
                  <Link to='/groups'>  Visit the Group Page  </Link>
                </Button>
                <Button variant="text" align="right">
                  <Link to='/' onClick={this.props.logoutUser}> Logout </Link>
                </Button>
            </Toolbar>
        </AppBar>


      <div className="profile-page-overlay">

        <div>
          <h1 className='profile' id="profile-name">{this.props.user.name}</h1>
          <img className='picture' src={this.props.user.pic ? this.props.user.pic : null} alt={this.props.user.name ? this.props.user.name : null}/>
          <p className='profile'> Age: {this.props.user.age ? this.props.user.age : null} </p>
          <p className='profile'>{this.props.user.bio ? this.props.user.bio : null}</p>
        </div>

        <Grid container spacing={18} alignItems="flex-end">
          <div className= "friend-box"><UserList /> <FriendshipList />
          </div>
        </Grid>

      </div>

  </div>
    return this.props.user ? profile : null
  }
}


const mapStateToProps = (state) => {
  return {
    user:state.user.user,
    friendships:state.user.friendships,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentListofBudlessUsers: (budlessUsers) => dispatch(setCurrentListofBudlessUsers(budlessUsers)),
    setFriends: (friends) => dispatch(setFriends(friends)),
    logoutUser: () =>dispatch(logoutUser())
      }
    }


export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Profile));
