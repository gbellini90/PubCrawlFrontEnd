import React from 'react'
import {connect} from 'react-redux'
import {setCurrentUserList} from '../actions/users'
import UserCard from './UserCard'


const apiUsersAddress = 'http://localhost:3000/api/v1/users'

class UserList extends React.Component {

componentDidMount = () => {
  fetch(apiUsersAddress)
  .then(r => r.json())
  .then(allUsers => this.props.setCurrentUserList(allUsers.filter(user => user.username !== this.props.user.username && user.name !== this.props.user.name)))
}



  render() {
    return (
      <div>
      <h3>All Users</h3>
      {this.props.users? this.props.users.map(user => <UserCard key= {user.id} {...user} />) : null}
      </div>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    user:state.user.user,
    users:state.users.users,
    bars:state.bars.bars
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUserList: (users) => dispatch(setCurrentUserList(users))
  }
}




export default connect(mapStateToProps,mapDispatchToProps)(UserList);
