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
const routes = require("./routes/routes");

app.use(routes);

let serverState = new Game();

io.on("connection", (socket) => {

	// WHEN ONE PLAYER CONNECTS
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

			// CREATE A NEW SET OF 100 RANDOM PIECES FOR THE ROOM
			let prevPieceType = -1;
			for (let i = 0 ; i < 100 ; i++) {
				let newPieceType = Math.floor(Math.random() * Math.floor(7));
				while (newPieceType == prevPieceType) {
					newPieceType = Math.floor(Math.random() * Math.floor(7));
				}
				serverState.getPlayer(socket.id).addPiece(new Piece(Piece.getTypeFromInt(newPieceType)));
				prevPieceType = newPieceType;
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
						&& serverState.getPlayer(id) != serverState.getPlayer(socket.id)) {
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
});

// SEND SERVER STATE TO CLIENTS EVERY ONE SECOND
setInterval(function() {
	io.sockets.emit('serverState', serverState);
}, 1000);
  
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));