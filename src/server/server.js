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
				serverState.getPlayer(socket.id).setPieces(serverState.getPlayer(id).pieces);
				serverState.getPlayer(socket.id).newPiece(serverState.getPlayer(socket.id).pieces[serverState.getPlayer(socket.id).currentPiece]);
				serverState.getPlayer(socket.id).setTmpBoard();

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

			serverState.getPlayer(socket.id).newPiece(serverState.getPlayer(socket.id).pieces[serverState.getPlayer(socket.id).currentPiece]);
			serverState.getPlayer(socket.id).setTmpBoard();
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
		let player = serverState.getPlayer(socket.id);
		if (serverState.getPlayer(socket.id) && serverState.getPlayer(socket.id).getIsPlaying()) {
			board = serverState.getPlayer(socket.id).getBoard();
		}
		if (board) {
			let hasMoved = 0;
			let isTimeouting = false;
			if (player.start) {
				player.currentPiece++;
				player.start = 0;
			}
			if (!player.gameOver)
			{
				console.log(player.name)
				// TESTS MOVE SQUARE
				for (let i = 0 ; i < 10 ; i++) {
					for (let j = 0 ; j < 22 ; j++) {
						if (hasMoved < 4) {
							if (commands.up && player.board[i][j] < 0 && j - 1 >= 0 && player.board[i][j - 1] <= 0) {
								player.rotatePiece();
								hasMoved = 4;
							}
							else if (commands.down && player.board[i][j] < 0 && j + 1 < 22 && player.board[i][j + 1] <= 0) {
								player.tmpBoard[i][j + 1] = player.board[i][j];
								hasMoved++;
							}
							else if (commands.down && player.board[i][j] < 0 && (j + 1 >= 22 || player.board[i][j + 1] > 0)) {
								player.placePiece(player.board);
								player.setTmpBoard();
								hasMoved = 5;
							}
							else if (commands.left && player.board[i][j] < 0 && i - 1 >= 0 && player.board[i - 1][j] <= 0) {
								player.tmpBoard[i - 1][j] = player.board[i][j];
								hasMoved++;
							}
							else if (commands.left && player.board[i][j] < 0 && (i - 1 < 0 || player.board[i - 1][j] > 0)) {
								player.setTmpBoard();
								hasMoved = 5;
							}
							else if (commands.right && player.board[i][j] < 0 && i + 1 < 10 && player.board[i + 1][j] <= 0) {
								player.tmpBoard[i + 1][j] = player.board[i][j];
								hasMoved++;
							}
							else if (commands.right && player.board[i][j] < 0 && (i + 1 >= 10 || player.board[i + 1][j] > 0)) {
								player.setTmpBoard();
								hasMoved = 5;
							}
						}
					}
				}
				if (hasMoved === 4)
				{
					// player.board = tmpBoard;
					for (let i = 0 ; i < 10 ; i++) {
						player.board[i] = [];
						for (let j = 0 ; j < 22 ; j++) {
							player.board[i][j] = player.tmpBoard[i][j];
						}
					}
					player.setTmpBoard();
					hasMoved = 5;
				
				}
				serverState.getPlayer(socket.id).setBoard(player.board);
				serverState.getPlayer(socket.id).setTmpBoard();
			}
		}
	});
});

// SEND SERVER STATE TO CLIENTS
setInterval(function() {
	io.sockets.emit('serverState', serverState);
}, 100);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

