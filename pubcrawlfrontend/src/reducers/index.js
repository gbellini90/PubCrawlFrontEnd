import {combineReducers} from 'redux'

import bars from './bars'
import user from './user'
import users from './users'
import friendship from './friendship'
import friendships from './friendships'

const rootReducer = combineReducers({
  user:user,
  bars:bars,
  users:users,
  friendship:friendship,
  friendships:friendships

})

export default rootReducer
