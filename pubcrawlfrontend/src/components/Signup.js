import React from 'react'
import {Redirect} from "react-router-dom";
import {Input, Row} from 'react-materialize'
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
        <form onSubmit={this.handleSubmit}>
          <Row>
              <Input s={6}  onChange={this.handleChange} type="text" name="username" value={this.state.username} placeholder="Username"/>
              <Input s={6}  onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder="Password"/>
              <Input s={6}  onChange={this.handleChange} type="text" name="name" value={this.state.name} placeholder="Name"/>
              <Input s={2}  onChange={this.handleChange} type="text" name="age" value={this.state.age} placeholder="Age"/>
              <Input s={6}  onChange={this.handleChange} type="text"name="pic" value={this.state.pic} placeholder="Pic"/>
              <Input s={12} onChange={this.handleChange} type="text" name="bio" value={this.state.bio} placeholder="Bio"/>
              <Input type="submit"/>
          </Row>
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
