import React from 'react'
import {connect} from 'react-redux'
import BarList from './BarList'


class Bars extends React.Component {

  //REACT WITHOUT REDUX
  // state = {
  //   bars: []
  // }
  //
  // componentDidMount = () => {
  //     fetch('http://localhost:3000/api/v1/search', {
  //       method:"POST",
  //       headers: {
  //               "Content-Type": "application/json",
  //               "Accept":"application/json"},
  //       body:
  //         JSON.stringify({
  //           location: "upper east side"
  //         })
  //       }
  //   ).then(r =>r.json())
  //   .then(data => {
  //     this.setState({
  //       bars:data
  //     })
  //   })
  // }

  componentDidMount = () => {
    fetch('http://localhost:3000/api/v1/search', {
      method:"POST",
      headers: {
              "Content-Type": "application/json",
              "Accept":"application/json"},
      body:
        JSON.stringify({
          location: "upper east side"
        })
      }
  ).then(r =>r.json())
  .then(data => this.props.setBars(data))
  }

  searchBars= (event) => {
    console.log(event.target.value)
  }


  render() {
    console.log(this.props.bars)



    return (
      <div><h1>Bar Pageeee</h1>
      <input onChange={this.searchBars} type="text"></input>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    bars:state.bars
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBars: (bars) => dispatch({type:"SET_BARS", payload:bars})
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(Bars);
