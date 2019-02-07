import React from 'react'
import {connect} from 'react-redux'
import {setCurrentListofBudlessUsers} from '../actions/budless'
import UserCard from './UserCard'


class UserList extends React.Component {


  handleClick = (id) => {
  fetch(`http://localhost:3000/api/v1/users/${id}/budless`)
    .then(r => r.json())
    .then(budlessUsers => {
      this.props.setCurrentListofBudlessUsers(budlessUsers)
    })

  }



  render() {
    return (
      <div>
      <h3>All Users</h3>
      <button onClick={()=>this.handleClick(this.props.user.id)}>View Users</button>
      {this.props.budless ? this.props.budless.map(budlessuser => <UserCard key= {budlessuser.id} {...budlessuser} />) : null}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    user:state.user.user,
    bars:state.bars.bars,
    friendships:state.friendships.friendships,
    friends:state.friends.friends,
    budless:state.budless.budless
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentListofBudlessUsers: (budlessUsers) => dispatch(setCurrentListofBudlessUsers(budlessUsers))
  }
}




export default connect(mapStateToProps,mapDispatchToProps)(UserList);
