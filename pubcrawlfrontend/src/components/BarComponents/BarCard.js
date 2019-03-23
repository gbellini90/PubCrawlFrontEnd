import React from 'react'
import {connect} from 'react-redux'
import {setCurrentBar} from '../../actions/barActions'
import {addBarToPubcrawl} from '../../actions/pubcrawlActions'
import {myBars} from '../../actions/barActions'
import Adapter from '../Adapter'


class BarCard extends React.Component {

  addToCrawl = (barObj, coordinates) => {
    Adapter.fetchPostBar(barObj)
      .then(barObject => {
        this.props.setCurrentBar(barObject)
          Adapter.fetchPostPubcrawlBar(barObject.id, this.props.pubcrawl.id)
          this.props.myBars(barObj)
          this.props.getBar(coordinates, barObj)
          this.props.addBarToPubcrawl(barObj, this.props.pubcrawl.id)
      })}

  render() {
    return (
      <div>
        <ul>
        <li><h3>{this.props.name}</h3></li>
        <li><img className="restaurant-image" src={this.props.image_url} alt={this.props.name}/></li>
        <li>Price:{this.props.price}</li>
        <li>Rating:{this.props.rating}/5</li>
        <li>Address:{this.props.location.display_address.join(" ")}</li>
        <button onClick={()=>this.addToCrawl(this.props, this.props.coordinates)}>Add to Crawl</button>
        </ul>

      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
      user:state.user.user,
      group:state.groups.group,
      groups:state.groups.groups,
      pubcrawls:state.bars.pubcrawls,
      pubcrawl:state.bars.pubcrawl,
      bars:state.bars.bars,
      mybars:state.bars.mybars,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentBar:(bar) => dispatch(setCurrentBar(bar)),
    addBarToPubcrawl: (bar, pubcrawl_id) => dispatch(addBarToPubcrawl(bar, pubcrawl_id)),
    myBars:(bar) => dispatch(myBars(bar)),
  }
}




export default connect(mapStateToProps,mapDispatchToProps)(BarCard);
