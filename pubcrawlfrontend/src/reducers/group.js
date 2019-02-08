const initialState = {
  groups: [],
  usergroups: []
}

 function reducer(state=initialState, action) {
  switch(action.type){
    case "SET_GROUPS":
      return {...state, groups:action.payload}
    case "SET_USER_GROUPS":
      return {...state, usergroups:action.payload}
    case "ADD_TO_USER_GROUP":
    return {
      usergroups:[...state.usergroups, action.payload]
    }
    case "ADD_GROUP":
      return {
        groups:[...state.groups, action.payload]
      }
    case "REMOVE_GROUP":
      return {
        ...state,
        groups:state.groups.filter(group => group !== action.payload)
      }
    default:
      return state
  }
}

export default reducer
