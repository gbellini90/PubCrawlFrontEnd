export const setCurrentBar = (bar) =>{
  return {
    type:"SET_CURRENT_BAR",
    payload: bar
  }
}

export const setBars = (bars) =>{
  return {
    type:"SET_BARS",
    payload: bars
  }
}

export const myBars = (bar) =>{
  return {
    type:"ADD_TO_MY_BARS",
    payload: bar
  }
}

export const removeFromMyBars = (bar) =>{
  return {
    type:"REMOVE_FROM_MY_BARS",
    payload: {bar}
  }
}
