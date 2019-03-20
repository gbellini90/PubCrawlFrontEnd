const URL="http://localhost:3000/api/v1"

export default class Adapter {
  static fetchUsers(){
    return fetch (`${URL}/users`).then(r => r.json())
  }

  static fetchFriendships(){
    return fetch (`${URL}/friendships`).then(r => r.json())
  }

  static fetchGroups(){
    return fetch (`${URL}/groups`).then(r => r.json())
  }

  static fetchPubCrawls(){
    return fetch (`${URL}/pubcrawls`).then(r => r.json())
  }
}
