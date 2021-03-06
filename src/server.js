/* This is the server class. In contains every request that the front end makes.
 * Any component that makes a request should import class.
 */

const server_url = "https://oh-hell.herokuapp.com";
//const server_url = 'https://oh-hell.herokuapp.com';

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
    body: body,
    method: "PUT",
    headers: new Headers({ "Content-type": "application/json" }),
    credentials: "include",
    mode: "cors"
  };
}

const server = {
  url: server_url,
  Game: class Game {
    constructor(id, callback) {
      this.id = id;
      this.callback = callback;
    }
    playCard = card => {
      const cardBody = { card: card };
      const cardStr = JSON.stringify(cardBody);
      const request = new Request(
        server_url + "/game/" + this.id + "/play",
        Put(cardStr)
      );
      return fetch(request)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(this.callback);
    };
    start = () => {
      const request = new Request(
        server_url + "/game/" + this.id + "/start",
        Put()
      );
      return fetch(request)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(this.callback);
    };
    bet = bet => {
      const betBody = { bet: bet };
      const betStr = JSON.stringify(betBody);
      const request = new Request(
        server_url + "/game/" + this.id + "/bet",
        Put(betStr)
      );
      return fetch(request)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(this.callback);
    };
    get = () => {
      const request = new Request(server_url + "/game/" + this.id, {
        method: "GET",
        mode: "cors",
        credentials: "include"
      });
      return fetch(request)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(this.callback);
    };
    join = password => {
      const passBody = JSON.stringify({ password });
      const request = new Request(
        server_url + "/game/" + this.id + "/join",
        Put(passBody)
      );
      return fetch(request)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(this.callback);
    };
    getHand = () => {
      const request = new Request(server_url + "/game/" + this.id + "/hand/", {
        method: "GET",
        mode: "cors",
        credentials: "include"
      });
      return fetch(request)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(this.callback);
    };
    static getGames() {
      const request = new Request(server_url + "/game/", {
        method: "GET",
        mode: "cors",
        credentials: "include"
      });
      return fetch(request).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return null;
        }
      });
    }
    static createGame(gameInfo) {
      const gameInfoStr = JSON.stringify(gameInfo);
      const request = new Request(
        server_url + "/game/create",
        Post(gameInfoStr)
      );
      return fetch(request).then(response => {
        if (response.ok) {
          return response.json();
        }
      });
    }
    static deleteGame(gameID) {
      const request = new Request(server_url + "/game/" + gameID + "/delete", {
        method: "DELETE",
        mode: "cors",
        credentials: "include"
      });
      return fetch(request).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return null;
        }
      });
    }
  },
  User: {
    login: function(user) {
      const userStr = JSON.stringify(user);
      const request = new Request(server_url + "/users/login", Post(userStr));
      return fetch(request).then(response => {
        if (response.ok) {
          return response.json();
        }
      });
    },
    register: function(user) {
      const userStr = JSON.stringify(user);
      const request = new Request(
        server_url + "/users/register",
        Post(userStr)
      );
      return fetch(request).then(response => response.ok);
    }
  }
};

export default server;
