export const addBarToPubcrawl = (bar, pubcrawl_id) =>{
  return {
    type:"ADD_BAR_TO_PUBCRAWL",
    payload: {bar, pubcrawl_id}
  }
}
