export const addUserToGroup = (user, group_id) =>{
  return {
    type:"ADD_USER_TO_GROUP",
    payload: {user, group_id}
  }
}
