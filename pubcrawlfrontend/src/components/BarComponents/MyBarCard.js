import React from 'react'
import {connect} from 'react-redux'
import {removeBarFromPubcrawl} from '../../actions/pubcrawlActions'
import {removeFromMyBars} from '../../actions/barActions'



class MyBarCard extends React.Component {

  removeFromCrawl = (bar, pubcrawl, coordinates) => {
    this.props.removeFromMyBars(bar)
    this.props.removeBarFromPubcrawl(bar, pubcrawl.id)
    this.props.getBarToRemove(coordinates, bar)
    // console.log("BAR ID", this.props.bar.id);
        fetch(`http://localhost:3000/api/v1/pubcrawls/${pubcrawl.id}`)
        .then(r=>r.json())
        .then(pubcrawll => {
          let findBar = pubcrawll.bars.find(barr => barr.name === bar.name)
          let barId = findBar.id
          let pubcrawlJoin = pubcrawll.pubcrawl_bars.find(pcb => pcb.pubcrawl_id === pubcrawl.id && pcb.bar_id === barId)
            fetch(`http://localhost:3000/api/v1/pubcrawl_bars/${pubcrawlJoin.id}`, {
              method:"DELETE"
            })
      })
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
        <button onClick={()=>this.removeFromCrawl(this.props, this.props.pubcrawl, this.props.coordinates)}>Remove from Crawl</button>
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
    foundBars:state.bars.foundBars
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeBarFromPubcrawl: (bar, pubcrawl_id) => dispatch(removeBarFromPubcrawl(bar, pubcrawl_id)),
    removeFromMyBars: (bar) => dispatch(removeFromMyBars(bar)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MyBarCard);
