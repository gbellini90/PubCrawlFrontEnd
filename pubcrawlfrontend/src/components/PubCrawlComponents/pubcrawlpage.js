import React from 'react'
import {connect} from 'react-redux'
import BarContainer from '../BarComponents/BarContainer'
import MyBarContainer from '../BarComponents/MyBarContainer'
import {Link} from 'react-router-dom'
import {addToPubCrawls} from '../../actions/pubcrawlActions'
import {setCurrentPubCrawl} from '../../actions/pubcrawlActions'
import {logoutUser} from '../../actions/userActions'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import L from 'leaflet'
import Adapter from '../Adapter'
import withAuth from '../withAuth'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

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
      Adapter.fetchIpapi
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

    Adapter.fetchPostPubcrawls(this.props.group.id)
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
    console.log("My bars prop", this.props.mybars);
    console.log("Bar", this.state.bar)
    let position = this.state.coordinates.length > 0 ? [this.state.coordinates[0].latitude,this.state.coordinates[0].longitude] : [this.state.location.lat, this.state.location.long]
    return (
    <div className='pubcrawlpage'>
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Typography variant="headline" color="inherit">PubHub</Typography>
          <Button variant="text" align="right">
            <Link to='/profile'>  Back to Profile  </Link>
            </Button>
            <Button variant="text" align="right">
            <Link to='/groups'> Back to Group Page </Link>
              </Button>
            <Button variant="text" align="right">
              <Link to='/' onClick={this.props.logoutUser}> Logout </Link>
            </Button>
        </Toolbar>
    </AppBar>




    <h4>  Let's create a pubcrawl with your group named, {this.props.group.name}! </h4>
    <div className= "bar-box">

      <div className="bar-containers">
        <BarContainer getBar={this.getBar} />
        <MyBarContainer getBarToRemove={this.getBarToRemove}/>
      </div>


      <Map className="map" center={position} zoom={this.state.coordinates.length > 0 ? 14 : this.state.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"/>

        {this.state.coordinates ? this.props.mybars.map(bar => (
          <Marker
          key={bar.id}
          position={[bar.coordinates.latitude, bar.coordinates.longitude]}
          icon ={myIcon}>
              <Popup key={bar.id}>
                {bar.name} <br/>
                {bar.location.address1}
              </Popup>
         </Marker>)) : null}
       </Map>
   </div>
    </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
      bars:state.bars.bars,
      user:state.user.user,
      group:state.groups.group,
      pubcrawls:state.bars.pubcrawls,
      pubcrawl:state.bars.pubcrawl,
      mybars:state.bars.mybars
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToPubCrawls: (pubcrawl) => dispatch(addToPubCrawls(pubcrawl)),
    setCurrentPubCrawl:(pubcrawl) => dispatch(setCurrentPubCrawl(pubcrawl)),
    logoutUser: () =>dispatch(logoutUser())
  }
}



export default withAuth(connect(mapStateToProps, mapDispatchToProps)(PubCrawlPage));
