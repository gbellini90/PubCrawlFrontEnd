import React from 'react'
import {connect} from 'react-redux'
import {setCurrentBar} from '../actions/bar'
import {addBarToPubcrawl} from '../actions/addbartopubcrawl'
import {currentPubCrawlBar} from '../actions/currentpubcrawlbar'
import {myBars} from '../actions/mybars'


class BarCard extends React.Component {



  addToCrawl = (barObj) => {
    fetch('http://localhost:3000/api/v1/bars', {
      method:"POST",
      headers: {
              "Content-Type": "application/json",
              "Accept":"application/json"},
      body:
        JSON.stringify({
          name:barObj.name,
          pic: barObj.image_url,
          address:barObj.location.display_address.join(" "),
          rating:barObj.rating,
          price:barObj.price,
          latitude:barObj.coordinates.latitude,
          longitude:barObj.coordinates.longitude
        })
      })
      .then(r=>r.json())
      .then(barObject => {
        this.props.setCurrentBar(barObject)
          fetch('http://localhost:3000/api/v1/pubcrawl_bars',{
            method:"POST",
            headers: {
                    "Content-Type": "application/json",
                    "Accept":"application/json"},
            body:
              JSON.stringify({
                pubcrawl_id: this.props.pubcrawl.id,
                bar_id: barObject.id
              })
          })
          .then(r => r.json())
          .then(pubcrawlbar => this.props.currentPubCrawlBar(pubcrawlbar))
      })

      this.props.addBarToPubcrawl(barObj, this.props.pubcrawl.id)
      // remove from this bars state list and add to my bars state
      this.props.myBars(barObj)
  }

  render() {
    return (
      <div>
        <ul>
        <li><h3>{this.props.name}</h3></li>
        <li><img className="restaurant-image" src={this.props.image_url} alt={this.props.name}/></li>
        <li>Price:{this.props.price}</li>
        <li>Rating:{this.props.rating}/5</li>
        <li>Address:{this.props.location.display_address.join(" ")}</li>
        <button onClick={()=>this.addToCrawl(this.props)}>Add to Crawl</button>
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
      pubcrawlbar:state.bars.pubcrawlbar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentBar:(bar) => dispatch(setCurrentBar(bar)),
    addBarToPubcrawl: (bar, pubcrawl_id) => dispatch(addBarToPubcrawl(bar, pubcrawl_id)),
    myBars:(bar) => dispatch(myBars(bar)),
    currentPubCrawlBar:(pubcrawlbar)=>dispatch(currentPubCrawlBar(pubcrawlbar))
  }
}




export default connect(mapStateToProps,mapDispatchToProps)(BarCard);
