import React from 'react'
import {connect} from 'react-redux'
import {setFriends} from '../actions/friends'
import {setCurrentListofBudlessUsers} from '../actions/budless'
// import {setFriendships} from '../actions/friendships'
import {Link} from 'react-router-dom'
import UserList from './UserList'
import FriendshipList from './FriendshipList'
// import Profile from './Profile'

// const apiFriendshipAddress = 'http://localhost:3000/api/v1/friendships'

class FriendPage extends React.Component {

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

    // fetch(apiFriendshipAddress)
    // .then(r => r.json())
    // .then(friendships => {
    //   this.props.setFriendships(friendships)
    // })

  }

  render() {
    debugger
    return (
      <div>
      <nav>
      <Link to='/groups'>  Group Page  </Link>
      </nav>
          <div>
          Hi from Profile Page
          <div className="card horizontal">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className="card-image" src={this.props.user.pic ? this.props.user.pic : null} alt={this.props.user.name ? this.props.user.name : null}/>
                  </div>

          <div className="card-content">
            <span className="card-title grey-text text-darken-4">{this.props.user.name ? this.props.user.name : null} {this.props.user.id? this.props.user.id: null}<i className="material-icons right">{this.props.user.age ? this.props.user.age : null}</i></span>
            <p>{this.props.user.bio ? this.props.user.bio : null}</p>
          </div>
          </div>
          </div>
      <UserList />
      <FriendshipList />

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
    pendingFriendees:state.user.pendingFriendees,
    pendingFrienders:state.user.pendingFrienders,
    budless:state.user.budless,
    friends:state.user.friends
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentListofBudlessUsers: (budlessUsers) => dispatch(setCurrentListofBudlessUsers(budlessUsers)),
    setFriends: (friends) => dispatch(setFriends(friends)),
    // setFriendships: (friendships) => dispatch(setFriendships(friendships)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FriendPage);
