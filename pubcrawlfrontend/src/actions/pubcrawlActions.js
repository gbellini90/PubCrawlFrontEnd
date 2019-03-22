export const addBarToPubcrawl = (bar, pubcrawl_id) =>{
  return {
    type:"ADD_BAR_TO_PUBCRAWL",
    payload: {bar, pubcrawl_id}
  }
}

export const addToPubCrawls = (pubcrawl) => {
  return {
    type:"ADD_TO_PUBCRAWLS",
    payload: pubcrawl
  }
}

export const setCurrentPubCrawl = (pubcrawl) =>{
  return {
    type:"SET_CURRENT_PUBCRAWL",
    payload: pubcrawl
  }
}

export const setPubcrawlBars = (pubcrawlbars) =>{
  return {
    type:"SET_PUBCRAWL_JOIN",
    payload: pubcrawlbars
  }
}

export const setPubCrawls = (pubcrawls) =>{
  return {
    type:"SET_PUBCRAWLS",
    payload: pubcrawls
  }
}

export const pubcrawlShowBars = (bars) =>{
  return {
    type:"SET_PUBCRAWL_BARS",
    payload: bars
  }
}

export const removeBarFromPubcrawl = (bar, pubcrawl_id) =>{
  return {
    type:"REMOVE_BAR_FROM_PUBCRAWL",
    payload: {bar, pubcrawl_id}
  }
}
