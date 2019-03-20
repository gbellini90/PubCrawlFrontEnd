import React from 'react'
import {connect} from 'react-redux'
import {setCurrentBar} from '../../actions/bar'
import {addBarToPubcrawl} from '../../actions/addbartopubcrawl'
import {myBars} from '../../actions/mybars'



class BarCard extends React.Component {


  addToCrawl = (barObj, coordinates) => {
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
      })

      // remove from the "bars" state list and add to "mybars"
      this.props.myBars(barObj)
      this.props.getBar(coordinates, barObj)

      //add the bar object to this particular pubcrawl
      this.props.addBarToPubcrawl(barObj, this.props.pubcrawl.id)

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
