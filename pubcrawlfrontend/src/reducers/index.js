import {combineReducers} from 'redux'

import bars from './bars'
import user from './users&friends'
import users from './users&friends'
import groups from './group'
import usergroups from './group'
import removeGroup from './group'
import budless from './users&friends'
import friendships from './users&friends'
import friends from './users&friends'
import addFriend from './users&friends'
import addPendingFriend from './users&friends'
import addToFriendships from './users&friends'
import pendingFrienders from './users&friends'
import pendingFriendees from './users&friends'



const rootReducer = combineReducers({
  user:user,
  users:users,
  bars:bars,
  groups:groups,
  usergroups:usergroups,
  removeGroup:removeGroup,
  friendships:friendships,
  friends:friends,
  budless:budless,
  addFriend:addFriend,
  addPendingFriend:addPendingFriend,
  addToFriendships:addToFriendships,
  pendingFriendees: pendingFriendees,
  pendingFrienders: pendingFrienders

})

export default rootReducer
