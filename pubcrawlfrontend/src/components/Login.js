import React from 'react'
import {Input, Row, Icon} from 'react-materialize'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {loginUser} from '../actions/userActions'

class Login extends React.Component {

  state = {
    username: '',
    password: '',
  }

  handleChange = (event) => {
    this.setState({
   [event.target.name]: event.target.value
   })
  }

  handleSubmit = (event) => {
    event.preventDefault()
      this.props.loginUser(this.state.username, this.state.password)
  }


  render() {
    const logInForm =
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <Row>
           { !this.props.failedLogin ? null : alert(this.props.error)}
              <Input s={6} onChange={this.handleChange} type= "text" placeholder="Username" name="username" value={this.state.username}><Icon>account_circle</Icon></Input>
              <Input s={6} onChange={this.handleChange} type="password" placeholder="Password" name="password" value={this.state.password}><Icon>lock</Icon></Input>
              <Input type="submit" />
          </Row>
        </form>
      </div>
  return this.props.loggedIn ? <Redirect to='/profile'/> : logInForm
  }

}

const mapStateToProps = (state) => {
  return {
    user:state.user.user,
    failedLogin:state.user.failedLogin,
    error:state.user.error,
    loggedIn:state.user.loggedIn,
    authenticatingUser:state.user.authenticatingUser

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
   loginUser: (username, password) => dispatch(loginUser(username, password))
}}




export default connect(mapStateToProps,mapDispatchToProps)(Login);
