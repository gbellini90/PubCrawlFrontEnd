const initialState = {
  users: []
}

 function reducer(state=initialState, action) {
  switch(action.type){
    case "SET_CURRENT_USERLIST":
      return {...state, users:action.payload}
    default:
      return state
  }
}

export default reducer
