import React from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import {setCurrentGroup} from '../actions/currentgroup'
import './css/pubcrawlshow.css';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import L from 'leaflet'
// import {setBars} from '../actions/bars'
// import {pubcrawlShowBars} from '../actions/pubcrawlShowBars'
import PubCard from './pubcard'

const myIcon = L.icon({
    iconUrl: '../beermug.png',
    iconSize: [25, 30],
    iconAnchor: [12.5, 30],
    popupAnchor: [0, -30],
  })


class PubCrawlShow extends React.Component {

  // componentDidMount = () => {
  //   this.setState({
  //     lat: this.props.pubcrawl.group ? this.props.pubcrawl.bars[0].latitude : 40.703830518 ,
  //     long: this.props.pubcrawl.group ? this.props.pubcrawl.bars[0].longitude : -74.005666644
  //   })
  // }
  state = {
    lat: 40.703830518 ,
    long: -74.005666644,
    zoom:15,
  }

  // state = {
  //   lat: this.props.pubcrawl.group ? this.props.pubcrawl.bars[0].latitude : 40.703830518 ,
  //   long: this.props.pubcrawl.group ? this.props.pubcrawl.bars[0].longitude : -74.005666644,
  //   zoom:15,
  // }

  render() {
    let position = [this.state.lat, this.state.long]
    console.log("from pubcrawl show, groups", this.props.groups)
    console.log("from pubcrawl show, props", this.props)
    console.log("from pubcrawl show group obj", this.props.pubcrawl.group)
    console.log("from pubcrawl show, pubcrawl obj", this.props.pubcrawl)

    return (
      <div>
      <nav>
      <Link to='/groups'> Back to Group Page </Link>
      </nav>
        Hi from Pubcrawl Show page <br />
        Pubcrawl Id: {this.props.pubcrawl.id} <br />
        Group Id: {this.props.pubcrawl.group_id} <br />
        Group Name: {this.props.pubcrawl.group ? this.props.pubcrawl.group.name : null} <br />
        Group's Creator: {this.props.pubcrawl.group ? this.props.users.filter(user => (user.id === this.props.pubcrawl.group.creator_id)).map(userObj => <span key={userObj.id}> {userObj.name} </span> ) : null}<br />
        Group Members: {this.props.pubcrawl.group ? this.props.pubcrawl.group.users.map(user => <li key={user.id}>{user.name}</li>) :null } <br />
        Bars: {this.props.pubcrawl.group ? this.props.pubcrawl.bars.map(bar => <PubCard key={bar.id} {...bar} />) : null} <br />
        Map:

        <Map className="map" center={this.props.pubcrawl.group ? [this.props.pubcrawl.bars[0].latitude, this.props.pubcrawl.bars[0].longitude] : position} zoom={15}>
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
    pubcrawls:state.bars.pubcrawls,
    pubcrawl:state.bars.pubcrawl,
    groups:state.groups.groups,
    group:state.groups.group,
    // showBars:state.bars.showBars
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentGroup : (group) => dispatch(setCurrentGroup(group)),
    // setBars: (bars) => dispatch(setBars(bars))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PubCrawlShow);
