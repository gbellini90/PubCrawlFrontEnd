import React from 'react'
import {connect} from 'react-redux'
import BarContainer from '../BarComponents/BarContainer'
import MyBarContainer from '../BarComponents/MyBarContainer'
import BarSearch from '../BarComponents/BarSearch'
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
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Beerzz from '../../images/Beerzz.jpg'
import Image from 'material-ui-image'


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
    zoom:4,
    coordinates:[],
    bar:[]
  }

  componentDidMount = () => {
    window.scrollTo(0, 0)
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
    console.log("Current pubcrawl in pubcrawl page", this.props.pubcrawl);
    let position = this.state.coordinates.length > 0 ? [this.state.coordinates[0].latitude,this.state.coordinates[0].longitude] : [this.state.location.lat, this.state.location.long]

      const barss =
    <div className='pubcrawlpage'>
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Typography variant="headline" color="inherit">PubCrawlin'</Typography>
          <Button variant="text" align="right">
            <Link className="homepagelink" to='/profile'>  Back to Profile  </Link>
            </Button>
            <Button variant="text" align="right">
            <Link className="homepagelink" to='/groups'> Back to Group Page </Link>
              </Button>
            <Button variant="text" align="right">
              <Link className="homepagelink" to='/' onClick={this.props.logoutUser}> Logout </Link>
            </Button>
        </Toolbar>
    </AppBar>


    <h4>  Let's create a pubcrawl with your group named, {this.props.group.name}! </h4>
    <BarSearch />
    <div className= "bar-box">

      <div className="bar-containers">
      <GridList spacing={10} style={{display:'flex', flexWrap:'wrap', justifyContent:'space-around'}}>
        <GridListTile col={2} rows={4}><BarContainer getBar={this.getBar} /></GridListTile>
        <GridListTile col={2} rows={4}><MyBarContainer getBarToRemove={this.getBarToRemove}/></GridListTile>
        </GridList>

        <Map className="map" center={position} zoom={this.state.coordinates.length > 0 ? 14.5 : this.state.zoom}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"/>

          {this.state.coordinates ? this.props.mybars.map(bar => (
            <Marker
            key={bar.id}
            zoomControl={true}
            animate={true}
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
    </div>

    const noBars =

    <div className='pubcrawlpage'>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="headline" color="inherit">PubCrawlin'</Typography>
            <Button variant="text" align="right">
              <Link className="homepagelink" to='/profile'>  Back to Profile  </Link>
              </Button>
              <Button variant="text" align="right">
              <Link className="homepagelink" to='/groups'> Back to Group Page </Link>
                </Button>
              <Button variant="text" align="right">
                <Link className="homepagelink" to='/' onClick={this.props.logoutUser}> Logout </Link>
              </Button>
          </Toolbar>
      </AppBar>


      <h4>  Let's create a pubcrawl with your group named, {this.props.group.name}! </h4>
      <BarSearch /><Image className='search' src={Beerzz} ></Image>

      </div>

    return this.props.bars.length > 0 || this.props.mybars.length > 0 ? barss : noBars
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
    logoutUser: () =>dispatch(logoutUser()),
  }
}



export default withAuth(connect(mapStateToProps, mapDispatchToProps)(PubCrawlPage));
