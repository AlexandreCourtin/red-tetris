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
				serverState.addPlayer(socket.id, new Player(socket.id, playerName, roomName, false));

				// GET THE PIECES FROM THE LEADER
				serverState.getPlayer(socket.id).setPieces(serverState.getPlayer(id).getPieces());

				console.log('[' + roomName + '] ' + playerName + ' connected');
				breakLoop = true;
				break;
			}
		}

		if (!breakLoop) {
			serverState.addPlayer(socket.id, new Player(socket.id, playerName, roomName, true));

			// CREATE A NEW SET OF 7000 RANDOM PIECES FOR THE ROOM
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

	// RECEIVED WHEN LEADER LAUNCH GAME
	socket.on('launch game', function(roomName) {
		console.log('[' + roomName + '] Game launched !');
		for (let id in serverState.getPlayers()) {
			if (serverState.getPlayer(id) && serverState.getPlayer(id).getRoom() === roomName) {
				serverState.getPlayer(id).setIsPlaying(true);
			}
		}
	});

	// RECEIVED WHEN CLIENT SENDS COMMANDS
	socket.on('commands', function(commands) {
		let board;
		if (serverState.getPlayer(socket.id) && serverState.getPlayer(socket.id).getIsPlaying()) {
			board = serverState.getPlayer(socket.id).getBoard();
		}
		if (board) {
			let hasMoved = false;
			let movVer = commands.up * -1 + commands.down * 1;
			let movHor = commands.left * -1 + commands.right * 1;

			// TESTS MOVE SQUARE
			let i = 0;
			while (i < 10 && hasMoved == false) {
				let j = 0;
				while (j < 20 && hasMoved == false) {
					if (hasMoved === false) {
						if (board[i][j] === 1 && movVer !== 0 && j + movVer >= 0 && j + movVer < 20) {
							board[i][j] = 0;
							board[i][j + movVer] = 1;
							hasMoved = true;
						}
						if (board[i][j] === 1 && movHor !== 0 && i + movHor >= 0 && i + movHor < 10) {
							board[i][j] = 0;
							board[i + movHor][j] = 1;
							hasMoved = true;
						}
					}
					j++;
				}
				i++;
			}
			serverState.getPlayer(socket.id).setBoard(board);
		}
	});
});

// SEND SERVER STATE TO CLIENTS
setInterval(function() {
	io.sockets.emit('serverState', serverState);
}, 500);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));