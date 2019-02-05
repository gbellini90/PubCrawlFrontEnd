const initialState = {
  friendships: []
}

 function reducer(state=initialState, action) {
  switch(action.type){
    case "SET_FRIENDSHIPS":
      return {...state, friendships:action.payload}
    default:
      return state
  }
}

export default reducer
