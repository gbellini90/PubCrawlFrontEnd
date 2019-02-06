import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import UserList from './UserList'
import FriendshipList from './FriendshipList'
import AcceptedFriendCard from './AcceptedFriendCard'




class Profile extends React.Component {

  render() {
    return (
      <div>
        <nav>
        <Link to='/bars'>  Search Bars  </Link>
        <Link to='/groups'>  Create a Group  </Link>
        </nav>
      Hi from Profile Page
      <div className="card horizontal">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="card-image" src={this.props.user.pic} alt={this.props.user.name}/>
              </div>

      <div className="card-content">
        <span className="card-title grey-text text-darken-4">{this.props.user.name} {this.props.user.id}<i className="material-icons right">{this.props.user.age}</i></span>
        <p>{this.props.user.bio}</p>
      </div>
        <UserList />
        <FriendshipList />
      </div>

      </div>







    );
  }

}


const mapStateToProps = (state) => {
  return {
    user:state.user.user,
    users:state.users.users,
    friendship:state.friendships.friendship,
    friendships:state.friendships.friendships
  }
}


export default connect(mapStateToProps)(Profile);
