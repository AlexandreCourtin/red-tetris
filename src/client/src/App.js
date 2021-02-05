import React, {useEffect, useState} from "react";
import socketIOClient from "socket.io-client";

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

socket.emit('new player', clientPlayerName, clientRoomName);

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
	const [response, setResponse] = useState("");

	useEffect(() => {
		socket.on("serverState", serverState => {
			setResponse(serverState);
		});
		return () => socket.disconnect();
	}, []);
	
	let otherPlayerNames = '';

	for (let id in response.players) {
		if (response.players[id] && response.players[id].room === clientRoomName) {
			otherPlayerNames += response.players[id].name + ' ';
		}
	}

	return (
		<div>
			<p>room name: {clientRoomName}</p>
			<p>player name: {clientPlayerName}</p>
			<p>other players in this room: {otherPlayerNames}</p>
		</div>
	);
}

export default App;