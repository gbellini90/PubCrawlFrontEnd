import React from 'react'
import {Input, Row, Icon} from 'react-materialize'
import Signup from './Signup'
import Bars from './Bars'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class Homepage extends React.Component {

          //



  render() {
    return (
      <div>
      <h1>PubCrawl Creator App</h1>
        <div>Hi, this is the homepage/login form page</div>
        <Row>
            <Input s={6} placeholder="Username"><Icon>account_circle</Icon></Input>
            <Input s={6} placeholder="Password"><Icon>lock</Icon></Input>
        </Row>
      </div>
    );
  }

}



export default Homepage;
