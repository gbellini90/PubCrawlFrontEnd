import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {setFriendships} from '../actions/friendships'



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
      <div>
        <nav>
        <Link to='/bars'>  Search Bars  </Link>
        <Link to='/groups'>  Create a Group  </Link>
        <Link to='/friends'> View Friends </Link>
        </nav>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFriendships: (friendships) => dispatch(setFriendships(friendships)),
  }
}




export default connect(mapStateToProps,mapDispatchToProps)(Profile);
