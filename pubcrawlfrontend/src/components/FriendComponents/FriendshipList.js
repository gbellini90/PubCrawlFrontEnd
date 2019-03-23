import React from 'react'
import PendingFriendList from './PendingFriendList'
import AcceptedFriendList from './AcceptedFriendList'
import withAuth from '../withAuth'



class FriendshipList extends React.Component {



  render() {
    return (
      <div className ="friendlist-box">
        <AcceptedFriendList />
        <PendingFriendList />
      </div>
    );
  }

}

export default withAuth(FriendshipList);
