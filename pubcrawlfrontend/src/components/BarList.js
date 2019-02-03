import React from 'react'
import {connect} from 'react-redux'

class BarList extends React.Component {

  render() {
    console.log(this.props.bars)
    return (
      <div>BarLisssst</div>
    );
  }

}

const mapStateToProps =(state) => {
  return {
      bars:state.bars
  }
}

export default connect(mapStateToProps)(BarList);
