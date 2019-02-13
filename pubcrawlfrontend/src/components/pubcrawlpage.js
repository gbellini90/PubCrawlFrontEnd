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
  })


class PubCrawlPage extends React.Component {


  state = {
    location:{
      lat: 40.768163594  ,
      long: -73.959329496
    },
    haveUsersLocation:false,
    zoom:2,
    coordinates:[],
    bar:[]
  }

  componentDidMount = () => {

    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location: {
          lat:position.coords.latitude,
          long:position.coords.longitude
        },
        haveUsersLocation:true,
        zoom:12
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
          zoom:12
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

  getBar = (coordinates, bar) => {
    this.setState({
      coordinates: [...this.state.coordinates,coordinates],
      bar: [...this.state.bar, bar]
    })
  }

  getBarToRemove = (coordinates, bar) => {
    let copyofBarState = this.state.bar.filter(barr => barr.id !== bar.id)
    let copyCoordinateState = this.state.coordinates.filter(coordinate => coordinate.latitude !== coordinates.latitude && coordinate.longitude !== coordinates.longitude)
    this.setState({
      bar:copyofBarState,
      coordinates: copyCoordinateState
    })
  }


  render() {
    let position = this.state.coordinates.length > 0 ? [this.state.coordinates[0].latitude,this.state.coordinates[0].longitude] : [this.state.location.lat, this.state.location.long]
    return (
      <div>
      Let's create a pubcrawl with your group named, {this.props.group.name}!
      <BarContainer getBar={this.getBar} />
      <MyBarContainer getBarToRemove={this.getBarToRemove}/>


      <Map className="map" center={position} zoom={this.state.coordinates.length > 0 ? 14 : this.state.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />

        {this.state.coordinates ? this.state.coordinates.map(coordinate =>
          <Marker
           position={[coordinate.latitude, coordinate.longitude]} icon ={myIcon}>
            {this.state.barObj ? this.state.barObj.map(bar=>
                <Popup>{bar.name} {bar.address}</Popup>
            ):null}
         </Marker>
       ):null}



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
