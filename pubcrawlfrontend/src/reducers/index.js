import {combineReducers} from 'redux'

import bars from './bars'
import user from './user'
import users from './users'
import friendship from './friendship'
import friendships from './friendships'
import group from './group'
import groups from './groups'
import buds from './buds'


const rootReducer = combineReducers({
  user:user,
  bars:bars,
  users:users,
  friendship:friendship,
  friendships:friendships,
  group:group,
  groups:groups,
  buds:buds

})

export default rootReducer
