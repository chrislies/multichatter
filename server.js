const http = require('http');
const WebSocket = require('ws');

const port = 8004;
const server = http.createServer(); // Initialize an HTTP server

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });
});

server.listen(port, function () {
  console.log(`Server is listening on ${port}!`);
});
