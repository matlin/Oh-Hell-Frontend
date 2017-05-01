const server_url = "http://localhost:4000";

function Post(body) {
  return {
    body: body,
    method: "POST",
    headers: new Headers({ "Content-type": "application/json" }),
    credentials: "include"
  };
}

const server = {
  url: server_url,
  game: {
    playCard: function(gameID, card) {
      const cardStr = JSON.stringify(card);
      const request = new Request(server_url + "/game/" + gameID, Post(cardStr));
      return fetch(request).then(response => {
        if (response.ok) { return response.json(); }
      });
    },
    bet: function(gameID, bet) {
      const betStr = JSON.stringify(bet);
      const request = new Request(server_url + '/game/' + gameID, Post(betStr));
      return fetch(request).then((response)=>{
        if (response.ok){ return response.json(); }
      });
    },
    get: function(id){
      const request = new Request(server_url + '/game/' + id, { method:'GET', mode: 'cors', credentials: 'include'});
      return fetch(request).then(response => {
        if (response.ok){return response.json();}
      });
    },
    join: function(id) {
        const request = new Request(
          server_url + '/game/' + id + '/join', { method:'PUT', mode: 'cors', credentials: 'include'}
         );
        return fetch(request).then((response) => { return response.ok; })
    },
    getGames: function() {
       const request = new Request(server_url + '/game/', { method:'GET', mode: 'cors', credentials: 'include'})
       return fetch(request).then((response)=>{
          if (response.ok){ return response.json(); }
        })
     },
     createGame: function() {
       const request = new Request(
         server_url + '/game/create', { method:'POST', credentials: 'include' }
        );
       return fetch(request).then((response)=>{
         if (response.ok){ response.json(); }
       })
     }
   },
   user: {
     login: function(user){
       const userStr = JSON.stringify(user);
       const request = new Request(server_url + '/users/login', Post(userStr));
       return fetch(request).then((response)=>{ return response.ok;})
     },
     register: function(user){
       const userStr = JSON.stringify(user);
       const request = new Request(server_url + '/users/register', Post(userStr));
       return fetch(request).then((response)=>{ return response.ok;})
     }
   }
};

export default server;
