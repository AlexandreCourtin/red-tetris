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

function checkNameAndRoomValidity(s) {
	if (s == null) {
		return '';
	} else if (s.includes("#") || s.includes("[") || s.includes("]")) {
		return '';
	} else {
		return s;
	}
}

let inGame = false;

if (clientRoomName.length > 0 && clientPlayerName.length > 0) {
	socket.emit('new player', clientPlayerName, clientRoomName);
	inGame = true;
}

function App() {
	const [response, setResponse] = useState("");

	// 'useEffect' FUNCTION IS USED TO UPDATE CLIENT VISUALS EVERY TIME THE EVENT 'serverState' IS RECEIVED
	useEffect(() => {
		socket.on("serverState", serverState => {
			setResponse(serverState);
		});
		return () => socket.disconnect();
	}, []);

	if (inGame) {

		// GAME PAGE
		let otherPlayerNames = '';
		let isLeader = '';

		for (let id in response.players) {
			if (response.players[id] && response.players[id].room === clientRoomName && response.players[id].name !== clientPlayerName) {
				otherPlayerNames += response.players[id].name + ' ';
			} else if (response.players[id] && response.players[id].room === clientRoomName && response.players[id].name === clientPlayerName) {
				isLeader += response.players[id].isLeader;
			}
		}

		return (
			<div>
				<p>room name: {clientRoomName}</p>
				<p>player name: {clientPlayerName}</p>
				<p>is leader of this room: {isLeader}</p>
				<p>other players in this room: {otherPlayerNames}</p>
			</div>
		);
	} else {

		// LOGIN PAGE

		// function login() {
		// 	console.log(name);
		// }

		return (
			<div>
				<p>Name :</p>
				<input type="text" name="htmlName"/>
				<p>Room :</p>
				<input type="text" name="htmlRoom"/>
				<br /><br />
				<button onClick={() => {
					window.location = '#ayaa[lolo]';
					window.location.reload({forcedReload: true});
				}}>go</button>
			</div>
		);
	}
}

export default App;