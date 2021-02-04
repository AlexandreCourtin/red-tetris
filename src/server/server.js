const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const Game = require("./game");
const Player = require("./player");
const routes = require("./routes/routes");

app.use(routes);

let serverState = new Game();

io.on("connection", (socket) => {
	socket.on('new player', function(playerName, roomName) {
		serverState.addPlayer(socket.id, new Player(playerName, roomName));
		console.log('[' + roomName + '] ' + playerName + ' connected');
	});

	socket.on('disconnect', function () {
		if (serverState.getPlayer(socket.id)) {
			console.log('[' + serverState.getPlayer(socket.id).room + '] ' + serverState.getPlayer(socket.id).name + ' disconnected');
			serverState.removePlayer(socket.id);
		}
	});
});

setInterval(function() {
	io.sockets.emit('serverState', serverState);
}, 1000);
  
server.listen(port, () => console.log(`Listening on port ${port}`));