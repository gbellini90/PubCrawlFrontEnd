const initialState = {
  groups: [],
  group:{}
}

 function reducer(state=initialState, action) {
  switch(action.type){
    case "SET_GROUPS":
      return {...state, groups:action.payload}
    case "ADD_GROUP":
      return {
        ...state,
        groups:[...state.groups, action.payload]
      }
    case "REMOVE_GROUP":
      return {
        ...state,
        groups:state.groups.filter(group => group.id !== action.payload.id)
      }
    case "SET_USER_GROUPS":
      return {...state, usergroups:action.payload}
    case "ADD_USER_TO_GROUP":
      // make a copy of state
      let copyOfGroups =  [...state.groups]

      // find the index of the group (we'll need to replace it later)
      let index = copyOfGroups.findIndex(group => group.id === action.payload.group_id)

      // find the actual group
      let foundGroup = copyOfGroups.find(group => group.id === action.payload.group_id)

      // copy the group so we don't manipulate state
      let copyFoundGroup = {...foundGroup}

      // copy the users so we don't manipulate state
      let copyUsers = [...copyFoundGroup.users]

      // push new user into group
      copyUsers.push(action.payload.user)

      // reset users to our new array of users (with new user added)
      copyFoundGroup.users = copyUsers

      // replace the original group object with our new group object
      copyOfGroups[index] = copyFoundGroup

      return {
        ...state,
        groups: copyOfGroups
      }
    case "SET_CURRENT_GROUP":
      return {...state, group:action.payload}
    default:
      return state
  }
}

export default reducer
