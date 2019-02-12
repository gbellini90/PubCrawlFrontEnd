const initialState = {
  bars:[],
  mybars:[],
  bar:{},
  pubcrawls:[],
  pubcrawl:{},
  pubcrawlbar:{}
}



 function reducer(state=initialState, action) {
  switch(action.type){
    case "SET_BARS":
      return {...state, bars:action.payload}
    case "CURRENT_PUBCRAWL_BAR":
      return {...state, pubcrawlbar:action.payload}
    case "ADD_TO_MY_BARS":
      return {
        ...state,
        mybars: [...state.mybars, action.payload],
        bars:state.bars.filter(bar => bar.id !== action.payload.id)
      }
    case "REMOVE_FROM_MY_BARS":
      return {
        ...state,
        mybars: state.mybars.filter(bar => bar.id!== action.payload.id),
        bars: [...state.bars, action.payload]
      }
    case "SET_PUBCRAWLS":
      return {...state, pubcrawls:action.payload}
    case "SET_CURRENT_PUBCRAWL":
      return {...state, pubcrawl:action.payload}
    case "ADD_TO_PUBCRAWLS":
      return {
        ...state,
        pubcrawls: [...state.pubcrawls, action.payload]
      }
    case "ADD_BAR_TO_PUBCRAWL":
      // make a copy of state
      let copyOfPubcrawls =  [...state.pubcrawls]

      // find the index of the pubcrawl (we'll need to replace it later)
      let index = copyOfPubcrawls.findIndex(pubcrawl => pubcrawl.id === action.payload.pubcrawl_id)

      // find the actual pubcrawl
      let foundPubcrawl = copyOfPubcrawls.find(pubcrawl => pubcrawl.id === action.payload.pubcrawl_id)

      // copy the pubcrawl so we don't manipulate state
      let copyFoundPubcrawl = {...foundPubcrawl}

      // copy the bars so we don't manipulate state
      let copyBars = [...copyFoundPubcrawl.bars]

      // push new bar into pubcrawl
      copyBars.push(action.payload.bar)

      // reset bars to our new array of bars (with new bar added)
      copyFoundPubcrawl.bars = copyBars

      // replace the original pubcrawl object with our new pubcrawl object
      copyOfPubcrawls[index] = copyFoundPubcrawl

      return {
        ...state,
        pubcrawls: copyOfPubcrawls
      }

    case "REMOVE_BAR_FROM_PUBCRAWL":
      // make a copy of state
      let copyOfPubcrawlss =  [...state.pubcrawls]

      // find the index of the pubcrawl (we'll need to replace it later)
      let indexx = copyOfPubcrawlss.findIndex(pubcrawl => pubcrawl.id === action.payload.pubcrawl_id)

      // find the actual pubcrawl
      let foundPubcrawll = copyOfPubcrawlss.find(pubcrawl => pubcrawl.id === action.payload.pubcrawl_id)

      // copy the pubcrawl so we don't manipulate state
      let copyFoundPubcrawll = {...foundPubcrawll}

      // copy the bars so we don't manipulate state
      let copyBarss = [...copyFoundPubcrawll.bars]

      // remove bar from pubcrawl
      copyBarss.splice(indexx, 1)

      // reset bars to our new array of bars (with bar removed)
      copyFoundPubcrawll.bars = copyBarss

      // replace the original pubcrawl object with our new pubcrawl object
      copyOfPubcrawlss = copyFoundPubcrawll

      return {
        ...state,
        pubcrawls: copyOfPubcrawlss
      }

    case "SET_CURRENT_BAR":
      return {...state, bar:action.payload}
    default:
      return state
  }
}

export default reducer
