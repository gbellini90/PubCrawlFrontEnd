import {combineReducers} from 'redux'

import bars from './bars'
import user from './user'

const rootReducer = combineReducers({
  user,
  bars:bars
})

export default rootReducer
