const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const PORT = process.env.PORT || 4001;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const Game = require("./game");
const Piece = require("./piece");
const Player = require("./player");
const shuffle = require('./utils');
const routes = require("./routes/routes");

app.use(routes);

let serverState = new Game();

io.on("connection", (socket) => {

	// WHEN ONE PLAYER CONNECTS
	socket.on('new player', function(playerName, roomName) {
		let breakLoop = false;

		for (let id in serverState.getPlayers()) {
			if (serverState.getPlayer(id) && serverState.getPlayer(id).getRoom() === roomName && serverState.getPlayer(id).getIsLeader()) {
				serverState.addPlayer(socket.id, new Player(playerName, roomName, false));

				// GET THE PIECES FROM THE LEADER
				serverState.getPlayer(socket.id).setPieces(serverState.getPlayer(id).getPieces());

				console.log('[' + roomName + '] ' + playerName + ' connected');
				breakLoop = true;
				break;
			}
		}

		if (!breakLoop) {
			serverState.addPlayer(socket.id, new Player(playerName, roomName, true));

			// CREATE A NEW SET OF 200 RANDOM PIECES FOR THE ROOM
			for (let i = 0 ; i < 1000 ; i++) {
				shuffle( ['I', 'O', 'T', 'S', 'Z', 'J', 'L'] ).forEach(e => {
					serverState.getPlayer(socket.id).addPiece(new Piece(e));
				});
			}
			console.log('[' + roomName + '] ' + playerName + ' connected and created the room');
		}
	});

	// WHEN ONE PLAYER DISCONNECTS
	socket.on('disconnect', function () {
		if (serverState.getPlayer(socket.id)) {

			// IF PLAYER THAT DISCONNECTS IS THE LEADER
			// PASS LEADERSHIP TO OTHER PLAYER
			if (serverState.getPlayer(socket.id).getIsLeader()) {
				for (let id in serverState.getPlayers()) {
					if (serverState.getPlayer(id) && serverState.getPlayer(id).getRoom() === serverState.getPlayer(socket.id).getRoom()
						&& serverState.getPlayer(id) != serverState.getPlayer(socket.id) && serverState.getPlayer(id).getName().length > 0) {
						serverState.getPlayer(id).setIsLeader(true);
						console.log('[' + serverState.getPlayer(id).getRoom() + '] New leader: ' + serverState.getPlayer(id).getName());
						break;
					}
				}
			}

			console.log('[' + serverState.getPlayer(socket.id).getRoom() + '] ' + serverState.getPlayer(socket.id).getName() + ' disconnected');
			serverState.removePlayer(socket.id);
		}
	});

	socket.on('launch game', function(roomName) {
		console.log('[' + roomName + '] Game launched !');
		for (let id in serverState.getPlayers()) {
			if (serverState.getPlayer(id) && serverState.getPlayer(id).getRoom() === roomName) {
				serverState.getPlayer(id).setIsPlaying(true);
			}
		}
	});

	socket.on('commands', function(playerName, commands) {
		if (commands.up) {
			console.log(playerName + ' = ' + commands.up);
		}
	});
});

// SEND SERVER STATE TO CLIENTS
setInterval(function() {
	io.sockets.emit('serverState', serverState);
}, 1000 / 60);
  
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));