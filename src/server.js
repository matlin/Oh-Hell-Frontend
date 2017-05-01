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
        console.log(response.status);
        if (response.ok) {
          return response.json();
        }
      });
    }
  },
  user: {}
};
