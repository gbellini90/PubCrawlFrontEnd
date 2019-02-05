const initialState = {
  friendship: {
  }
}

 function reducer(state=initialState, action) {
  switch(action.type){
    case "SET_FRIENDSHIP":
      return {...state, friendship:action.payload}
    default:
      return state
  }
}

export default reducer
