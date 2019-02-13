import React from 'react'
import {connect} from 'react-redux'
import MyBarCard from './MyBarCard'



class MyBarContainer extends React.Component {

  render() {
    return (
      <div>
      {this.props.mybars ? this.props.mybars.map(bar => <MyBarCard key={bar.id} {...bar} getBarToRemove={this.props.getBarToRemove} />) : null}
      </div>
    );
  }

}
const mapStateToProps = (state) => {
  return {
    bars:state.bars.bars,
    user:state.user.user,
    group:state.groups.group,
    groups:state.groups.groups,
    pubcrawls:state.bars.pubcrawls,
    pubcrawl:state.bars.pubcrawl,
    mybars:state.bars.mybars,
    pubcrawlbars:state.bars.pubcrawlbars,
    pubcrawlbar:state.bars.pubcrawlbar
  }
}


export default connect(mapStateToProps)(MyBarContainer);
