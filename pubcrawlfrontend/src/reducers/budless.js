const initialState = {
  budless: []
}

 function reducer(state=initialState, action) {
  switch(action.type){
    case "SET_CURRENT_LIST_OF_BUDLESS_USERS":
      return {...state, budless:action.payload}
    default:
      return state
  }
}

export default reducer
