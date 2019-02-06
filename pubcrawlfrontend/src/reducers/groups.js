const initialState = {
  groups: []
}

 function reducer(state=initialState, action) {
  switch(action.type){
    case "SET_GROUPS":
      return {...state, groups:action.payload}
    default:
      return state
  }
}

export default reducer
