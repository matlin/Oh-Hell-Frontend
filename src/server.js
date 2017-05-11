const server_url = 'http://localhost:4000';

//allow instantiating with gameID and callback
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
  Game: class Game{
    constructor(id, callback){
      this.id = id;
      this.callback = callback;
    }
    playCard = (card) => {
      const cardBody = {card:card};
      const cardStr = JSON.stringify(cardBody);
      const request = new Request(server_url + "/game/" + this.id + "/play", Put(cardStr));
      return fetch(request).then(response => {
        if (response.ok) { return response.json(); }
      }).then(this.callback);
    }
    start = () => {
      const request = new Request(server_url + "/game/" + this.id + "/start", Put());
      return fetch(request).then(response => {
        if (response.ok){return response.json();}
      }).then(this.callback);
    }
    bet = (bet) => {
      debugger;
      const betBody = {bet:bet};
      const betStr = JSON.stringify(betBody);
      const request = new Request(server_url + '/game/' + this.id + '/bet', Put(betStr) );
      return fetch(request).then((response)=>{
        if (response.ok){ return response.json(); }
      }).then(this.callback);
    }
    get = () => {
      const request = new Request(server_url + '/game/' + this.id, { method:'GET', mode: 'cors', credentials: 'include'});
      return fetch(request).then(response => {
        if (response.ok){return response.json();}
      }).then(this.callback);
    }
    join = () => {
        const request = new Request(
          server_url + '/game/' + this.id + '/join', { method:'PUT', mode: 'cors', credentials: 'include'}
         );
        return fetch(request).then((response) => {
           if (response.ok){return response.json();}
         }).then(this.callback);
    }
    static getGames() {
       const request = new Request(server_url + '/game/', { method:'GET', mode: 'cors', credentials: 'include'})
       return fetch(request).then((response)=>{
          if (response.ok){
             return response.json();
           }else{
             return null;
          }
        });
     }
     static createGame(gameInfo) {
       const gameInfoStr = JSON.stringify(gameInfo);
       const request = new Request(
         server_url + '/game/create', Post(gameInfoStr)
        );
       return fetch(request).then((response)=>{
         if (response.ok){ response.json(); }
       })
     }
   },
   User: {
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
