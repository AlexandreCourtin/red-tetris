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
	const [serverState, setServerState] = useState('');
	const [htmlName, setHtmlName] = useState('');
	const [htmlRoom, setHtmlRoom] = useState('');

	// 'useEffect' FUNCTION IS USED TO UPDATE CLIENT VISUALS EVERY TIME THE EVENT 'serverState' IS RECEIVED
	useEffect(() => {
		socket.on("serverState", _serverState => {
			setServerState(_serverState);
		});
		return () => socket.disconnect();
	}, []);

	if (inGame) {

		// GAME PAGE
		let otherPlayerNames = '';
		let isLeader = '';
		let roomPieces = '';

		for (let id in serverState.players) {
			if (serverState.players[id] && serverState.players[id].room === clientRoomName && serverState.players[id].name !== clientPlayerName) {
				otherPlayerNames += serverState.players[id].name + ' ';
			} else if (serverState.players[id] && serverState.players[id].room === clientRoomName && serverState.players[id].name === clientPlayerName) {
				isLeader += serverState.players[id].isLeader;
				for (let i = 0 ; i < 100 ; i++) {
					if (serverState.players[id].pieces[i]) {
						roomPieces += serverState.players[id].pieces[i].type + ', ';
					}
				}
			}
		}

		return (
			<div>
				<p>room name: {clientRoomName}</p>
				<p>player name: {clientPlayerName}</p>
				<p>is leader of this room: {isLeader}</p>
				<p>other players in this room: {otherPlayerNames}</p>
				<p>pieces of this room: {roomPieces}</p>
			</div>
		);

	} else {

		// LOGIN PAGE
		function login() {
			window.location = '#' + htmlRoom + '[' + htmlName + ']';
			window.location.reload({forcedReload: true});
		}

		return (
			<div>
				<p>Name :</p>
				<input type="text" value={htmlName} onInput={e => setHtmlName(e.target.value)}/>
				<p>Room :</p>
				<input type="text" value={htmlRoom} onInput={e => setHtmlRoom(e.target.value)}/>
				<br /><br />
				<button onClick={login}>go</button>
			</div>
		);
	}
}

export default App;