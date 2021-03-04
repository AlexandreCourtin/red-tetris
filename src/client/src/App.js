import React, {useEffect, useState} from "react";
import socketIOClient from "socket.io-client";
import LoginPage from "./components/loginPage";
import { getInputs, setNextPieceType, getNextPieceNumber } from './utils/input';
import "./style.css";

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

document.body.style.overflow = 'hidden';

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

				clientBoard = serverState.players[id].board;

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
					<p className="white-text">SERVER IS NOT RUNNING</p>
				</div>
			);
		} else if (isLeader === 'true' && isPlaying === 'false') {
			playState.push(<button key={'leadLaunchButton'} onClick={leadLaunchGame}>start game</button>);
		} else if (isPlaying === 'true') {

			// TETRIS GAME HERE

			// DRAW TETRIS
			const ColoredBox = ({ color }) => (
				<div className="game-colored-box" style={{
					backgroundColor: color
				}}/>
			);

			const ColoredBoxOther = ({ color }) => (
				<div className="game-colored-box-other" style={{
					backgroundColor: color
				}}/>
			);

			const TetrisGridOther = ({ board }) => {

				let tetrisColumn = [];
				for (let i = 0 ; i < 20 ; i++) {
					let tetrisRow = [];
					for (let j = 0 ; j < 10 ; j++) {
						let boxColor;

						if (board[j][i] === 0) boxColor = '#9bbc0f';
						else boxColor = '#306230';
						
						tetrisRow.push(<td key={'uniqueBox' + i + '' + j}><ColoredBoxOther color={boxColor} /></td>);
					}
					tetrisColumn.push(<tr key={'uniqueRow' + i}>{tetrisRow}</tr>);
				}

				return (
					<table className="game-tetris-board">
						<tbody>{tetrisColumn}</tbody>
					</table>
				);
			}

			const TetrisGrid = ({ board }) => {

				let tetrisColumn = [];
				for (let i = 2 ; i < 22 ; i++) {
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
					<div className="game-tetris-board">
						<tbody>{tetrisColumn}</tbody>
					</div>
				);
			}

			playState.push(<div className="game-main-board" key={'playerboard-div'}><TetrisGrid key={'playerBoard'} board={clientBoard} /></div>);

			let otherBardsState = [];
			for (let i = 0 ; i < otherPlayerBoards.length ; i++) {
				otherBardsState.push(
					<div key={'otherBoard ' + i}>
						<p className="game-other-name">{otherPlayerNames[i]}</p>
						<div className="game-other-board"><TetrisGridOther board={otherPlayerBoards[i]} /></div>
					</div>
				);
			}
			playState.push(<div className="game-other-boards" key={'otherBoard gen'}>{otherBardsState}</div>);
		}

		return (
			<div>
				<p className="white-text">room name: {clientRoomName}</p>
				<p className="white-text">player name: {clientPlayerName}</p>
				<p className="white-text">is leader of this room: {isLeader}</p>
				<p className="white-text">other players in this room: {otherPlayerNames}</p>
				<p className="white-text">preview of the pieces of this room: {previewRoomPieces}</p>
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

// SEND CLIENT COMMANDS TO SERVER
setInterval(function() {
	socket.emit('commands', getInputs());
}, 500);

export default App;