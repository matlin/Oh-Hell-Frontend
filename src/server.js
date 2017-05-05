const server_url = "http://140.233.131.54:4000";

function Post(body) {
  return {
    body: body,
    method: "POST",
    headers: new Headers({ "Content-type": "application/json" }),
    credentials: "include"
  };
}

function Put(body) {
  return {
    body:body,
    method:"PUT",
    headers: new Headers({ "Content-type": "application/json" }),
    credentials: "include",
    mode: 'cors'
  };
}

const server = {
  url: server_url,
  game: {
    playCard: function(gameID, card) {
      const cardBody = {card:card};
      const cardStr = JSON.stringify(cardBody);
      const request = new Request(server_url + "/game/" + gameID + "/play", Put(cardStr));
      return fetch(request).then(response => {
        if (response.ok) { return response.json(); }
      });
    },
    start: function(gameID) {
      const request = new Request(server_url + "/game/" + gameID + "/start", Put());
      return fetch(request).then(response => {
        if (response.ok){return response.json();}
      });
    },
    bet: function(gameID, bet) {
      const betBody = {bet:bet};
      const betStr = JSON.stringify(betBody);
      const request = new Request(server_url + '/game/' + gameID + '/bet', Put(betStr) );
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
    join: function(id,load) {
        const request = new Request(
          server_url + '/game/' + id + '/join', { method:'PUT', mode: 'cors', credentials: 'include'}
         );
        return fetch(request).then((response) => {
           if (response.ok){return response.json();}
         });
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
