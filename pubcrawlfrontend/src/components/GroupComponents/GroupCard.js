import React from 'react'
import {connect} from 'react-redux'
import {removeGroup} from '../../actions/groupActions'
import {addUserToGroup} from '../../actions/groupActions'
import {setCurrentGroup} from '../../actions/groupActions'
import {setPubCrawls} from '../../actions/pubcrawlActions'
import {setCurrentPubCrawl} from '../../actions/pubcrawlActions'
import {removePubCrawl} from '../../actions/pubcrawlActions'
import {Redirect} from "react-router-dom";
import Adapter from '../Adapter'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';

// import withAuth from '../withAuth'



class GroupCard extends React.Component {

  state ={
    newPubcrawlClicked:false,
    existingCrawlClicked:false,
  }

  componentDidMount = () => {
    Adapter.fetchPubCrawls()
    .then(pubcrawls => this.props.setPubCrawls(pubcrawls))
  }

  deleteGroup = (group_id) => {
    Adapter.fetchDeleteGroup(group_id)
    let deletedGroup = this.props.groups.find(group => group.id === group_id)
    this.props.removeGroup(deletedGroup)
  }

  deletePubCrawl = (pubcrawl) => {
    Adapter.fetchDeletePubCrawl(pubcrawl.id)
    let deletedPubCrawl = this.props.pubcrawls.find(pc => pc.id === pubcrawl.id)
    this.props.removePubCrawl(deletedPubCrawl)
  }

  addFriendToGroup = (friend, group_id) => {
    Adapter.fetchAddFriendToGroup(friend.id, group_id)
    this.props.addUserToGroup(friend, group_id)
  }

  createNewPubCrawl = (id) => {
    this.setState({newPubcrawlClicked:!this.state.newPubcrawlClicked})
    let groupObj = this.props.groups.find(group => group.id === this.props.id)
    this.props.setCurrentGroup(groupObj)
  }

  viewPubCrawl = (pubcrawl) => {
    this.setState({existingCrawlClicked:!this.state.existingCrawlClicked})
    Adapter.fetchPubCrawls()
    .then(data => {
      let foundPubcrawl = data.find(data => data.id === pubcrawl.id)
      this.props.setCurrentPubCrawl(foundPubcrawl)
    })
  }

  filterCrawls = () => {
    return this.props.pubcrawls.filter(pubcrawl => pubcrawl.group_id === this.props.id)
  }

  render() {
    console.log(this.props);
    const groupCard =
      <div className='groupcard'>
        <DeleteIcon className="small material-icons" id='trash' onClick={()=>this.deleteGroup(this.props.id)}>delete_forever</DeleteIcon>

          <List>
              <ListItem>
                  <ListItemText align='left'
                      primary={`Name of Group: ${this.props.name}`}>
                  </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText align='left'
                    primary={`Current users in Group ${this.props.name}:`}
                    secondary= {this.props.usersfromgroup.map(user => <span key={user.id}> {user.name}<br/></span> )}>
                  </ListItemText>
                </ListItem>
              <ListItem>
                <ListItemText align='left'>
                    {this.filterCrawls().map(pubcrawl => (
                      <div key={pubcrawl.id}> <br/> Pubcrawl id: {pubcrawl.id} <br/>
                        <Button waves='light' onClick={()=> this.viewPubCrawl(pubcrawl)}>View This Pubcrawl!
                        <i className="material-icons">people</i></Button><br/>
                        <Button>Delete This Pubcrawl!<DeleteIcon onClick={()=>this.deletePubCrawl(pubcrawl)}></DeleteIcon></Button><br/>
                      </div>
                    ))}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>

                    {this.props.friends.map(friend => <span key={friend.id}>{friend.name}
                      <button key={friend.id} onClick={()=>this.addFriendToGroup(friend, this.props.id) }>{this.props.usersfromgroup.find(user => user.id === friend.id)  ? `Added to ${this.props.name}!` : "Add to Group?" }  </button> <br/></span>)}

                </ListItemText>
              </ListItem>
              <Button fullWidth onClick={()=>this.createNewPubCrawl(this.props.id)}>Create New Pub Crawl With {this.props.name}</Button>

          </List>
      </div>
      return this.state.newPubcrawlClicked? <Redirect to='/pubcrawl'/> : this.state.existingCrawlClicked ?  <Redirect to='mypubcrawl'/> : groupCard

  }

}


const mapStateToProps = (state) => {
  return {
      user:state.user.user,
      friends:state.user.friends,
      group:state.groups.group,
      groups:state.groups.groups,
      pubcrawls:state.bars.pubcrawls

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeGroup: (group) => dispatch(removeGroup(group)),
    addUserToGroup : (user, group_id)=> dispatch(addUserToGroup(user,group_id)),
    setCurrentGroup : (group) => dispatch(setCurrentGroup(group)),
    setPubCrawls:(pubcrawls) => dispatch(setPubCrawls(pubcrawls)),
    setCurrentPubCrawl:(pubcrawl) => dispatch(setCurrentPubCrawl(pubcrawl)),
    removePubCrawl:(pubcrawl) => dispatch(removePubCrawl(pubcrawl))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(GroupCard);
