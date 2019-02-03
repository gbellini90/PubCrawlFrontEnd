import React from 'react'
import { Redirect, Link, Route, Switch } from "react-router-dom";
import {Input, Row, Icon} from 'react-materialize'
import Profile from './Profile'

const apiUsersAddress = 'http://localhost:3000/api/v1/users'

class Signup extends React.Component {

  state = {
   name: '',
   username: '',
   age:'',
   pic:'',
   bio: '',
   //will be password attribute in the future for login feature
 }

 handleSubmit = (event) => {
     event.preventDefault()
     const postConfig = {
     	method:"POST",
     	headers: {
         "Content-type": "application/json"
       },
       body: JSON.stringify({
         user: {
           name: this.state.name,
           username: this.state.username,
           age: this.state.age,
           pic:this.state.pic,
           bio:this.state.bio
         }
       })
     }

     fetch(apiUsersAddress,postConfig)
       .then(r=>r.json())
       .then(userObj => this.props.setCurrentUser(userObj))
   }

   handleChange = (event) => {
     this.setState({
    [event.target.name]: event.target.value
  })
}


  render() {
    const signUpForm =
      <div>
      <form onSubmit={this.handleSubmit}>
        <Row>
            <Input s={6}  onChange={this.handleChange} name="name" value={this.state.name} placeholder="Name"/>
            <Input s={2}  onChange={this.handleChange} name="age" value={this.state.age} placeholder="Age"/>
            <Input s={6}  onChange={this.handleChange} name="username" value={this.state.username} placeholder="Username"/>
            <Input s={6}  onChange={this.handleChange} name="pic" value={this.state.pic} placeholder="Pic"/>
            <Input s={12} onChange={this.handleChange} name="bio" value={this.state.bio} placeholder="Bio"/>
            <Input type="submit"/>
        </Row>
        </form>
      </div>

      return this.props.currentUser ? <Switch>
  <Redirect from='/signup' to='/profile'/>
  <Route path='/profile' render={() => <Profile setCurrentUser={this.props.setCurrentUser} currentUser={this.props.currentUser} />}
  />
</Switch> : signUpForm

  }

}






export default Signup;
