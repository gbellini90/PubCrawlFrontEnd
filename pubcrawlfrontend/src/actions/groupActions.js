export const addGroup = (group) =>{
  return {
    type:"ADD_GROUP",
    payload: group
  }
}

export const addUserToGroup = (user, group_id) =>{
  return {
    type:"ADD_USER_TO_GROUP",
    payload: {user, group_id}
  }
}


export const setCurrentGroup = (group) =>{
  return {
    type:"SET_CURRENT_GROUP",
    payload: group
  }
}

export const setGroups = (groups) =>{
  return {
    type:"SET_GROUPS",
    payload: groups
  }
}

export const removeGroup = (group) =>{
  return {
    type:"REMOVE_GROUP",
    payload: group
  }
}
