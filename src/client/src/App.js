import React from "react";
import socketIOClient from "socket.io-client";
import ClientComponent from "./ClientComponent";

const SERVERPATH = "http://127.0.0.1:4001";

const socket = socketIOClient(SERVERPATH);

const clientRoomName = checkNameAndRoomValidity(window.location.hash.substring(
	window.location.hash.lastIndexOf("#") + 1,
	window.location.hash.lastIndexOf("[")
));

const clientPlayerName = checkNameAndRoomValidity(window.location.hash.substring(
	window.location.hash.lastIndexOf("[") + 1,
	window.location.hash.lastIndexOf("]")
));

let serverState;

socket.emit('new player', clientPlayerName, clientRoomName);

socket.on('serverState', function (ss) {
	serverState = ss;
	console.log(serverState);
});

function checkNameAndRoomValidity(s) {
	if (s == null) {
		return "error";
	} else if (s.includes("#") || s.includes("[") || s.includes("]")) {
		return "error";
	} else {
		return s;
	}
}

function App() {
	return (
		<>
			<ClientComponent clientRoomName={clientRoomName} clientPlayerName={clientPlayerName}/>
		</>
	);
}

export default App;