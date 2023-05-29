import WebSocket, { WebSocketServer } from "ws";

// const wss = new WebSocketServer(
//   {
//     port: 5000,
//   },
//   () => {
//     console.log("Server Started on PORT - 5000");
//   }
// );

// wss.on("connection", function connection(ws) {
//   console.log('USER CONNECTED')
//   ws.on("message", function (message) {
//     message = JSON.parse(message);
//     switch (message.event) {
//       case "message":
//         broadcastMessage(message);
//         break;
//       case "connection":
//         broadcastMessage(message);
//         break;
//     }
//   });
// });

// function broadcastMessage(message, id) {
//   wss.clients.forEach((client) => {
//     client.send(JSON.stringify(message));
//   });
// }

const wss = new WebSocketServer(
  {
    port: 5000,
  },
  () => console.log("Сервер подключен на порту - 5000")
);

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    message = JSON.parse(message);
    switch (message.event) {
      case "connection":
        broadcastMessage(message);
        break;
      case "message":
        broadcastMessage(message);
        break;
    }
  });
});

let broadcastMessage = (message) => {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
};
