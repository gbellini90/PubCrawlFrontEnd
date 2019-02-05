import React from 'react'
import {connect} from 'react-redux'

class AcceptedFriendCard extends React.Component {

  findFriendeeUserObj = () => {
    let foundFriendee = this.props.users.find(user => user.id === this.props.friendee_id || user.id === this.props.friender_id)
    return (foundFriendee ? foundFriendee.name : null)
  }

  render() {
    return (
      <div>
      Accepted Friendships:

      <li>Friendship id: {this.props.id} <br/>
          Friender_id: {this.props.friender_id} <br/>
          Friendee_id {this.props.friendee_id} <br/>
          Who is your friend? : {this.findFriendeeUserObj()} <br />
          <button> Add to your Bar Crawl Group? </button>
      </li> <br/>

    </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
      bars:state.bars.bars,
      user:state.user.user,
      users:state.users.users,
      friendship:state.friendship.friendship,
      friendships:state.friendships.friendships
  }
}

export default connect(mapStateToProps)(AcceptedFriendCard);
