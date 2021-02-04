import React, {Component} from "react";
import socketIOClient from "socket.io-client";
const SERVERPATH = "http://127.0.0.1:4001";

class ClientComponent extends Component {
	render() {
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
	
		return (
			<div>
				<p>room name: {clientRoomName}</p>
				<p>player name: {clientPlayerName}</p>
			</div>
		);
	}
}

function checkNameAndRoomValidity(s) {
	if (s == null) {
		return "error";
	} else if (s.includes("#") || s.includes("[") || s.includes("]")) {
		return "error";
	} else {
		return s;
	}
}

export default ClientComponent;