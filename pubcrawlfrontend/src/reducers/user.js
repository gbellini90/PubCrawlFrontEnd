const initialState = {
  user:{}
}

 function reducer(state=initialState, action) {
  switch(action.type){
    case "SET_CURRENT_USER":
      return {...state, user:action.payload}
    default:
      return state
  }
}

export default reducer
