import React from 'react'
import {connect} from 'react-redux'
import BarContainer from './BarContainer'
import MyBarContainer from './MyBarContainer'
import './css/pubcrawlpage.css';
import {addToPubCrawls} from '../actions/addpubcrawls'
import {setCurrentPubCrawl} from '../actions/currentpubcrawl'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import L from 'leaflet'

const myIcon = L.icon({
    iconUrl: '../beermug.png',
    iconSize: [25, 30],
    iconAnchor: [12.5,30],
    popupAnchor: [0, -30],
  })


class PubCrawlPage extends React.Component {

  state = {
    location:{
      lat: 40.703830518 ,
      long: -74.005666644
    },
    haveUsersLocation:false,
    zoom:2,
  }

  componentDidMount = () => {

    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location: {
          lat:position.coords.latitude,
          long:position.coords.longitude
        },
        haveUsersLocation:true,
        zoom:13
      })
      }, ()=> {
      fetch('https://ipapi.co/json')
      .then(r=>r.json())
      .then(location => {
        this.setState({
          location: {
            lat:location.latitude,
            long:location.longitude
          },
          haveUsersLocation:true,
          zoom:13
        })
      })
      }
    )

    fetch('http://localhost:3000/api/v1/pubcrawls', {
      method:"POST",
      headers: {
              "Content-Type": "application/json",
              "Accept":"application/json"},
      body:
        JSON.stringify({
          group_id:this.props.group.id
        })
      })
      .then(r=>r.json())
      .then(pubcrawl => {
        this.props.addToPubCrawls(pubcrawl)
        this.props.setCurrentPubCrawl(pubcrawl)
      })
  }

  render() {
    const position =[this.state.location.lat, this.state.location.long]
    return (
      <div>
      Let's create a pubcrawl with your group named, {this.props.group.name}!
      <BarContainer />
      <MyBarContainer />


      <Map className="map" center={position} zoom={this.state.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
       {this.state.haveUsersLocation ?  <Marker
          position={position} icon ={myIcon}>
            <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
          </Marker> : null }

    </Map>



      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
      bars:state.bars.bars,
      user:state.user.user,
      users:state.user.users,
      friendships:state.user.friendships,
      groups:state.groups.groups,
      friends:state.user.friends,
      group:state.groups.group,
      pubcrawls:state.bars.pubcrawls,
      pubcrawl:state.bars.pubcrawl
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToPubCrawls: (pubcrawl) => dispatch(addToPubCrawls(pubcrawl)),
    setCurrentPubCrawl:(pubcrawl) => dispatch(setCurrentPubCrawl(pubcrawl))

  }
}




export default connect(mapStateToProps, mapDispatchToProps)(PubCrawlPage);
