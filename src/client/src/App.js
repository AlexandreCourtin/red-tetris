import React, {useEffect, useState} from "react";
import socketIOClient from "socket.io-client";
import LoginPage from "./components/loginPage";

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
		let isPlaying = '';
		let roomPieces = '';
		let playerBoard;

		for (let id in serverState.players) {
			if (serverState.players[id] && serverState.players[id].room === clientRoomName
				&& serverState.players[id].name !== clientPlayerName) {

				otherPlayerNames += serverState.players[id].name + ' ';

			} else if (serverState.players[id] && serverState.players[id].room === clientRoomName
				&& serverState.players[id].name === clientPlayerName) {

				isLeader = '' + serverState.players[id].isLeader;
				isPlaying = '' + serverState.players[id].isPlaying;
				playerBoard = serverState.players[id].board;

				roomPieces = '';
				for (let i = 0 ; i < 200 ; i++) {
					if (serverState.players[id].pieces[i]) {
						roomPieces += serverState.players[id].pieces[i].type + ', ';
					}
				}
			}
		}

		function leadLaunchGame() {
			socket.emit('launch game', clientRoomName);
		}

		let playState;

		if (isLeader === '') {
			return (
				<div>
					<p>SERVER IS NOT RUNNING</p>
				</div>
			);
		} else if (isLeader === 'true' && isPlaying === 'false') {
			playState = <button onClick={leadLaunchGame}>start game</button>;
		} else if (isPlaying === 'true') {

			// TETRIS GAME HERE

			const ColoredBox = ({ color }) => (
				<div style={{
					backgroundColor: color,
					height: 20,
					width: 20
				}}/>
			);

			const TetrisGrid = ({ board }) => {

				let tetrisColumn = [];
				for (let i = 0 ; i < 20 ; i++) {
					let tetrisRow = [];
					for (let j = 0 ; j < 10 ; j++) {
						let boxColor;

						if (board[j][i] === 0) boxColor = '#9bbc0f';
						else boxColor = '#306230';

						tetrisRow.push(<td key={'uniqueBox' + i + '' + j}><ColoredBox color={boxColor} /></td>);
					}
					tetrisColumn.push(<tr key={'uniqueRow' + i}>{tetrisRow}</tr>);
				}

				return (
					<table style={{borderSpacing: 0}}>
						<tbody>{tetrisColumn}</tbody>
					</table>
				);
			}

			playState = <TetrisGrid board={playerBoard} />;
		}

		return (
			<div>
				<p>room name: {clientRoomName}</p>
				<p>player name: {clientPlayerName}</p>
				<p>is leader of this room: {isLeader}</p>
				<p>other players in this room: {otherPlayerNames}</p>
				<p>pieces of this room: {roomPieces}</p>
				{playState}
			</div>
		);

	} else {

		// LOGIN PAGE
		return (
			<LoginPage />
		);
	}
}

export default App;