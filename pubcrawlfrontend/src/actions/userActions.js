export const setCurrentUserList = (users) =>{
  return {
    type:"SET_CURRENT_USERLIST",
    payload: users
  }
}

export const setPendingFrienders = (pendingFrienders) =>{
  return {
    type:"SET_PENDING_FRIENDERS",
    payload: pendingFrienders
  }
}

export const setPendingFriendees = (pendingFriendees) =>{
  return {
    type:"SET_PENDING_FRIENDEES",
    payload: pendingFriendees
  }
}

export const loginUser = (username, password) => {
  return  (dispatch) => {
    dispatch({ type: 'AUTHENTICATING_USER' })
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
          username: username,
          password: password
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(JSONResponse => {
        localStorage.setItem('jwt', JSONResponse.jwt)
        // dispatch({ type: 'SET_CURRENT_USER', payload: JSONResponse.user })
        console.log(JSONResponse)
        dispatch(setCurrentUser(JSONResponse.user))
      })
      .catch(r => r.json().then(e => dispatch(failedLogin(e.message))))
      // .then((jsonResponse) => {
      //   localStorage.setItem('jwt', jsonResponse.jwt)
      //   dispatch(setCurrentUser(jsonResponse.user))
      // })
  }
}

export const setFriendships = (friendships) =>{
  return {
    type:"SET_FRIENDSHIPS",
    payload: friendships
  }
}

export const setFriends = (friends) =>{
  return {
    type:"SET_FRIENDS",
    payload: friends
  }
}

export const fetchCurrentUser = () => {
  // takes the token in localStorage and finds out who it belongs to
  return (dispatch) => {
    dispatch(authenticatingUser()) //tells the app we are fetching
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(response => response.json())
      .then((JSONResponse) => dispatch(setCurrentUser(JSONResponse.user)))
  }
}

export const setCurrentUser = (user) =>{
  return {
    type:"SET_CURRENT_USER",
    payload: user
  }
}

export const failedLogin = (errorMsg) => ({
  type: 'FAILED_LOGIN',
  payload: errorMsg
})

export const setCurrentListofBudlessUsers = (budless) =>{
  return {
    type:"SET_CURRENT_LIST_OF_BUDLESS_USERS",
    payload: budless
  }
}

// tell our app we're currently fetching
export const authenticatingUser = () => ({ type: 'AUTHENTICATING_USER' })
// export const authenticatingUser = () => {
//   return { type: 'AUTHENTICATING_USER' }
// }

export const signUpUser = (username, password, name, bio, pic, age) => {
	return (dispatch) => {
	  const data = { user: {username, password, name, bio, pic, age} }
	    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users`,{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
        body: JSON.stringify(data)
      })
      .then(res => res.json())
	    .then(res => {
		    localStorage.setItem('jwt', res.jwt)
		    dispatch({ type: "SET_CURRENT_USER", payload: res.user})
	     })

 	}
  }

  //
  // export const signUpUser = (username, password, name, bio, pic, age) => {
  //   return  (dispatch) => {
  //     dispatch({ type: 'AUTHENTICATING_USER' })
  //     fetch('http://localhost:3000/api/v1/users', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json'
  //       },
  //       body: JSON.stringify({
  //         user:{
  //           username: username,
  //           password: password,
  //           name:name,
  //           bio: bio,
  //           pic:pic,
  //           age:age
  //       }})
  //     })
  //       .then(response => {
  //         if (response.ok) {
  //           return response.json()
  //         } else {
  //           throw response
  //         }
  //       })
  //       .then(JSONResponse => {
  //         localStorage.setItem('jwt', JSONResponse.jwt)
  //         // dispatch({ type: 'SET_CURRENT_USER', payload: JSONResponse.user })
  //         dispatch(setCurrentUser(JSONResponse.user))
  //       })
  //       .catch(r => r.json().then(e => dispatch(failedLogin(e.message))))
  //       // .then((jsonResponse) => {
  //       //   localStorage.setItem('jwt', jsonResponse.jwt)
  //       //   dispatch(setCurrentUser(jsonResponse.user))
  //       // })
  //   }
  // }
  //





















export const addUser = (newUser) => {
  return {
    type:"ADD_USER",
    payload: newUser
  }
}


export const logoutUser = () => ({ type: 'LOGOUT_USER' })

export const addToFriendships = (friendship) => {
  return {
    type:"ADD_TO_FRIENDSHIPS",
    payload: friendship
  }
}

export const addPendingFriend = (pendingFriend) =>{
  return {
    type:"ADD_PENDING_FRIEND",
    payload: pendingFriend
  }
}

export const addFriend = (friend) =>{
  return {
    type:"ADD_FRIEND",
    payload: friend
  }
}
