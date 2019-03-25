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
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

//Didn't workkkkkk
//    <Card
//    display="inline-block">
//     <CardActionArea>
//       <Avatar
//         src={this.props.user.pic ? this.props.user.pic : null}
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="h2">
//           {this.props.user.name ? this.props.user.name : null}
//         </Typography>
//         <Typography component="p">
//           {this.props.user.bio ? this.props.user.bio : null}
//         </Typography>
//         <Typography component="p">
//           Age:{this.props.user.age? this.props.user.age : null}
//         </Typography>
//       </CardContent>
//     </CardActionArea>
// </Card>


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
        <Toolbar>
          <Typography variant="headline" color="inherit">PubHub</Typography>
            <Button variant="text" align="right">
                <Link to='/groups'>  Visit the Group Page  </Link>
              </Button>
              <Button variant="text" align="right">
                <Link to='/' onClick={this.props.logoutUser}> Logout </Link>
              </Button>
          </Toolbar>
      </AppBar>


        <div className="profile-page-overlay">
              <div className="card horizontal">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="card-image" src={this.props.user.pic ? this.props.user.pic : null} alt={this.props.user.name ? this.props.user.name : null}/>
                </div>
                <div className="card-content">
                    <span className="card-title grey-text text-darken-4">{this.props.user.name ? this.props.user.name : null}</span>
                    <p>Age:{this.props.user.age ? this.props.user.age : null}</p> <br />
                    <i>{this.props.user.bio ? this.props.user.bio : null}</i>
                </div>
            </div>
            <Grid container spacing={32} alignItems="flex-end">
              <div className= "friend-box">
                <UserList /> <FriendshipList />
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
