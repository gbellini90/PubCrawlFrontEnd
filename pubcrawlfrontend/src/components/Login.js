import React from 'react'
import {Input, Row, Icon} from 'react-materialize'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {setCurrentUser} from '../actions/user'


const apiUsersAddress = 'http://localhost:3000/api/v1/users'

class Login extends React.Component {

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
      <div>
        <div>Hi, this is the login form page</div>
        <form onSubmit={this.handleSubmit}>
        <Row>
            <Input s={6} onChange={this.handleChange} placeholder="Username" name="username" value={this.state.username}><Icon>account_circle</Icon></Input>
            <Input s={6} onChange={this.handleChange} placeholder="Name" name="name" value={this.state.name}><Icon>lock</Icon></Input>
            <Input type="submit" />
        </Row>
        </form>
      </div>
      console.log(this.props)
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
    setCurrentUser: (user) => dispatch(setCurrentUser(user))
  }
}




export default connect(mapStateToProps,mapDispatchToProps)(Login);
