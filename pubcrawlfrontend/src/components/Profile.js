import React from 'react'
import {connect} from 'react-redux'
import {setFriends} from '../actions/userActions'
import {setCurrentListofBudlessUsers} from '../actions/userActions'
// import FriendPage from './FriendComponents/FriendPage'
import UserList from './FriendComponents/UserList'
import withAuth from './withAuth'
import FriendshipList from './FriendComponents/FriendshipList'
import {Link} from 'react-router-dom'


class Profile extends React.Component {

  componentDidMount = () => {
  fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/budless`)
    .then(r => r.json())
    .then(budlessUsers => {
      this.props.setCurrentListofBudlessUsers(budlessUsers)
    })

    fetch (`http://localhost:3000/api/v1/users/${this.props.user.id}/friends`)
    .then (r => r.json())
    .then(friends => {
      this.props.setFriends(friends)
    })
  }

  render() {
    console.log(this.props)
    const profile =

      <div className="profile-page">
      <nav>
      <Link to='/groups'>  Visit the Group Page  </Link>
      </nav>
        <div className="profile-page-overlay">
              <div className="card horizontal small">
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
  }
}


export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Profile));
