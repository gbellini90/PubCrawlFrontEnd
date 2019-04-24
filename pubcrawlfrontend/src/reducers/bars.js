const initialState = {
  bars:[],
  mybars:[],
  bar:{},
  pubcrawls:[],
  pubcrawl:{},
  pubcrawlbars:[],
  showBars:[],
  foundBars:[]
}

 function reducer(state=initialState, action) {
  switch(action.type){
    case "SET_BARS":
      return {...state, bars:action.payload}
    case "FOUND_BAR":
      return {...state, foundBars:action.payload}
    case "SET_PUBCRAWL_BARS":
      return {...state, showBars:action.payload}
    case "SET_PUBCRAWL_JOIN":
      return {...state, pubcrawlbars:action.payload}
    case "ADD_TO_MY_BARS":
      return {
        ...state,
        mybars: [...state.mybars, action.payload],
        bars:state.bars.filter(bar => bar.id !== action.payload.id)
      }
    case "REMOVE_FROM_MY_BARS":
      return {
        ...state,
        mybars: state.mybars.filter(bar => bar.id!== action.payload.bar.id),
        bars: [...state.bars, action.payload.bar]
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
    case "REMOVE_PUBCRAWL":
      return {
        ...state,
        pubcrawls:state.pubcrawls.filter(pubcrawl=> pubcrawl.id !== action.payload.id)
      }
    case "CLEAR_CRAWL":
      let empty = ''
      return {
        ...state,
        pubcrawl:empty,
        bar:empty,
        mybars:[],
        bars:[]
      }
    case "ADD_BAR_TO_PUBCRAWL":
      // make a copy of state
      let copyOfPubcrawls =  [...state.pubcrawls]

      // find the index of the pubcrawl (we'll need to replace it later)
      let index = copyOfPubcrawls.findIndex(pubcrawl => pubcrawl.id === action.payload.pubcrawl_id)

      // find the actual pubcrawl
      let foundPubcrawl = copyOfPubcrawls.find(pubcrawl => pubcrawl.id === action.payload.pubcrawl_id)
      console.log("In reducer found pub crawl", foundPubcrawl);
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

      // make a copy of state: works, gives back every pubcrawl object which consists of group_id, pubcrawlobj, pubcrawl_bars, bars
      let copyOfPubcrawlss =  [...state.pubcrawls]

      // find the index of the pubcrawl (we'll need to replace it later): gives back index of the pubcrawl within the list of pubcrawls
      let indexx = copyOfPubcrawlss.findIndex(pubcrawl => pubcrawl.id === action.payload.pubcrawl_id)

      // find the actual pubcrawl
      let foundPubcrawll = copyOfPubcrawlss.find(pubcrawl => pubcrawl.id === action.payload.pubcrawl_id)

      // copy the pubcrawl so we don't manipulate state
      let copyFoundPubcrawll = {...foundPubcrawll}

      // // copy the bars so we don't manipulate state
      let copyBarss = [...foundPubcrawll.bars]

      //find the bar to remove and remove from list
      let updatedBarArray = copyBarss.filter(bar => bar.id !== action.payload.bar.id)

      // copyBarss.splice(indexx, 1)

      // reset bars to our new array of bars (with bar removed)
      copyFoundPubcrawll.bars = updatedBarArray

      // replace the original pubcrawl object with our new pubcrawl object
      copyOfPubcrawlss[indexx] = copyFoundPubcrawll


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
