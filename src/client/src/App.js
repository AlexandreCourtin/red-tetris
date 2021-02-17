import React, {useEffect, useState} from "react";
import socketIOClient from "socket.io-client";
import LoginPage from "./components/loginPage";
import { getClientBoard, setNextPieceType, getNextPieceNumber } from './utils/input';
import "./loginPage.css";

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
let clientBoard;

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

		let otherPlayerNames = [];
		let otherPlayerBoards = [];
		let isLeader = '';
		let isPlaying = '';
		let roomPieces = '';
		let previewRoomPieces = '';

		for (let id in serverState.players) {
			if (serverState.players[id] && serverState.players[id].room === clientRoomName
				&& serverState.players[id].name !== clientPlayerName) {

				otherPlayerNames.push(serverState.players[id].name);

				if (serverState.players[id].board !== null) {
					otherPlayerBoards.push(serverState.players[id].board);
				}

			} else if (serverState.players[id] && serverState.players[id].room === clientRoomName
				&& serverState.players[id].name === clientPlayerName) {

				isLeader = '' + serverState.players[id].isLeader;
				isPlaying = '' + serverState.players[id].isPlaying;

				roomPieces = '';
				previewRoomPieces = '';

				setNextPieceType(serverState.players[id].pieces[getNextPieceNumber()]);
				for (let i = 0 ; i < 7000 ; i++) {
					if (serverState.players[id].pieces[i]) {
						roomPieces += serverState.players[id].pieces[i].type + ', ';

						if (i === 50) {
							previewRoomPieces = roomPieces;
						}
					}
				}
			}
		}

		function leadLaunchGame() {
			socket.emit('launch game', clientRoomName);
		}

		let playState = [];

		if (isLeader === '') {
			return (
				<div>
					<p>SERVER IS NOT RUNNING</p>
				</div>
			);
		} else if (isLeader === 'true' && isPlaying === 'false') {
			playState.push(<button key={'leadLaunchButton'} onClick={leadLaunchGame}>start game</button>);
		} else if (isPlaying === 'true') {

			// TETRIS GAME HERE

			// DRAW TETRIS
			const ColoredBox = ({ color, size }) => (
				<div style={{
					backgroundColor: color,
					height: size,
					width: size
				}}/>
			);

			const TetrisGrid = ({ board, size }) => {

				let tetrisColumn = [];
				for (let i = 0 ; i < 20 ; i++) {
					let tetrisRow = [];
					for (let j = 0 ; j < 10 ; j++) {
						let boxColor;

						if (board[j][i] === 0) boxColor = '#9bbc0f';
						else boxColor = '#306230';
						
						tetrisRow.push(<td key={'uniqueBox' + i + '' + j}><ColoredBox color={boxColor} size={size} /></td>);
					}
					tetrisColumn.push(<tr key={'uniqueRow' + i}>{tetrisRow}</tr>);
				}

				return (
					<table style={{borderSpacing: 0}}>
						<tbody>{tetrisColumn}</tbody>
					</table>
				);
			}

			clientBoard = getClientBoard();
			playState.push(<TetrisGrid key={'playerBoard'} board={clientBoard} size={20} />);

			for (let i = 0 ; i < otherPlayerBoards.length ; i++) {
				playState.push(
					<div key={'otherBoard ' + i}>
						<p>{otherPlayerNames[i]}</p>
						<TetrisGrid board={otherPlayerBoards[i]} size={10} />
					</div>
				);
			}
		}

		return (
			<div>
				<p>room name: {clientRoomName}</p>
				<p>player name: {clientPlayerName}</p>
				<p>is leader of this room: {isLeader}</p>
				<p>other players in this room: {otherPlayerNames}</p>
				<p>preview of the pieces of this room: {previewRoomPieces}</p>
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

// SEND CLIENT BOARD TO SERVER
setInterval(function() {
	socket.emit('client board', clientPlayerName, clientRoomName, clientBoard);
}, 500);

export default App;