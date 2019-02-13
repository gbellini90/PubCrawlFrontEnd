import React from 'react'
import {connect} from 'react-redux'
import {removeBarFromPubcrawl} from '../actions/removebarfrompubcrawl'
import {removeFromMyBars} from '../actions/removefrommybars'
import {setPubcrawlBars} from '../actions/pubcrawlbars'
import {foundBar} from '../actions/foundbar'


class MyBarCard extends React.Component {

  componentDidMount = () => {
    fetch('http://localhost:3000/api/v1/pubcrawl_bars')
    .then(r=>r.json())
    .then(joinObjs => {
      this.props.setPubcrawlBars(joinObjs)
    })

  }

//FIX
  removeFromCrawl = (bar, pubcrawl, coordinates, pubcrawlbars) => {
    fetch('http://localhost:3000/ap1/v1/bars')
    .then(r=>r.json())
    .then(barss => {
      let found = barss.find(barr => barr.name === bar.name)
      this.props.foundBar(found)
      console.log(pubcrawl);
      console.log(found);
      let foundObj = pubcrawlbars.find(pubcrawlbar => (pubcrawlbar.pubcrawl_id === pubcrawl.id && pubcrawlbar.bar_id === found.id))
      console.log(foundObj)
      // fetch(`http://localhost:3000/api/v1/pubcrawl_bars/${foundObj.id}`, {
      //   method:"DELETE"
      // })
    })

    this.props.removeFromMyBars(bar)
    this.props.removeBarFromPubcrawl(bar, pubcrawl.id)
    this.props.getBarToRemove(coordinates, bar)
  }




  render() {
    console.log("MY BAR CARD", this.props);
    return (
      <div>
        <ul>
        <li><h3>{this.props.name}</h3></li>
        <li><img className="restaurant-image" src={this.props.image_url} alt={this.props.name}/></li>
        <li>Price:{this.props.price}</li>
        <li>Rating:{this.props.rating}/5</li>
        <li>Address:{this.props.location.display_address.join(" ")}</li>
        <button onClick={()=>this.removeFromCrawl(this.props, this.props.pubcrawl, this.props.coordinates, this.props.pubcrawlbars)}>Remove from Crawl</button>
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
    pubcrawlbars:state.bars.pubcrawlbars,
    foundBar:state.bars.foundBar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeBarFromPubcrawl: (bar, pubcrawl_id) => dispatch(removeBarFromPubcrawl(bar, pubcrawl_id)),
    removeFromMyBars: (bar) => dispatch(removeFromMyBars(bar)),
    setPubcrawlBars:(pubcrawlbars) => dispatch(setPubcrawlBars(pubcrawlbars)),
    foundBar:(bar) => dispatch(foundBar(bar))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MyBarCard);
