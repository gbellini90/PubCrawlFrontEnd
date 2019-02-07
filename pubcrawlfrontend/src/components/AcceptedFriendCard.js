import React from 'react'

class AcceptedFriendCard extends React.Component {

  render() {
    return (
      <div>
        <li>{this.props.name} <br/>
        <img src={this.props.pic} /> </li><br/>
      </div>
    );
  }

}

export default AcceptedFriendCard;
