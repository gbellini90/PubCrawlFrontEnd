import React from 'react'
import {connect} from 'react-redux'

class BarCard extends React.Component {

  render() {
    console.log(this.props)
    return (
      <div>
        <ul>
        <li><h3>{this.props.name}</h3></li>
        <li><img className="restaurant-image" src={this.props.image_url} alt={this.props.name}/></li>
        <li>Price:{this.props.price}</li>
        <li>Rating:{this.props.rating}/5</li>
        <li>Address:{this.props.location.display_address}</li>
        <li></li>
        </ul>

      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
      bars:state.bars.bars
  }
}

export default connect(mapStateToProps)(BarCard);
