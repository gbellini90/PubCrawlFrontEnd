import React from 'react'
import {Input, Row, Icon} from 'react-materialize'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {setCurrentUser} from '../actions/user'
import {setCurrentUserList} from '../actions/users'
// import {setFriendships} from '../actions/friendships'


const apiUsersAddress = 'http://localhost:3000/api/v1/users'
// const apiFriendshipAddress = 'http://localhost:3000/api/v1/friendships'

class Login extends React.Component {

  componentDidMount = () => {
    fetch ('http://localhost:3000/api/v1/users')
    .then(r => r.json())
    .then(allUsers => this.props.setCurrentUserList(allUsers))

    // fetch(apiFriendshipAddress)
    // .then(r => r.json())
    // .then(friendships => {
    //   this.props.setFriendships(friendships)
    // })
  }

  state = {
    name:'',
    username: '',
    loggedIn:false
  }

  handleChange = (event) => {
    this.setState({
   [event.target.name]: event.target.value
   })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({loggedIn:true})
    fetch(apiUsersAddress)
    .then(r => r.json())
    .then(userList => this.props.setCurrentUser(userList.find(user => user.username === this.state.username && user.name === this.state.name)))
  }


  render() {
    const logInForm =
      <div className="login">
        <form onSubmit={this.handleSubmit}>
        <Row>
            <Input s={6} onChange={this.handleChange} placeholder="Username" name="username" value={this.state.username}><Icon>account_circle</Icon></Input>
            <Input s={6} onChange={this.handleChange} placeholder="Name" name="name" value={this.state.name}><Icon>lock</Icon></Input>
            <Input type="submit" />
        </Row>
        </form>
      </div>
      return this.state.loggedIn ? <Redirect to='/profile'/> : logInForm
  }

}

const mapStateToProps = (state) => {
  return {
    user:state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setCurrentUserList: (users) => dispatch(setCurrentUserList(users)),
    // setFriendships: (friendships) => dispatch(setFriendships(friendships)),
}}




export default connect(mapStateToProps,mapDispatchToProps)(Login);
