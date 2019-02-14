import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {setFriendships} from '../actions/friendships'
import FriendshipList from './FriendshipList'
// import {Row, Col, CardPanel, Card, CardTitle} from 'react-materialize'


const apiFriendshipAddress = 'http://localhost:3000/api/v1/friendships'

class Profile extends React.Component {

  componentDidMount = () => {
    fetch(apiFriendshipAddress)
    .then(r => r.json())
    .then(friendships => {
      this.props.setFriendships(friendships)
    })
}

  render() {
  const profile =
    <div className="profile-page">
      <div className="profile-page-overlay">
        <nav>
          <Link to='/friends'> View Your Friends! </Link>
        </nav>
            <div className="card horizontal medium">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="card-image" src={this.props.user.pic ? this.props.user.pic : null} alt={this.props.user.name ? this.props.user.name : null}/>
              </div>
              <div className="card-content">
                  <span className="card-title grey-text text-darken-4">{this.props.user.name ? this.props.user.name : null}</span>
                  <p>Age:{this.props.user.age ? this.props.user.age : null}</p> <br />
                  <i>{this.props.user.bio ? this.props.user.bio : null}</i>
              </div>
          </div>
          {/* <img src="../cafe-glass-beverage-drink-bottle-beer-773673-pxhere.com.jpg" alt="pic"/> */}
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
