import React from 'react'
import {connect} from 'react-redux'
import {setCurrentBar} from '../actions/bar'


class BarCard extends React.Component {



  addToCrawl = (barObj) => {
    console.log("bar clicked")
    console.log(barObj)
    let bar = JSON.stringify({
      pic: barObj.image_url,
      name:barObj.name,
      address:barObj.location.display_address.join(" "),
      rating:barObj.rating,
      price:barObj.price,
      latitude:barObj.coordinates.latitude,
      longitude:barObj.coordinates.longitude
    })
    console.log("from add to crawl", bar)
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
        console.log(barObject);
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

      

  }

  render() {
    return (
      <div>
        <ul>
        <li><h3>{this.props.name}</h3></li>
        <li><img className="restaurant-image" src={this.props.image_url} alt={this.props.name}/></li>
        <li>Price:{this.props.price}</li>
        <li>Rating:{this.props.rating}/5</li>
        <li>Address:{this.props.location.display_address}</li>
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
      pubcrawl:state.bars.pubcrawl
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentBar:(bar) => dispatch(setCurrentBar(bar))

  }
}



export default connect(mapStateToProps,mapDispatchToProps)(BarCard);
