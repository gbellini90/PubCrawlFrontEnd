import React from 'react'
import {connect} from 'react-redux'
import BarCard from './BarCard'



class Bars extends React.Component {

  render() {
    return (
      <div>
        <div className='all-bars-box'>
        {this.props.bars.length > 0 ? <h2> All Bars </h2> : null}
        {this.props.bars ? this.props.bars.map(bar=> <BarCard key= {bar.id} {...bar} getBar={this.props.getBar}/>) : null}
        </div>
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
    pubcrawl:state.bars.pubcrawl
  }
}


export default connect(mapStateToProps)(Bars);
