const URL="http://localhost:3000/api/v1"

export default class Adapter {

    //fetching in Homepage component
    //Getting all user data
    static fetchUsers(){
      return fetch (`${URL}/users`,{
        method:"GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`
        },
      }).then(r => r.json())
    }

    //fetching in Homepage component
    //Getting all friendship data
    static fetchFriendships(){
      return fetch (`${URL}/friendships`,{
        method:"GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`
        },
      } ).then(r => r.json())
    }

    //fetching in Profile component
    //Getting all users who are neither friends with or pending friends with the current user
    static fetchBudlessUsers(id){
      return fetch (`${URL}/users/${id}/budless`,{
        method:"GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(r => r.json())
    }

    //fetching in Profile component
    // Getting all friend data
    static fetchFriends(id){
      return fetch (`${URL}/users/${id}/friends`,{
        method:"GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(r => r.json())
    }


    //fetching in GroupPage component
    //Getting all group data
    static fetchGroups(){
      return fetch (`${URL}/groups`, {
        method:"GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`
        },
      }).then(r => r.json())
    }

    //fetching/posting in GroupPage component
    //Posting a new group instance after user submits new group name
    static fetchCreateGroup(name,creator_id){
      return fetch(`${URL}/groups`, {
        method:"POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
          name: name,
          creator_id: creator_id
        })
      })
      .then(r => r.json())
    }

    //fetching/deleting in GroupCard component
    //Deleting a group
    static fetchDeleteGroup(groupId){
      return fetch(`${URL}/groups/${groupId}`, {
        method:"DELETE",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`
        },
      })
    }

    //fetching/deleting in GroupCard component
    //Deleting a pubcrawl
    static fetchDeletePubCrawl(pubcrawl_id){
      return fetch(`${URL}/pubcrawls/${pubcrawl_id}`, {
        method:"DELETE",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`
        },
      })
    }


    //fetching/posting in GroupCard component
    //Posting a new instance to the join table user_groups
    static fetchAddFriendToGroup(friend_id, group_id){
      return fetch(`${URL}/user_groups`,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          "Accept":"application/json",
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`
        },
        body:
          JSON.stringify({
            user_id:friend_id,
            group_id:group_id
          })
      })
    }

  //fetching in GroupCard component
  //Getting all pubcrawl data
  static fetchPubCrawls(){
    return fetch (`${URL}/pubcrawls`,{
      method:"GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then(r => r.json())
  }


  //fetching/posting in BarCard component
  //Posting a new bar instance
  static fetchPostBar(barObj){
    return fetch (`${URL}/bars`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "Accept":"application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`
      },
      body:
      JSON.stringify({
        name:barObj.name,
        pic: barObj.image_url,
        address:barObj.location.display_address.join(" "),
        rating:barObj.rating,
        price:barObj.price,
        latitude:barObj.coordinates.latitude,
        longitude:barObj.coordinates.longitude
    })
  })
  .then(r=>r.json())
  }


  //fetching/posting in BarCard component
  //Posting a new instance to the join table pubcrawl_bars
  static fetchPostPubcrawlBar(barObject_id,pubcrawl_id){
    return fetch(`${URL}/pubcrawl_bars`,{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        "Accept":"application/json"},
        body:
          JSON.stringify({
            pubcrawl_id: pubcrawl_id,
            bar_id: barObject_id
          })
      })
  }

  //fetching/posting in BarContainer component
  //Posting new search instance to bars
  static fetchSearchBar(userInput){
    return fetch(`${URL}/search`, {
      method:"POST",
      headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
              "Accept":"application/json"},
      body:
        JSON.stringify({
          location: userInput
        })
      })
    .then(r =>r.json())
  }

  //fetching in MyBarCard Component
  // Getting particular pubcrawl data
  static fetchPubcrawl(pubcrawl_id){
    return fetch(`${URL}/pubcrawls/${pubcrawl_id}`,{
      method:"GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`
      },
    })
    .then(r=>r.json())
  }

  //fetching in MyBarCard component
  // Deleting instance from join table
  static fetchDeletePubcrawlBar(pubcrawl_id){
    return fetch(`${URL}/pubcrawl_bars/${pubcrawl_id}`,{
      method:"DELETE",
      headers:{
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`
      }
    })
  }

  //fetching in PendingFrienderCard Component
  //Patching friendship accepted boolean to true
  static fetchPatchFriendship(friendship_id){
    return fetch(`${URL}/friendships/${friendship_id}`,{
      method:"PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`
      },
      body:
        JSON.stringify({
          accepted:true
        })
    })
    .then(r =>r.json())
  }

  //fetching in UserCard Component
  //Posting friends to friendship join table
  static fetchPostFriends(friendee_id, friender_id){
    return fetch(`${URL}/friendships`,{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        "Accept":"application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`
      },
      body:
        JSON.stringify({
          friendee_id: friendee_id,
          friender_id: friender_id
        })
    })
    .then(r => r.json())
  }

  //fetching in PendingFriendList Component
  //Getting pendingFriendee data, setting pendingFrienders
  static fetchPendingFriendees(id){
    return fetch(`${URL}/users/${id}/pendingFriendees`,{
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(r => r.json())
  }

  //fetching in PendingFriendList Component
  //Getting pendingFriender data, setting pendingFriendees
  static fetchPendingFrienders(id){
    return fetch(`${URL}/users/${id}/pendingFrienders`,{
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(r => r.json())
  }

  //fetching in PubcrawlPage Component
  //Posting to pubcrawls
  static fetchPostPubcrawls(group_id){
    return fetch(`${URL}/pubcrawls`,{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        "Accept":"application/json"
      },
      body:
        JSON.stringify({
          group_id:group_id
        })
    })
    .then(r => r.json())
  }

  //fetching in PubcrawlPage Component
  static fetchIpapi(){
    return fetch('https://ipapi.co/json')
    .then(r=>r.json())
  }


}//End of Class
