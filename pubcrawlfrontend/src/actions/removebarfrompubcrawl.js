export const removeBarFromPubcrawl = (bar, pubcrawl_id) =>{
  return {
    type:"REMOVE_BAR_FROM_PUBCRAWL",
    payload: {bar, pubcrawl_id}
  }
}
