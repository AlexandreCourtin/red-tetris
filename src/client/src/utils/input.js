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

<<<<<<< HEAD
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

=======
let tmpBoard = [];

for (let i = 0 ; i < 10 ; i++) {
	tmpBoard[i] = [];
	for (let j = 0 ; j < 20 ; j++) {
		if (clientBoard >= 0)
			tmpBoard[i][j] = clientBoard[i][j];
		else
			tmpBoard[i][j] = 0;
	}
}

setPiece(3);
function setPiece(i) {
	switch (i) {
			default:
				clientBoard[4][1] = -i;
				clientBoard[4][2] = -i;
				clientBoard[4][3] = -i;
				clientBoard[4][4] = -i;
				break;
			case 2:
				clientBoard[4][1] = -i;
				clientBoard[5][1] = -i;
				clientBoard[4][2] = -i;
				clientBoard[5][2] = -i;
				break;
			case 3:
				clientBoard[4][1] = -i;
				clientBoard[5][1] = -i;
				clientBoard[6][1] = -i;
				clientBoard[5][2] = -i;
				break;
			case 4:
				clientBoard[4][1] = -i;
				clientBoard[5][1] = -i;
				clientBoard[4][2] = -i;
				clientBoard[3][2] = -i;
				break;
			case 5:
				clientBoard[4][1] = -i;
				clientBoard[5][1] = -i;
				clientBoard[5][2] = -i;
				clientBoard[6][2] = -i;
				break;
			case 6:
				clientBoard[4][1] = -i;
				clientBoard[4][2] = -i;
				clientBoard[4][3] = -i;
				clientBoard[3][3] = -i;
				break;
			case 7:
				clientBoard[4][1] = -i;
				clientBoard[4][2] = -i;
				clientBoard[4][3] = -i;
				clientBoard[5][3] = -i;
				break;
		}
}

let hasMoved = 0;
let isTimeouting = false;
export function getClientBoard() {
	getInputs();

	// TESTS MOVE SQUARE
	for (let i = 0 ; i < 10 ; i++) {
		for (let j = 0 ; j < 20 ; j++) {
			if (hasMoved < 4) {
				if (clientBoard[i][j] < 0 && j - 1 >= 0 && commands.up) {
					tmpBoard[i][j - 1] = clientBoard[i][j];
					console.log('up');
					clientBoard[i][j] = 0;
					hasMoved++;
				}
				else if (clientBoard[i][j] < 0 && j + 1 < 20 && commands.down) {
					tmpBoard[i][j + 1] = clientBoard[i][j];
					console.log('down');
					clientBoard[i][j] = 0;
					hasMoved++;
				}
				else if (clientBoard[i][j] < 0 && i - 1 >= 0 && commands.left) {
					tmpBoard[i - 1][j] = clientBoard[i][j];
					console.log('left');
					clientBoard[i][j] = 0;
					hasMoved++;
				}
				else if (clientBoard[i][j] < 0 && i + 1 < 10 && commands.right) {
					tmpBoard[i + 1][j] = clientBoard[i][j];
					console.log('right');
					clientBoard[i][j] = 0;
					hasMoved++;
				}
			}
		}
	}
	if (hasMoved === 4)
	{
		// clientBoard = tmpBoard;
		for (let i = 0 ; i < 10 ; i++) {
			clientBoard[i] = [];
			for (let j = 0 ; j < 20 ; j++) {
				clientBoard[i][j] = tmpBoard[i][j];
			}
		}		
		for (let i = 0 ; i < 10 ; i++) {
			tmpBoard[i] = [];
			for (let j = 0 ; j < 20 ; j++) {
				if (clientBoard >= 0)
					tmpBoard[i][j] = clientBoard[i][j];
				else
					tmpBoard[i][j] = 0;
			}
		}
		hasMoved = 5;
	}
	if (isTimeouting === false) {
		setTimeout(resetHasMoved, 100);
		isTimeouting = true;
	}

	return clientBoard;
}

function resetHasMoved() {
	hasMoved = 0;
	isTimeouting = false;
}
>>>>>>> on peut bouger les pieces avec les fleches
