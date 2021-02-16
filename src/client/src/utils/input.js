let commands = {
	up: false,
	down: false,
	left: false,
	right: false,
	space: false,
}

export function getInputs() {
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

	return commands;
}

let clientBoard = [];

for (let i = 0 ; i < 10 ; i++) {
	clientBoard[i] = [];
	for (let j = 0 ; j < 20 ; j++) {
		clientBoard[i][j] = 0;
	}
}

clientBoard[5][10] = 1;

let hasMoved = false;
let isTimeouting = false;
export function getClientBoard() {
	getInputs();

	// TESTS MOVE SQUARE
	for (let i = 0 ; i < 10 ; i++) {
		for (let j = 0 ; j < 20 ; j++) {
			if (hasMoved === false) {
				if (clientBoard[i][j] === 1 && j - 1 >= 0 && commands.up) {
					clientBoard[i][j] = 0;
					clientBoard[i][j - 1] = 1;
					hasMoved = true;
				}
				if (clientBoard[i][j] === 1 && j + 1 < 20 && commands.down) {
					clientBoard[i][j] = 0;
					clientBoard[i][j + 1] = 1;
					hasMoved = true;
				}
			}
			if (hasMoved === false) {
				if (clientBoard[i][j] === 1 && i - 1 >= 0 && commands.left) {
					clientBoard[i][j] = 0;
					clientBoard[i - 1][j] = 1;
					hasMoved = true;
				}
				if (clientBoard[i][j] === 1 && i + 1 < 10 && commands.right) {
					clientBoard[i][j] = 0;
					clientBoard[i + 1][j] = 1;
					hasMoved = true;
				}
			}
		}
	}
	if (isTimeouting === false) {
		setTimeout(resetHasMoved, 100);
		isTimeouting = true;
	}

	return clientBoard;
}

function resetHasMoved() {
	hasMoved = false;
	isTimeouting = false;
}