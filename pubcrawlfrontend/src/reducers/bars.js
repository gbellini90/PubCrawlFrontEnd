const initialState = {
  bars:[],
  bar:{},
  pubcrawls:[],
  pubcrawl:{}
}

 function reducer(state=initialState, action) {
  switch(action.type){
    case "SET_BARS":
      return {...state, bars:action.payload}
    case "SET_PUBCRAWLS":
      return {...state, pubcrawls:action.payload}
    case "SET_CURRENT_PUBCRAWL":
      return {...state, pubcrawl:action.payload}
    case "ADD_TO_PUBCRAWLS":
      return {
        ...state,
        pubcrawls: [...state.pubcrawls, action.payload]
      }
    case "SET_CURRENT_BAR":
      return {...state, bar:action.payload}
    default:
      return state
  }
}

export default reducer
