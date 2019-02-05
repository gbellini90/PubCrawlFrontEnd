import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'




class Profile extends React.Component {

  render() {
    console.log(this.props.user);
    return (
      <div>
      <nav>
      <Link to='/bars'>  Search Bars  </Link>
      </nav>
      Hi from Profile Page
      <div className="card horizontal">

              <div className="card-image waves-effect waves-block waves-light">
                <img className="card-image" src={this.props.user.pic} alt={this.props.user.name}/>
              </div>

              <div className="card-content">
                <span className="card-title grey-text text-darken-4">{this.props.user.name}<i className="material-icons right">{this.props.user.age}</i></span>
                <p>{this.props.user.bio}</p>
                <p>{this.props.user.friendered_relationships ? "has friendered_relationships" : "doesn't have friendered_relationships"}</p>
              </div>

          </div>

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
