import React from 'react'
import {Redirect} from "react-router-dom";
import {Input, Row} from 'react-materialize'
import {connect} from 'react-redux'
import {setCurrentUser} from '../actions/user'

const apiUsersAddress = 'http://localhost:3000/api/v1/users'

class Signup extends React.Component {

  state = {
   name: '',
   username: '',
   age:'',
   pic:'',
   bio: '',
   loggedIn:false
   //will be password attribute in the future for login feature
 }

 handleSubmit = (event) => {
     event.preventDefault()
     this.setState({ loggedIn: true })
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
      return this.state.loggedIn ? <Redirect to='/profile'/> : signUpForm
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



export default connect(mapStateToProps,mapDispatchToProps)(Signup);
