import React from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import {setCurrentGroup} from '../actions/currentgroup'
// import {setBars} from '../actions/bars'
// import {pubcrawlShowBars} from '../actions/pubcrawlShowBars'
import PubCard from './pubcard'



class PubCrawlShow extends React.Component {

  // saveBars = () => {
  //   this.props.setBars(this.props.pubcrawl.bars)
  // }

  render() {
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
        Group's Creator: {this.props.pubcrawl.group ? this.props.users.filter(user => (user.id === this.props.pubcrawl.group.creator_id)).map(userObj => <span> {userObj.name} </span> ) : null}<br />
        Group Members: {this.props.pubcrawl.group ? this.props.pubcrawl.group.users.map(user => <li>{user.name}</li>) :null } <br />
        Bars: {this.props.pubcrawl.group ? this.props.pubcrawl.bars.map(bar => <PubCard key={bar.id} {...bar} />) : null} <br />
        {this.test()}
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
