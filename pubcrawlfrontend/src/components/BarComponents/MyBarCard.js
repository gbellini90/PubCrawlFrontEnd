import React from 'react'
import {connect} from 'react-redux'
import {removeBarFromPubcrawl} from '../../actions/pubcrawlActions'
import {removeFromMyBars} from '../../actions/barActions'
import Adapter from '../Adapter'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
// import withAuth from '../withAuth'

class MyBarCard extends React.Component {

  removeFromCrawl = (bar, pubcrawl, coordinates) => {
    this.props.removeFromMyBars(bar)
    this.props.removeBarFromPubcrawl(bar, pubcrawl.id)
    this.props.getBarToRemove(coordinates, bar)
        Adapter.fetchPubcrawl(pubcrawl.id)
        .then(pubcrawll => {
          let findBar = pubcrawll.bars.find(barr => barr.name === bar.name)
          let barId = findBar.id
          let pubcrawlJoin = pubcrawll.pubcrawl_bars.find(pcb => pcb.pubcrawl_id === pubcrawl.id && pcb.bar_id === barId)
            Adapter.fetchDeletePubcrawlBar(pubcrawlJoin.id)
      })
  }

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
          <Button variant='outlined' color='secondary' fullWidth onClick={()=>this.removeFromCrawl(this.props, this.props.pubcrawl, this.props.coordinates)}>Remove from Crawl</Button>
      </List>

      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    bars:state.bars.bars,
    bar:state.bars.bar,
    user:state.user.user,
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
    removeBarFromPubcrawl: (bar, pubcrawl_id) => dispatch(removeBarFromPubcrawl(bar, pubcrawl_id)),
    removeFromMyBars: (bar) => dispatch(removeFromMyBars(bar)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MyBarCard);
