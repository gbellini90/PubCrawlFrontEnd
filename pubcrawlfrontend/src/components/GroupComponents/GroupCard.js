import React from 'react'
import {connect} from 'react-redux'
import {removeGroup} from '../../actions/groupActions'
import {addUserToGroup} from '../../actions/groupActions'
import {setCurrentGroup} from '../../actions/groupActions'
import {deleteUserFromGroup} from '../../actions/groupActions'
import {setPubCrawls} from '../../actions/pubcrawlActions'
import {setCurrentPubCrawl} from '../../actions/pubcrawlActions'
import {removePubCrawl} from '../../actions/pubcrawlActions'
import {clearCrawl} from '../../actions/pubcrawlActions'
import {myBars} from '../../actions/barActions'
import {setBars} from '../../actions/barActions'
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
    editPubcrawlClicked: false
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
    this.props.clearCrawl()
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

  deleteUserFromUserGroup = (user_groups, group) => {
    let foundUG = user_groups.find(ug => ug.group_id === group.id)
    console.log(foundUG);
    Adapter.fetchDeleteFriendFromGroup(foundUG.id)
    this.props.deleteUserFromGroup(foundUG)
  }

  render() {
    console.log(this.props);
    const groupCard =
      <div className='groupcard'>
      {this.props.creator_id === this.props.user.id ? <DeleteIcon className="small material-icons" id='trash' onClick={()=>this.deleteGroup(this.props.id)}>delete_forever</DeleteIcon> : null}


          <List>
              <ListItem>
                  <ListItemText align='center'
                     primary=<h2> {`Name of Group: ${this.props.name}`}</h2>>
                  </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText align='flex-start'
                      primary={this.props.usersfromgroup.length > 0 ? <h3 style={{textDecorationLine:'underline'}}>Current users in Group {this.props.name}:</h3> : null}
                      secondary={this.props.usersfromgroup.map(user => <h3 style={{textDecorationLine:null}} key={user.id}> {user.name}{this.props.creator_id === this.props.user.id ? <i onClick={()=>this.deleteUserFromUserGroup(user.user_groups, this.props)}className="material-icons">cancel</i> : null} </h3> )}>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText
                  primary=  <h3 style={{textDecorationLine:'underline'}}> Your Friends </h3>
                  secondary={this.props.friends.filter(friend => friend.id !== this.props.creator_id).map(f => <h3 key={f.id}> {f.name}:
                        <span key={f.id}>{this.props.usersfromgroup.find(user => user.id === f.id)  ? ` Officially a member of ${this.props.name}` :  <i className="material-icons" onClick={()=>this.addFriendToGroup(f, this.props.id) }>person_add</i>}</span></h3> )}>
                  </ListItemText>
                </ListItem>
              <ListItem>
                <ListItemText align='left'>
                  {this.filterCrawls().length > 0 ? <h4 style={{textDecorationLine:'underline'}}> Your Pubcrawls with this Group: </h4> : null}
                    {this.filterCrawls().map(pubcrawl => (
                      <div key={pubcrawl.id}> Pubcrawl id: {pubcrawl.id} <br/>
                        <Button onClick={()=> this.viewPubCrawl(pubcrawl)}>View This Pubcrawl!<i className="material-icons">people</i></Button><br/>
                        {this.props.creator_id === this.props.user.id ? <Button onClick={()=>this.deletePubCrawl(pubcrawl)}>Delete This Pubcrawl!<DeleteIcon onClick={()=>this.deletePubCrawl(pubcrawl)}></DeleteIcon></Button> : null}

                        </div>
                    ))}
                </ListItemText>
              </ListItem>

            <Button variant='contained' color='secondary' fullWidth onClick={()=>this.createNewPubCrawl(this.props.id)}>Create New Pub Crawl With {this.props.name}</Button>

          </List>
      </div>
      return this.state.newPubcrawlClicked || this.state.editPubcrawlClicked ? <Redirect to='/pubcrawl'/> : this.state.existingCrawlClicked ?  <Redirect to='mypubcrawl'/> : groupCard

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
    removePubCrawl:(pubcrawl) => dispatch(removePubCrawl(pubcrawl)),
    clearCrawl:()=> dispatch(clearCrawl()),
    setBars: (bars) => dispatch(setBars(bars)),
    myBars:(bar) => dispatch(myBars(bar)),
    deleteUserFromGroup:(user_group) => dispatch(deleteUserFromGroup(user_group))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(GroupCard);
