import {combineReducers} from 'redux'

import user from './users&friends'
import bars from './bars'
import groups from './group'


const rootReducer = combineReducers({
  user:user,
  bars:bars,
  groups:groups,
})

export default rootReducer
