import React from 'react'
import {connect} from 'react-redux'
import {removeGroup} from '../../actions/removegroup'
import {addUserToGroup} from '../../actions/addusertogroup'
import {setCurrentGroup} from '../../actions/currentgroup'
import {setPubCrawls} from '../../actions/pubcrawls'
import {setCurrentPubCrawl} from '../../actions/currentpubcrawl'
import {Redirect} from "react-router-dom";
import Adapter from '../Adapter'
import {Button} from 'react-materialize'


class GroupCard extends React.Component {

componentDidMount = () => {
  Adapter.fetchPubCrawls()
  .then(pubcrawls => this.props.setPubCrawls(pubcrawls))
}

state ={
  newPubcrawlClicked:false,
  existingCrawlClicked:false
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
    this.setState({newPubcrawlClicked:!this.state.newPubcrawlClicked})
    let groupObj = this.props.groups.find(group => group.id === this.props.id)
    this.props.setCurrentGroup(groupObj)
  }

  viewPubCrawl = (pubcrawl) => {
    console.log(pubcrawl)
    this.setState({existingCrawlClicked:!this.state.existingCrawlClicked})
    fetch('http://localhost:3000/api/v1/pubcrawls')
    .then(r=>r.json())
    .then(data => {
      let foundPubcrawl = data.find(data => data.id === pubcrawl.id)
      // let foundGroup = data.find( data => data.group_id === pubcrawl.group_id)
      this.props.setCurrentPubCrawl(foundPubcrawl)
      // this.props.setCurrentGroup(foundGroup)
      //Need to possibly redirect to this pubcrawl's show page with edit features?
    })
  }

  // <button onClick={()=> this.viewPubCrawl(pubcrawl)}>  View This Pubcrawl! </button>
  // <button className="waves-effect waves-light btn-small" onClick={()=>this.createNewPubCrawl(this.props.id)}> Create New Pub Crawl With {this.props.name} </button>
// <button onClick={()=>this.deleteGroup(this.props.id)}>
// </button>


  render() {
    const groupCard =
      <div className='groupcard'>
        <ul>
          <span>
            <h4>Name of Group: </h4><h2>{this.props.name}</h2>
            <i className="small material-icons" id='trash' onClick={()=>this.deleteGroup(this.props.id)}>
              delete_forever
            </i>
            <br />
            Current users in group {this.props.name} {this.props.usersfromgroup.map(user => <li key={user.id}> {user.name}</li> )}
            <br /><br />

            {this.props.pubcrawls.map(pubcrawl => (
              <div key={pubcrawl.id}>  Pubcrawl id: {pubcrawl.id}
                <Button waves='light' onClick={()=> this.viewPubCrawl(pubcrawl)}>View This Pubcrawl!</Button>

              </div>
            ))}
            {this.props.friends.map(friend => <span key={friend.id}>{friend.name} <button onClick={()=>this.addFriendToGroup(friend, this.props.id) }> {this.props.usersfromgroup.find(user => user.id === friend.id)  ? `Added to ${this.props.name}!` : "Add to Group?"} </button> <br/></span>)} <br /><br />
            <Button waves='light' onClick={()=>this.createNewPubCrawl(this.props.id)}>Create New Pub Crawl With {this.props.name}</Button>

          </span>
        </ul>
      </div>
      return this.state.newPubcrawlClicked? <Redirect to='/pubcrawl'/> : this.state.existingCrawlClicked ?  <Redirect to='mypubcrawl'/> : groupCard

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
