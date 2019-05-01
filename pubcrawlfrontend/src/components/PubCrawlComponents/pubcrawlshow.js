import React from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import {logoutUser} from '../../actions/userActions'
import L from 'leaflet'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';


import PubCard from './pubcard'

const myIcon = L.icon({
    iconUrl: '../beermug.png',
    iconSize: [30, 35],
  })


class PubCrawlShow extends React.Component {

  state = {
    lat: 40.703830518 ,
    long: -74.005666644,
    zoom:14.4,
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    let position = [this.state.lat, this.state.long]
    return (
      <div>
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


        <h2>Group Name:</h2>{this.props.pubcrawl.group ? this.props.pubcrawl.group.name : null}<br/>
        <br/><h2>Group's Creator:</h2> {this.props.pubcrawl.group ? this.props.users.filter(user => (user.id === this.props.pubcrawl.group.creator_id)).map(userObj => <span key={userObj.id}> {userObj.name} </span> ) : null}<br />
        <h2>Group Members:</h2> {this.props.pubcrawl.group ? this.props.pubcrawl.group.users.map(user => <li id='showuser' key={user.id}> {user.name.split(' ').length > 2 ? user.name.split(' ')[1] : user.name.split(' ')[0]}<br/><br/> <img style={{borderRadius:30, width:75, height:75}}src={user.pic} alt={user.name}/></li>) :null }<br/>
        <br/><h2> Your Pubcrawl Bars: </h2>{this.props.pubcrawl.group ? this.props.pubcrawl.bars.map(bar => <PubCard key={bar.id} {...bar} />) : null}
        <Map className="map" center={ Object.keys(this.props.pubcrawl).length > 0  && Object.keys(this.props.pubcrawl.bars).length > 0? [this.props.pubcrawl.bars[0].latitude, this.props.pubcrawl.bars[0].longitude] : position} zoom={this.state.zoom}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
          {this.props.pubcrawl.group ? this.props.pubcrawl.bars.map(bar =>  (
              <Marker
              key={bar.id}
              zoomControl={true}
              animate={true}
              position={[bar.latitude, bar.longitude]}
              icon ={myIcon}>
                <Popup>
                  {bar.name} <br/>
                  {bar.address}
                </Popup>
              </Marker>
          )):null}

        </Map>



      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    user:state.user.user,
    users:state.user.users,
    bars:state.bars.bars,
    bar:state.bars.bar,
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
      logoutUser: () =>dispatch(logoutUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PubCrawlShow);
