const initialState = {
  friends: []
}

 function reducer(state=initialState, action) {
  switch(action.type){
    case "SET_FRIENDS":
      return {...state, friends:action.payload}
    default:
      return state
  }
}

export default reducer
