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
import {Navbar} from 'react-materialize'


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

      <Navbar brand="PubHub" right>
        <li><Link to='/groups'>  Visit the Group Page  </Link></li>
        <li><Link to='/' onClick={this.props.logoutUser}> Logout </Link></li>
      </Navbar>

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

            <div className= "friend-box">
              <UserList />
              <FriendshipList />
            </div>
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
