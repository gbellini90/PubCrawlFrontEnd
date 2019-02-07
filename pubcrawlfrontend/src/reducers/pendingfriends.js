const initialState = {
  pendingFriends: [],
}

 function reducer(state=initialState, action) {
  switch(action.type){
    case "SET_PENDING_FRIENDS":
      return {...state, pendingFriends:action.payload}
      case "ADD_PENDING_FRIEND":
      return {
        ...state,
        // budless:state.budless.filter(friend => friend!== action.payload),
        pendingFriends:[...state.pendingFriends, action.payload]
      }
    default:
      return state
  }
}

export default reducer



// switch(action.type) {
//   case SET_RECIPES:
//     return {
//       ...state,
//       recipes: action.payload
//     }
//   case ADD_RECIPE:
//     return {
//       ...state,
//       recipes: state.recipes.filter(recipe => recipe !== action.payload),
//       myRecipes: [...state.myRecipes, action.payload]
//     }
//   case REMOVE_RECIPE:
//     return {
//       ...state,
//       recipes: [...state.recipes, action.payload],
//       myRecipes: state.myRecipes.filter(recipe => recipe !== action.payload)
//     }
//   default:
//     return state
// }
// }
