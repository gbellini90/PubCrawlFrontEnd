import React from 'react'
import {connect} from 'react-redux'
import {setCurrentBar} from '../../actions/barActions'
import {addBarToPubcrawl} from '../../actions/pubcrawlActions'
import {myBars} from '../../actions/barActions'
import Adapter from '../Adapter'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


class BarCard extends React.Component {

  addToCrawl = (barObj, coordinates) => {
    Adapter.fetchPostBar(barObj)
      .then(barObject => {
        this.props.setCurrentBar(barObject)
          Adapter.fetchPostPubcrawlBar(barObject.id, this.props.pubcrawl.id)
          this.props.myBars(barObj)
          this.props.getBar(coordinates, barObj)
          this.props.addBarToPubcrawl(barObj, this.props.pubcrawl.id)
      })}

  render() {
    return (
      <div>
        <List>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary = {<h3>{this.props.name}</h3>}
            secondary = {`Address:${this.props.location.display_address.join(" ")}`}>
          </ListItemText>
          <ListItemAvatar>
            <Avatar  style={{width:200, height:200, borderRadius:40}} src={this.props.image_url} alt={this.props.name}/>
          </ListItemAvatar>
          <ListItemText
            primary={`Rating: ${this.props.rating}/5`}
            secondary={`Price: ${this.props.price ? this.props.price : 'N/A'}`}>
          </ListItemText>
          </ListItem>
            <Button variant='contained' color='secondary' fullWidth onClick={()=>this.addToCrawl(this.props, this.props.coordinates)}>Add to Crawl</Button>
        </List>

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
