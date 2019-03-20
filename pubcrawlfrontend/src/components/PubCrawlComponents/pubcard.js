import React from 'react'
import {connect} from 'react-redux'



class PubCard extends React.Component {


  render() {
    return (
      <div>
      <ul>
        <li><h4>{this.props.name}</h4></li>
        <li><img className="restaurant-image" src={this.props.pic} alt={this.props.name}/></li>
        <li>Price: {this.props.price}</li>
        <li>Rating: {this.props.rating}/5</li>
        <li>Address: {this.props.address}</li>
        </ul>

      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    bars:state.bars.bars,
    bar:state.bars.bar,
    user:state.user.user,
    group:state.groups.group,
    groups:state.groups.groups,
    pubcrawls:state.bars.pubcrawls,
    pubcrawl:state.bars.pubcrawl,
    // mybars:state.bars.mybars,
    pubcrawlbar:state.bars.pubcrawlbar,
  }
}


export default connect(mapStateToProps)(PubCard);
