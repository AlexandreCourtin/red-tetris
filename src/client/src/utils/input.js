import { socket} from '../App';

let commands = {
	up: false,
	down: false,
	left: false,
	right: false,
	space: false,
}

let nextPieceType = '';
let nextPieceNumber = 0;

export function setNextPieceType(p) {
 	nextPieceType = p;
}

export function getNextPieceNumber() {
	return nextPieceNumber;
}

let commandPressed = false;
let intervalId;

function emitCommands() {
	socket.emit('commands', commands);
	if (intervalId == null) {
		intervalId = setInterval(function() {
			commandPressed = false;
			commands.left = false;
			commands.up = false;
			commands.right = false;
			commands.down = false;
		}, 25);
	}
}
document.addEventListener('keydown', function(event) {
	if (commandPressed === false) {
		commandPressed = true;
		if (commands.left === false && (event.key === 'a' || event.key === 'ArrowLeft')) {
			commands.left = true;
			emitCommands();
		} else if (commands.right === false && (event.key === 'd' || event.key === 'ArrowRight')) {
			commands.right = true;
			emitCommands();
		} else if (commands.down === false && (event.key === 's' || event.key === 'ArrowDown')) {
			commands.down = true;
			emitCommands();
		} else if (commands.up === false && (event.key === 'w' || event.key === 'ArrowUp')) {
			commands.up = true;
			emitCommands();
		} else if (commands.space === false && event.key === ' ') {
			commands.space = true;
			emitCommands();
		}
	}
});

document.addEventListener('keyup', function(event) {
	if (commands.space == true && event.key == ' ')
	{
		commands.space = false;
		emitCommands();
	}
})