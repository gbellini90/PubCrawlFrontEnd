import React from 'react'
import {connect} from 'react-redux'
import {setBars} from '../actions/bars'
// import {Link} from 'react-router-dom'
import BarCard from './BarCard'
import {Input} from 'react-materialize'
// import {setPubcrawlBars} from '../actions/pubcrawlbars'
// import {setFoundBars} from '../actions/foundbar'


class Bars extends React.Component {

  // componentDidUpdate = () => {
  //   fetch('http://localhost:3000/api/v1/pubcrawl_bars')
  //   .then(r=>r.json())
  //   .then(joinObjs => {
  //     this.props.setPubcrawlBars(joinObjs)
  //   })
  //   fetch('http://localhost:3000/api/v1/bars')
  //   .then(r=>r.json())
  //   .then(barss => {
  //     this.props.setFoundBars(barss)
  // })}


  state = {
    search:''
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/api/v1/search', {
      method:"POST",
      headers: {
              "Content-Type": "application/json",
              "Accept":"application/json"},
      body:
        JSON.stringify({
          location: this.state.search
        })
      }
  ).then(r =>r.json())
  .then(data => this.props.setBars(data.businesses))
  }


  handleChange = (event) => {
    this.setState({
      search: event.target.value
 })
}



  render() {
    return (
      <div className='all-bars-box'>

      {this.props.bars.length > 0 ? <h2> All Bars </h2> : null}
      {this.props.bars ? this.props.bars.map(bar=> <BarCard key= {bar.id} {...bar} getBar={this.props.getBar}/>) : null}
      <form onSubmit={this.handleSubmit}>
        <Input onChange={this.handleChange} name="search" value={this.state.search} placeholder="Search for bars by NYC neighborhood name or zip code" type="text"/>
        <Input type="submit" />
      </form>
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

const mapDispatchToProps = (dispatch) => {
  return {
    setBars: (bars) => dispatch(setBars(bars)),
    // setPubcrawlBars:(pubcrawlbars) => dispatch(setPubcrawlBars(pubcrawlbars)),
    // setFoundBars:(bars) => dispatch(setFoundBars(bars))
  }
}





export default connect(mapStateToProps,mapDispatchToProps)(Bars);
