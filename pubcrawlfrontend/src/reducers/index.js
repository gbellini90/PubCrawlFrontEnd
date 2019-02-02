const initialState = {
  bars:[]
}

 function reducer(state=initialState, action) {
  switch(action.type){
    case "SET_BARS":
      return {...state, bars:action.payload}
    default:
      return state
  }
}

export default reducer
