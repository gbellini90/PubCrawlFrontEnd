import React from 'react'
import {Input, Row, Icon} from 'react-materialize'
import Profile from './Profile'

class Signup extends React.Component {


  render() {
    return (

      <div>
        <Row>
            <Input s={6} placeholder="Name"/>
            <Input s={2} placeholder="Age"/>
            <Input s={6} placeholder="Username"/>
            <Input s={6} placeholder="Password"/>
            <Input s={12} placeholder="Bio"/>
            <Input type="submit"/>
        </Row>
      </div>

    );
  }

}







export default Signup;
