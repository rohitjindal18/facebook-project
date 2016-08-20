var API = {
  	fetchMyProfilePhoto(userId) {
      var request = new Request('http://localhost:7777/fetchSelfProfilePhoto?id='+userId, {
        method: 'GET', 
        mode: 'cors', 
        redirect: 'follow'
      });
      return fetch(request).
      then(response => response.json())
      .then(response => {
        return response.request.uri.href;
      });
   },

   fetchFriends(userId) {
      var request = new Request('http://localhost:7777/fetchFriends?id='+userId, {
        method: 'GET', 
        mode: 'cors', 
        redirect: 'follow'
      });
      return fetch(request).
      then(response => response.json())
      .then(response => {
        return response.data;
      });
   } ,

   fetchFriendsPhoto(id) {
      var request = new Request('http://localhost:7777/fetchFriendsProfilePhoto?id='+id, {
          method: 'GET', 
          mode: 'cors', 
          redirect: 'follow'
        });
        return fetch(request).
        then(response => response.json())
        .then(response => {
          //console.log("nj"+response);
          return response.request.uri.href;
        });
   }
};


module.exports = API;