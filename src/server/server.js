const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const routes = require("./routes/routes");

const app = express();
app.use(routes);

const server = http.createServer(app);

const io = socketIo(server);

let serverState = {
	players: {},
};

io.on("connection", (socket) => {
	socket.on('new player', function(playerName, roomName) {
		serverState.players[socket.id] = {
			name: playerName,
			room: roomName,
		};
		console.log('#' + roomName + '[' + playerName + '] connected');
	});

	socket.on('disconnect', function () {
		if (serverState.players[socket.id]) {
			console.log('#' + serverState.players[socket.id].room + '[' + serverState.players[socket.id].name + '] disconnected');
			serverState.players[socket.id] = null;
		}
	});
});

setInterval(function() {
	io.sockets.emit('serverState', serverState);
}, 1000);
  
server.listen(port, () => console.log(`Listening on port ${port}`));