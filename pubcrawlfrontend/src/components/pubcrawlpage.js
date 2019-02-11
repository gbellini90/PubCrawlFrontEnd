import React from 'react'
import {connect} from 'react-redux'
import BarContainer from './BarContainer'
import {addToPubCrawls} from '../actions/addpubcrawls'
import {setCurrentPubCrawl} from '../actions/currentpubcrawl'


class PubCrawlPage extends React.Component {

  componentDidMount = () => {
    fetch('http://localhost:3000/api/v1/pubcrawls', {
      method:"POST",
      headers: {
              "Content-Type": "application/json",
              "Accept":"application/json"},
      body:
        JSON.stringify({
          group_id:this.props.group.id
        })
      })
      .then(r=>r.json())
      .then(pubcrawl => {
        this.props.addToPubCrawls(pubcrawl)
        this.props.setCurrentPubCrawl(pubcrawl)
      })
  }

  render() {
    console.log(this.props.group.name)
    return (
      <div>
      Let's create a pubcrawl with your group named, {this.props.group.name}!
      <BarContainer />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
      bars:state.bars.bars,
      user:state.user.user,
      users:state.user.users,
      friendships:state.user.friendships,
      groups:state.groups.groups,
      friends:state.user.friends,
      group:state.groups.group,
      pubcrawls:state.bars.pubcrawls,
      pubcrawl:state.bars.pubcrawl
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToPubCrawls: (pubcrawl) => dispatch(addToPubCrawls(pubcrawl)),
    setCurrentPubCrawl:(pubcrawl) => dispatch(setCurrentPubCrawl(pubcrawl))

  }
}




export default connect(mapStateToProps, mapDispatchToProps)(PubCrawlPage);
