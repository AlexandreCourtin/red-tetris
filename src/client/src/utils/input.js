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

export function getInputs() {
	return commands;
}

document.addEventListener('keydown', function(event) {
	switch (event.key) {
		default:
			break;
		case 'a':
			commands.left = true;
			break;
		case 'w':
			commands.up = true;
			break;
		case 'd':
			commands.right = true;
			break;
		case 's':
			commands.down = true;
			break;
		case 'ArrowLeft':
			commands.left = true;
			break;
		case 'ArrowUp':
			commands.up = true;
			break;
		case 'ArrowRight':
			commands.right = true;
			break;
		case 'ArrowDown':
			commands.down = true;
			break;
		case 'Space':
			commands.space = true;
			break;
	}
});

