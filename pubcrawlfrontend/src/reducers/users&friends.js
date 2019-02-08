const initialState = {
  friendships: [],
  friends:[],
  budless:[],
  user: {},
  users: [],
  pendingFriendees:[],
  pendingFrienders:[],
}

 function reducer(state=initialState, action) {
  switch(action.type){
    case "SET_FRIENDSHIPS":
      return {...state, friendships:action.payload}
    case "SET_FRIENDS":
      return {...state, friends:action.payload}
    case "SET_CURRENT_LIST_OF_BUDLESS_USERS":
      return {...state, budless:action.payload}
    case "SET_CURRENT_USER":
      return {...state, user:action.payload}
    case "SET_CURRENT_USERLIST":
      return {...state, users:action.payload}
    case "SET_PENDING_FRIENDEES":
      return {...state, pendingFriendees:action.payload}
    case "SET_PENDING_FRIENDERS":
      return {...state, pendingFrienders:action.payload}
    case "ADD_FRIEND":
      return {
        ...state,
        budless: state.budless.filter(friend => friend !== action.payload),
        pendingFrienders: state.pendingFrienders.filter(friend => friend !== action.payload),
        friends: [...state.friends, action.payload]
      }
    case "ADD_PENDING_FRIEND":
      return {
        ...state,
        budless: state.budless.filter(friend => friend !== action.payload),
        pendingFriendees: [...state.pendingFriendees, action.payload]
      }
    case "ADD_TO_FRIENDSHIPS":
      return {
        friendships: [...state.friendships, action.payload]
      }
    default:
      return state
  }
}


export default reducer
