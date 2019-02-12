import React from 'react'
import {connect} from 'react-redux'
import {removeBarFromPubcrawl} from '../actions/removebarfrompubcrawl'
import {removeFromMyBars} from '../actions/removefrommybars'
// import {myBars} from '../actions/mybars'
import {addBarToPubcrawl} from '../actions/addbartopubcrawl'


class PubCard extends React.Component {

  // componentDidMount = () => {
  //   fetch(`http://localhost:3000/api/v1/pubcrawls/${pubcrawl.id}`)
  //   .then(r=>r.json())
  //   .then(pubcrawlObj => {
  //     pubcrawlObj.
  //   this.props.currentPubCrawlBar(pubcrawlbar))
  //   })
  //
  // }

  //add in state that if edit is clicked, then conditionally render the search form, add that in from bar container, and add in the addtocrawl from the barcard

  removeFromCrawl = (bar, pubcrawl) => {
    console.log(bar)
    console.log(pubcrawl)
    let foundCrawl = pubcrawl.pubcrawl_bars.find(pubcrawlbar => pubcrawlbar.bar_id === bar.id && pubcrawlbar.pubcrawl_id === pubcrawl.id)
    console.log(foundCrawl)
    fetch(`http://localhost:3000/api/v1/pubcrawl_bars/${foundCrawl.id}`, {
      method:"DELETE"
    })
    this.props.removeBarFromPubcrawl(bar, pubcrawl.id)
    // this.props.removeFromMyBars(bar)
  }

  // addToCrawl = (bar) => {
  //   fetch('http://localhost:3000/api/v1/pubcrawl_bars',{
  //     method:"POST",
  //     headers: {
  //             "Content-Type": "application/json",
  //             "Accept":"application/json"},
  //     body:
  //       JSON.stringify({
  //         pubcrawl_id: this.props.pubcrawl.id,
  //         bar_id: barObject.id
  //       })
  //   })
  //     .then(r => r.json())
  //     .then(pubcrawlbar => this.props.currentPubCrawlBar(pubcrawlbar))
  //   })
  //   //add the bar object to this particular pubcrawl
  //   this.props.addBarToPubcrawl(barObj, this.props.pubcrawl.id)
  //
  //   // remove from the "bars" state list and add to "mybars"
  //   this.props.myBars(barObj)
  // }
  //
  // <button onClick={()=>this.removeFromCrawl(this.props, this.props.pubcrawl)}>Remove from Crawl</button>


  render() {
    console.log(this.props);
    return (
      <div>
      <ul>
        <li><h3>{this.props.name}</h3></li>
        <li><img className="restaurant-image" src={this.props.pic} alt={this.props.name}/></li>
        <li>Price:{this.props.price}</li>
        <li>Rating:{this.props.rating}/5</li>
        <li>Address:{this.props.address}</li>
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

const mapDispatchToProps = (dispatch) => {
  return {
    removeBarFromPubcrawl: (bar, pubcrawl_id) => dispatch(removeBarFromPubcrawl(bar, pubcrawl_id)),
    // removeFromMyBars: (bar) => dispatch(removeFromMyBars(bar)),
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(PubCard);
