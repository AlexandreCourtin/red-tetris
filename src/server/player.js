class Player {
	socketId;
	name = 'defaultPlayer';
	room = 'defaultRoom';
	isLeader = false;
	isPlaying = false;
	pieces = [];
	currentPiece = 0;

	// board[x][y] = x Horizontal | y Vertical
	board = [];

	constructor(socketId, name, room, isLeader) {
		this.socketId = socketId;
		this.name = name;
		this.room = room;
		this.isLeader = isLeader;

		for (let i = 0 ; i < 10 ; i++) {
			this.board[i] = [];
			for (let j = 0 ; j < 20 ; j++) {
				this.board[i][j] = 0;
			}
		}

		this.setPiece(this.currentPiece);
	}

	getName() {
		return this.name;
	}

	getRoom() {
		return this.room;
	}

	setIsLeader(b) {
		this.isLeader = b;
	}

	getIsLeader() {
		return this.isLeader;
	}

	setIsPlaying(b) {
		this.isPlaying = b;
	}

	getIsPlaying() {
		return this.isPlaying;
	}

	addPiece(p) {
		this.pieces.push(p);
	}

	setPieces(p) {
		this.pieces = p;
	}

	getPiece(n) {
		return this.pieces[n];
	}

	getPieces() {
		return this.pieces;
	}

	setBoardAt(i, j, n) {
		this.board[i][j] = n;
	}

	getBoardAt(i, j) {
		return this.board[i][j];
	}

	setBoard(a) {
		this.board = a;
	}

	getBoard() {
		return this.board;
	}

	setPiece(i) {
		switch (i) {
			default:
				this.board[4][1] = -i;
				this.board[4][2] = -i;
				this.board[4][3] = -i;
				this.board[4][4] = -i;
				break;
			case "O":
				this.board[4][1] = -i;
				this.board[5][1] = -i;
				this.board[4][2] = -i;
				this.board[5][2] = -i;
				break;
			case "T":
				this.board[4][1] = -i;
				this.board[5][1] = -i;
				this.board[6][1] = -i;
				this.board[5][2] = -i;
				break;
			case "S":
				this.board[4][1] = -i;
				this.board[5][1] = -i;
				this.board[4][2] = -i;
				this.board[3][2] = -i;
				break;
			case "Z":
				this.board[4][1] = -i;
				this.board[5][1] = -i;
				this.board[5][2] = -i;
				this.board[6][2] = -i;
				break;
			case "J":
				this.board[4][1] = -i;
				this.board[4][2] = -i;
				this.board[4][3] = -i;
				this.board[3][3] = -i;
				break;
			case "L":
				this.board[4][1] = -i;
				this.board[4][2] = -i;
				this.board[4][3] = -i;
				this.board[5][3] = -i;
				break;
		}
	}
}

module.exports = Player;