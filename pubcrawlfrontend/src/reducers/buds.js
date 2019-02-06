const initialState = {
  buds: []
}

 function reducer(state=initialState, action) {
  switch(action.type){
    case "SET_BUDS":
      return {...state, buds:action.payload}
    default:
      return state
  }
}

export default reducer
