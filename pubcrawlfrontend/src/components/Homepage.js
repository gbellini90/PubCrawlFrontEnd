import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {setCurrentUserList} from '../actions/userActions'
import {setFriendships} from '../actions/userActions'
import Adapter from './Adapter'
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';


class Homepage extends React.Component {

  componentDidMount = () => {
    Adapter.fetchUsers()
    .then(allUsers => this.props.setCurrentUserList(allUsers))

    Adapter.fetchFriendships()
    .then(friendships => {
      this.props.setFriendships(friendships)
    })

  }

    render() {
      return (
        <div className="homepage">
          <AppBar position="static" color="secondary">
            <Toolbar>
              <Typography variant="headline" color="inherit">PubCrawlin'</Typography>
                <Button variant="text" align="right">
                    <Link className="homepagelink" to='/signup'>Sign Up  </Link>
                  </Button>
                  <Button variant="text" align="right">
                    <Link className="homepagelink" to='/login'>   Log In  </Link><
                  /Button>
              </Toolbar>
          </AppBar>
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    user:state.user.user,
    users:state.user.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUserList: (users) => dispatch(setCurrentUserList(users)),
    setFriendships: (friendships) => dispatch(setFriendships(friendships)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
