import React from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
// import {setCurrentGroup} from '../actions/currentgroup'
import './css/pubcrawlshow.css';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import L from 'leaflet'
// import {setBars} from '../actions/bars'
// import {pubcrawlShowBars} from '../actions/pubcrawlShowBars'

import PubCard from './pubcard'

const myIcon = L.icon({
    iconUrl: '../beermug.png',
    iconSize: [30, 35],
  })


class PubCrawlShow extends React.Component {

  state = {
    lat: 40.703830518 ,
    long: -74.005666644,
    zoom:14,
  }

  render() {
    let position = [this.state.lat, this.state.long]
    return (
      <div>
      <nav>
      <Link to='/groups'> Back to Group Page </Link>
      </nav>
        Pubcrawl Id: {this.props.pubcrawl.id} <br /> <br />
        <h3>Group Name:</h3> {this.props.pubcrawl.group ? this.props.pubcrawl.group.name : null} <br />
        <h3>Group's Creator:</h3>  {this.props.pubcrawl.group ? this.props.users.filter(user => (user.id === this.props.pubcrawl.group.creator_id)).map(userObj => <span key={userObj.id}> {userObj.name} </span> ) : null}<br /><br />
        <h3>Group Members:</h3>  {this.props.pubcrawl.group ? this.props.pubcrawl.group.users.map(user => <li key={user.id}>{user.name}</li>) :null } <br />
        <h3>Bars: </h3>  {this.props.pubcrawl.group ? this.props.pubcrawl.bars.map(bar => <PubCard key={bar.id} {...bar} />) : null} <br />
        <h3>Map:</h3>

        <Map className="map" center={ Object.keys(this.props.pubcrawl).length > 0  && Object.keys(this.props.pubcrawl.bars).length > 0? [this.props.pubcrawl.bars[0].latitude, this.props.pubcrawl.bars[0].longitude] : position} zoom={this.state.zoom}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
          {this.props.pubcrawl.group ? this.props.pubcrawl.bars.map(bar =>  (
              <Marker
              key={bar.id}
              position={[bar.latitude, bar.longitude]}
              icon ={myIcon}>
                <Popup>
                  {bar.name}
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
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     setCurrentGroup : (group) => dispatch(setCurrentGroup(group)),
//     // setBars: (bars) => dispatch(setBars(bars))
//   }
// }

export default connect(mapStateToProps)(PubCrawlShow);
