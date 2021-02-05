const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const PORT = process.env.PORT || 4001;

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
		let breakLoop = false;

		for (let id in serverState.getPlayers()) {
			if (serverState.getPlayer(id) && serverState.getPlayer(id).getRoom() === roomName) {
				serverState.addPlayer(socket.id, new Player(playerName, roomName, false));
				console.log('[' + roomName + '] ' + playerName + ' connected');
				breakLoop = true;
				break;
			}
		}

		if (!breakLoop) {
			serverState.addPlayer(socket.id, new Player(playerName, roomName, true));
			console.log('[' + roomName + '] ' + playerName + ' created the room');
		}
	});

	socket.on('disconnect', function () { // CHECK IF LEADER DISCONNECT GIVE LEADERSHIP TO OTHER PLAYER IN ROOM
		if (serverState.getPlayer(socket.id)) {
			console.log('[' + serverState.getPlayer(socket.id).getRoom() + '] ' + serverState.getPlayer(socket.id).getName() + ' disconnected');
			serverState.removePlayer(socket.id);
		}
	});
});

setInterval(function() {
	io.sockets.emit('serverState', serverState);
}, 1000);
  
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));