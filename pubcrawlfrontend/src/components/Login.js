import React from 'react'
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
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
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="headline" color="inherit">PubHub</Typography>
          </Toolbar>
      </AppBar>
        <form className="loginform" onSubmit={this.handleSubmit}>
           { !this.props.failedLogin ? null : alert(this.props.error)}
              <AccountCircle /><TextField s={6} onChange={this.handleChange} type= "text" placeholder="Username" name="username" value={this.state.username}></TextField>
              <Lock /> <TextField s={6} onChange={this.handleChange} type="password" placeholder="Password" name="password" value={this.state.password}></TextField>
              <Button color="inherit" type="submit"> Submit </Button>

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
