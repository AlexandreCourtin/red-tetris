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
	console.log(commands.down);
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

document.addEventListener('keyup', function(event) {
	switch (event.key) {
		default:
			break;
		case 'a':
			commands.left = false;
			break;
		case 'w':
			commands.up = false;
			break;
		case 'd':
			commands.right = false;
			break;
		case 's':
			commands.down = false;
			break;
		case 'ArrowLeft':
			commands.left = false;
			break;
		case 'ArrowUp':
			commands.up = false;
			break;
		case 'ArrowRight':
			commands.right = false;
			break;
		case 'ArrowDown':
			commands.down = false;
			break;
		case 'Space':
			commands.space = false;
			break;
	}
});
