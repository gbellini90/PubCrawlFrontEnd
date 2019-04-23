import React from 'react'
import {connect} from 'react-redux'
import {setBars} from '../../actions/barActions'
import TextField from '@material-ui/core/TextField';
import Adapter from '../Adapter'

class BarSearch extends React.Component {

  state = {
    search:''
  }

  handleSubmit = (event) => {
    event.preventDefault()
    Adapter.fetchSearchBar(this.state.search)
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
      <form onSubmit={this.handleSubmit}>
          <TextField
              style={{ margin: 8 }}
              name="search"
              onChange={this.handleChange}
              value={this.state.search}
              placeholder="Search by location"
              type="text"
              fullWidth
              margin="normal"
              variant="filled"
              InputLabelProps={{
                shrink: true,
              }}
            />
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
    }
  }





  export default connect(mapStateToProps,mapDispatchToProps)(BarSearch);
