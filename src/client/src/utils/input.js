let command = {
	up: false,
	down: false,
	left: false,
	right: false,
	space: false,
}

export default function getInputs() {
	document.addEventListener('keydown', function(event) {
		switch (event.key) {
			default:
				break;
			case 'a':
				command.left = true;
				break;
			case 'w':
				command.up = true;
				break;
			case 'd':
				command.right = true;
				break;
			case 's':
				command.down = true;
				break;
			case 'ArrowLeft':
				command.left = true;
				break;
			case 'ArrowUp':
				command.up = true;
				break;
			case 'ArrowRight':
				command.right = true;
				break;
			case 'ArrowDown':
				command.down = true;
				break;
			case 'Space':
				command.space = true;
				break;
		}
	});

	document.addEventListener('keyup', function(event) {
		switch (event.key) {
			default:
				break;
			case 'a':
				command.left = false;
				break;
			case 'w':
				command.up = false;
				break;
			case 'd':
				command.right = false;
				break;
			case 's':
				command.down = false;
				break;
			case 'ArrowLeft':
				command.left = false;
				break;
			case 'ArrowUp':
				command.up = false;
				break;
			case 'ArrowRight':
				command.right = false;
				break;
			case 'ArrowDown':
				command.down = false;
				break;
			case 'Space':
				command.space = false;
				break;
		}
	});

	return command;
}