import React from 'react'
import {connect} from 'react-redux'
import {setBars} from '../actions/bars'
import {Link} from 'react-router-dom'
import BarCard from './BarCard'
import {Input} from 'react-materialize'


class Bars extends React.Component {

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
      <div>
      <nav>
      <Link to='/profile'>  Back to Profile </Link>
      <Link to='/groups'>  Group Page </Link>
      </nav>
      <h1>Hi from Bar Pageeee</h1>
      {this.props.bars ? this.props.bars.map(bar=> <BarCard key= {bar.id} {...bar} />) : null}
      <form onSubmit={this.handleSubmit}>
        <Input onChange={this.handleChange} name="search" value={this.state.search} placeholder="search by NYC neighborhood" type="text"/>
        <Input type="submit" />
      </form>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    bars:state.bars.bars,
    user:state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBars: (bars) => dispatch(setBars(bars))
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(Bars);
