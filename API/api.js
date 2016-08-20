var API = {
  	fetchMyProfilePhoto() {
      var request = new Request('http://localhost:7777/fetchSelfProfilePhoto', {
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

   fetchFriends() {
      var request = new Request('http://localhost:7777/fetchFriends', {
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