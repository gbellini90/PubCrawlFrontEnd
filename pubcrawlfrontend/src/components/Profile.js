import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {setFriendships} from '../actions/friendships'
// import {setFriends} from '../actions/friends'
// import {setCurrentListofBudlessUsers} from '../actions/budless'
import FriendPage from './FriendPage'

const apiFriendshipAddress = 'http://localhost:3000/api/v1/friendships'

class Profile extends React.Component {

  componentDidMount = () => {
    fetch(apiFriendshipAddress)
    .then(r => r.json())
    .then(friendships => {
      this.props.setFriendships(friendships)
    })
}
    // fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/budless`)
    //   .then(r => r.json())
    //   .then(budlessUsers => {
    //     this.props.setCurrentListofBudlessUsers(budlessUsers)
    //   })
    //
    // fetch (`http://localhost:3000/api/v1/users/${this.props.user.id}/friends`)
    // .then (r => r.json())
    // .then(friends => {
    //   this.props.setFriends(friends)
  // })
// }

  render() {
  const profile =
    <div>
      <nav>
      <Link to='/friends'> View Friends </Link>
      </nav>
      <div className="card horizontal">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="card-image" src={this.props.user.pic ? this.props.user.pic : null} alt={this.props.user.name ? this.props.user.name : null}/>
              </div>

        <div className="card-content">
          <span className="card-title grey-text text-darken-4">{this.props.user.name ? this.props.user.name : null}
          <i className="material-icons right">{this.props.user.age ? this.props.user.age : null}</i>
          <p>Age:{this.props.user.age ? this.props.user.age : null}</p>
          <p>Bio:{this.props.user.bio ? this.props.user.bio : null}</p></span>
        </div>
      </div>
    </div>
      return this.props.user ? profile : null

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
    setFriendships: (friendships) => dispatch(setFriendships(friendships)),
    // setCurrentListofBudlessUsers: (budlessUsers) => dispatch(setCurrentListofBudlessUsers(budlessUsers)),
    // setFriends: (friends) => dispatch(setFriends(friends))
  }
}






export default connect(mapStateToProps, mapDispatchToProps)(Profile);
