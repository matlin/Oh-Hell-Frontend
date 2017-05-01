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
      const request = new Request(SERVER + "/game/" + gameID, Post(cardStr));
      fetch(request).then(response => {
        if (response.ok) { return response.json(); }
      });
    },
    bet: function(gameID, bet) {
      const betStr = JSON.stringify(bet);
      const request = new Request(SERVER + '/game/' + gameID, post(betStr));
      fetch(request).then((response)=>{
        if (response.ok){ return response.json(); }
      });
    },
    joinGame: function(id) {
        const request = new Request(
          this.props.server + '/game/' + id + '/join', { method:'PUT', mode: 'cors', credentials: 'include'}
         );
        fetch(request).then((response) => { return response.ok; })
    },
    getGames: function() {
       const request = new Request(this.props.server + '/game/', { method:'GET', mode: 'cors', credentials: 'include'})
        fetch(request).then((response)=>{
          if (response.ok){ return response.json(); }
        })
     },
     createGame: function() {
       const request = new Request(
         this.props.server + '/game/create', { method:'POST', credentials: 'include' }
        );
       fetch(request).then((response)=>{
         if (response.ok){ response.json(); }
       })
     }
   },
   user: {
     login: function(user){
       const userStr = JSON.stringify(user);
       const request = new Request(SERVER + '/users/login', Post(userStr));
       fetch(request).then((response)=>{ return response.ok;})
     },
     register: function(){
       const userStr = JSON.stringify(user);
       const request = new Request(SERVER + '/users/register', Post(userStr));
       fetch(request).then((response)=>{ return response.ok;})
     }
   }
};

export default server;
