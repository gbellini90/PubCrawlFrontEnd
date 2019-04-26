import React from 'react'
import {connect} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import withAuth from '../withAuth'

class PubCard extends React.Component {

  render() {
    console.log(this.props);
    return (
      <div>
      <List>
        <ListItem alignItems = {'center'}>
        <ListItemText
          primary = {<h2>{this.props.name}</h2>}
          secondary = {`Address: ${this.props.address}`}>
        </ListItemText>
        <ListItemText
          primary = {`Rating: ${this.props.rating}/5`}
          secondary = {`Price: ${this.props.price ? this.props.price : 'N/A'}`}>
        </ListItemText>
        <ListItemAvatar>
          <Avatar style={{borderRadius:20, width:125,height:125}} src={this.props.pic} alt={this.props.name}/>
        </ListItemAvatar>
      </ListItem>
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
    pubcrawlbar:state.bars.pubcrawlbar,
  }
}


export default connect(mapStateToProps)(PubCard);
