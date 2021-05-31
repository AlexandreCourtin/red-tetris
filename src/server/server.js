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
		let placed = 0;
		let t = 0;
		let player = serverState.getPlayer(socket.id);
		if (serverState.getPlayer(socket.id) && serverState.getPlayer(socket.id).getIsPlaying()) {
			board = serverState.getPlayer(socket.id).getBoard();
		}
		if (board) {
			let hasMoved = 0;
			let isTimeouting = false;
			if (player.start) {
				player.start = 0;
			}
			if (!player.gameOver)
			{
				console.log(player.name)
				// TESTS MOVE SQUARE
				for (let j = 0 ; j < 22 && !placed; j++) {
					for (let i = 0 ; i < 10 && !placed; i++) {
						t = player.board[i][j];
						if (commands.up && t < 0) {
							player.rotatePiece();
							placed = 1;
						}
						else if (commands.down && t < 0) {
							player.setPiece(i, j, 0);
							if (player.setPiece(i, j + 1, 1) > 0)
							{
								player.setPiece(i, j, 1);
								player.placePiece(player.board);
								nb_cleared_lines = player.checkLines()
								console.log("place pieces", nb_cleared_lines);
								if (nb_cleared_lines > 0)
								{
									player.cleanLines();
									player.completedLines += nb_cleared_lines;
									player.level = 1 + player.completedLines / 10;
									serverState.updateLevel();
									console.log(player.completedLines, player.level, serverState.level);
								}
							}
							placed = 1;
						}
						else if (commands.space && t < 0)
						{
							player.hardDrop(i, j);
							nb_cleared_lines = player.checkLines()
							console.log("place pieces", nb_cleared_lines);
							if (nb_cleared_lines > 0)
							{
								player.cleanLines();
								player.completedLines += nb_cleared_lines;
								player.level = 1 + player.completedLines / 10;
								serverState.updateLevel();
								console.log(player.completedLines, player.level, serverState.level);
							}
							placed = 1;
						}
						else if (commands.left && t < 0) {
							player.setPiece(i, j, 0);
							if (player.setPiece(i - 1, j, 1) > 0)
								player.setPiece(i, j, 1);
							placed = 1;
						}
						else if (commands.right && t < 0) {
							player.setPiece(i, j, 0);
							if (player.setPiece(i + 1, j, 1) > 0)
								player.setPiece(i, j, 1);
							placed = 1;
						}
					}
				}
				placed = 0;
				player.setBoard(player.board);
			}
		}
	});
});

// SEND SERVER STATE TO CLIENTS
setInterval(function() {
	io.sockets.emit('serverState', serverState);
}, 100);

// SEND SERVER STATE TO CLIENTS

function gravity(){
	let placed = 0;
	let t = 0;
	let nb_cleared_lines = 0;
	console.log(serverState.level);
	if (serverState) {
		for (let id in serverState.getPlayers()) {
			const player = serverState.getPlayer(id);
			if (player && player.getIsPlaying()) {
				let hasMoved = 0;
				if (player.start) {
					player.start = 0;
				}
				if (!player.gameOver) {
					for (let j = 0 ; j < 22 && !placed; j++) {
						for (let i = 0 ; i < 10 && !placed; i++) {
							t = player.board[i][j];
							if (t < 0) {
								player.setPiece(i, j, 0);
								if (player.setPiece(i, j + 1, 1) > 0)
								{
									player.setPiece(i, j, 1);
									player.placePiece(player.board);
									nb_cleared_lines = player.checkLines()
									if (nb_cleared_lines > 0)
									{
										player.cleanLines();
										player.completedLines += nb_cleared_lines;
										player.level = 1 + player.completedLines / 10;
										serverState.updateLevel();
										console.log(player.completedLines, player.level, serverState.level);
									}
								}
								placed = 1;
							}
						}
					}
					placed = 0;
					player.setBoard(player.board);
				}
			}
		}
	}
}

(function repeat() {
    gravity();
    setTimeout(repeat, 1000 * (0.8 - ((serverState.level - 1) * 0.007))**(serverState.level - 1) );
})();

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

