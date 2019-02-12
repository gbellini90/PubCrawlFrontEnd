import React from 'react'
import {connect} from 'react-redux'
import {removeBarFromPubcrawl} from '../actions/removebarfrompubcrawl'
import {removeFromMyBars} from '../actions/removefrommybars'


class MyBarCard extends React.Component {


  removeFromCrawl = (bar, pubcrawlbar) => {
    fetch(`http://localhost:3000/api/v1/pubcrawl_bars/${pubcrawlbar.id}`, {
      method:"DELETE"
    })
    this.props.removeBarFromPubcrawl(bar, this.props.pubcrawl.id)
    this.props.removeFromMyBars(bar)
  }




  render() {
    console.log("From my bar card, pubcrawl id", this.props.pubcrawl.id);
    console.log("From my bar card, props id", this.props.id);
    console.log("From my bar card, bar id", this.props.bar.id);
    console.log("From my bar card, current pubcrawlbar info?", this.props.pubcrawlbar)
    console.log("From my bar card, current pubcrawlbar id?", this.props.pubcrawlbar.id)
    return (
      <div>
        <ul>
        <li><h3>{this.props.name}</h3></li>
        <li><img className="restaurant-image" src={this.props.image_url} alt={this.props.name}/></li>
        <li>Price:{this.props.price}</li>
        <li>Rating:{this.props.rating}/5</li>
        <li>Address:{this.props.location.display_address.join(" ")}</li>
        <button onClick={()=>this.removeFromCrawl(this.props, this.props.pubcrawlbar)}>Remove from Crawl</button>
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
    mybars:state.bars.mybars,
    pubcrawlbar:state.bars.pubcrawlbar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeBarFromPubcrawl: (bar, pubcrawl_id) => dispatch(removeBarFromPubcrawl(bar, pubcrawl_id)),
    removeFromMyBars: (bar) => dispatch(removeFromMyBars(bar)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MyBarCard);
