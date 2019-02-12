import React from 'react'
import {connect} from 'react-redux'
import {removeGroup} from '../actions/removegroup'
import {addUserToGroup} from '../actions/addusertogroup'
import {setCurrentGroup} from '../actions/currentgroup'
import {setPubCrawls} from '../actions/pubcrawls'
import {setCurrentPubCrawl} from '../actions/currentpubcrawl'
import {Redirect} from "react-router-dom";





class GroupCard extends React.Component {

componentDidMount = () => {
  fetch('http://localhost:3000/api/v1/pubcrawls')
  .then(r=>r.json())
  .then(pubcrawls => this.props.setPubCrawls(pubcrawls))
}

state ={
  pubcrawlClicked:false
}

  deleteGroup = (group_id) => {
    fetch(`http://localhost:3000/api/v1/groups/${group_id}`, {
      method:"DELETE"
    })
    let deleteGroup = this.props.groups.find(group => group.id === group_id)
    this.props.removeGroup(deleteGroup)
  }



  addFriendToGroup = (friend, group_id) => {
    fetch('http://localhost:3000/api/v1/user_groups', {
      method:"POST",
      headers: {
              "Content-Type": "application/json",
              "Accept":"application/json"},
      body:
        JSON.stringify({
          user_id:friend.id ,
          group_id:group_id
        })
      })

      this.props.addUserToGroup(friend,group_id)
  }

  createNewPubCrawl = (id) => {
    this.setState({pubcrawlClicked:!this.state.pubcrawlClicked})
    let groupObj = this.props.groups.find(group => group.id === this.props.id)
    this.props.setCurrentGroup(groupObj)
  }

  addBarsToExistingPubCrawl = (pubcrawl) => {
    // this.setState({pubcrawlClicked:!this.state.pubcrawlClicked})
    fetch('http://localhost:3000/api/v1/pubcrawls')
    .then(r=>r.json())
    .then(data => {console.log(data)
      let foundPubcrawl = data.find(data => data.id === pubcrawl.id)
      let foundGroup = data.find( data => data.group_id === pubcrawl.group_id)
      this.props.setCurrentPubCrawl(foundPubcrawl)
      this.props.setCurrentGroup(foundGroup)
      //Need to possibly redirect to this pubcrawl's show page with edit features?
    })
  }



  render() {
    const groupCard =
      <div>
        <ul>
          <li>
            <h3>Name of Group: {this.props.name} <button onClick={()=>this.deleteGroup(this.props.id)}>x</button><br /></h3>
            Current users in group {this.props.name} {this.props.usersfromgroup.map(user => <li key={user.id}> {user.name} </li>)}
            Group Id: {this.props.id} <br/>
            Creator Id: {this.props.creator_id} <br/>
            {this.props.pubcrawls.map(pubcrawl => (
              <div key={pubcrawl.id}>  Group Id of this existing pub crawl{pubcrawl.group_id},Pubcrawl id of this existing pubcrawl {pubcrawl.id}
                <button onClick={()=> this.addBarsToExistingPubCrawl(pubcrawl)}>  Add bars to this existing pubcrawl</button>
              </div>
            ))}
            {this.props.friends.map(friend => <span key={friend.id}>{friend.name} <button onClick={()=>this.addFriendToGroup(friend, this.props.id)}> {this.props.usersfromgroup.find(user => user.id === friend.id)  ? `Added to ${this.props.name}!` : "Add to Group?"} </button> </span>)} <br />
            <button onClick={()=>this.createNewPubCrawl(this.props.id)}> Create New Pub Crawl With {this.props.name} </button>
          </li>
        </ul>
      </div>
      return this.state.pubcrawlClicked? <Redirect to='/pubcrawl'/> : groupCard

  }

}


const mapStateToProps = (state) => {
  return {
      user:state.user.user,
      friends:state.user.friends,
      group:state.groups.group,
      groups:state.groups.groups
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeGroup: (group) => dispatch(removeGroup(group)),
    addUserToGroup : (user, group_id)=> dispatch(addUserToGroup(user,group_id)),
    setCurrentGroup : (group) => dispatch(setCurrentGroup(group)),
    setPubCrawls:(pubcrawls) => dispatch(setPubCrawls(pubcrawls)),
    setCurrentPubCrawl:(pubcrawl) => dispatch(setCurrentPubCrawl(pubcrawl))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(GroupCard);
