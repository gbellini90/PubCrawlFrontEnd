import {combineReducers} from 'redux'

import bars from './bars'
import user from './user'
import users from './users'
import friendship from './friendship'
import friendships from './friendships'
import group from './group'
import groups from './groups'
import friends from './friends'
import budless from './budless'
import addfriend from './addfriend'
import pendingFriends from './pendingfriends'


const rootReducer = combineReducers({
  user:user,
  bars:bars,
  users:users,
  friendship:friendship,
  friendships:friendships,
  group:group,
  groups:groups,
  friends:friends,
  budless:budless,
  addfriend:addfriend,
  pendingFriends:pendingFriends

})

export default rootReducer
