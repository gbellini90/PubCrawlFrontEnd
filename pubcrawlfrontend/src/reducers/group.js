const initialState = {
  group: {
  }
}

 function reducer(state=initialState, action) {
  switch(action.type){
    case "SET_GROUP":
      return {...state, group:action.payload}
    default:
      return state
  }
}

export default reducer
