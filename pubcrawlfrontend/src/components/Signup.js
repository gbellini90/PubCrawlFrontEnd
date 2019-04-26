import React from 'react'
import {Redirect} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux'
import {signUpUser} from '../actions/userActions'
import {addUser} from '../actions/userActions'


class Signup extends React.Component {

  state = {
   name: '',
   username: '',
   password: '',
   age:'',
   pic:'',
   bio: '',
   signedUp:false
 }

 handleChange = (event) => {
   this.setState({
     [event.target.name]: event.target.value
   })
 }

 handleSubmit = (event) => {
     event.preventDefault()
     this.setState({ signedUp: true })
     this.props.signUpUser(this.state.username, this.state.password, this.state.name, this.state.bio, this.state.pic, this.state.age)
   }




  render() {
    const signUpForm =
        <div className="login">
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="headline" color="inherit">PubCrawlin'</Typography>
            </Toolbar>
        </AppBar>
        <form onSubmit={this.handleSubmit}>
          <Typography variant="h6" gutterBottom>
                </Typography>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="username"
                      label="Username"
                      fullWidth
                      onChange={this.handleChange}
                      value={this.state.username}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="password"
                      label="Password"
                      type="password"
                      fullWidth
                      onChange={this.handleChange}
                      value={this.state.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="bio"
                      label="Enter Bio Here"
                      fullWidth
                      onChange={this.handleChange}
                      value={this.state.bio}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="name"
                      label="Name"
                      fullWidth
                      onChange={this.handleChange}
                      value={this.state.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      name="age"
                      label="Age"
                      fullWidth
                      onChange={this.handleChange}
                      value={this.state.age}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      name="pic"
                      label="Picture Link"
                      fullWidth
                      onChange={this.handleChange}
                      value={this.state.pic}
                    />
                  </Grid>
                  <Button
                     type="submit"
                     fullWidth
                     // variant="outlined"
                     // color="secondary"
                     >
                     Submit
                 </Button>
                </Grid>
                </form>
        </div>
      return this.state.signedUp ? <Redirect to='/profile'/> : signUpForm
  }
}


const mapStateToProps = (state) => {
  return {
    user:state.user.user,
    users:state.user.users,
    failedLogin:state.user.failedLogin,
    error:state.user.error,
    loggedIn:state.user.loggedIn,
    authenticatingUser:state.user.authenticatingUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (newUser) => dispatch(addUser(newUser)),
    signUpUser: (username, password, name, bio, pic, age) => dispatch(signUpUser(username, password, name, bio, pic, age))

  }
}



export default connect(mapStateToProps,mapDispatchToProps)(Signup);
