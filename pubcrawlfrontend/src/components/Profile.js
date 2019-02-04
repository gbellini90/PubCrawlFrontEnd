import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import BarContainer from './BarContainer'
import {connect} from 'react-redux'
import {Card} from 'react-materialize'



class Profile extends React.Component {

  render() {
    console.log(this.props.user);
    return (
      <div>

      <div className="card horizontal">

              <div className="card-image waves-effect waves-block waves-light">
                <img className="card-image" src={this.props.user.pic}/>
              </div>

              <div className="card-content">
                <span className="card-title grey-text text-darken-4">{this.props.user.name}<i className="material-icons right">{this.props.user.age}</i></span>
                <p>{this.props.user.bio}.</p>
              </div>

          </div>
          <Router>
            <>
            <nav>
            <Link to='/bars'>  Bars  </Link>
            </nav>
            <Route path='/bars' component={BarContainer} />
            </>
          </Router>



      </div>







    );
  }

}


const mapStateToProps = (state) => {
  return {
    user:state.user.user
  }
}


export default connect(mapStateToProps)(Profile);
