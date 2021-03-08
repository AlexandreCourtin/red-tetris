class Player {
	socketId;
	name = 'defaultPlayer';
	room = 'defaultRoom';
	isLeader = false;
	isPlaying = false;
	pieces = [];
	currentPiece = 0;
	currentRotation = 0;
	gameOver = 0;
	start = 1;

	// board[x][y] = x Horizontal | y Vertical
	board = [];
	tmpBoard = [];

	constructor(socketId, name, room, isLeader) {
		this.socketId = socketId;
		this.name = name;
		this.room = room;
		this.isLeader = isLeader;

		for (let i = 0 ; i < 10 ; i++) {
			this.board[i] = [];
			for (let j = 0 ; j < 22 ; j++) {
				this.board[i][j] = 0;
			}
		}
	}

	setTmpBoard() {
		for (let i = 0 ; i < 10 ; i++) {
			this.tmpBoard[i] = [];
			for (let j = 0 ; j < 22 ; j++) {
				if (this.board[i][j] >= 0)
					this.tmpBoard[i][j] = this.board[i][j];
				else
					this.tmpBoard[i][j] = 0;
			}
		}
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
 		console.log(i.type);
		switch (i.type) {
			default:
				if (!this.board[3][2] && !this.board[4][2] && !this.board[5][2] && !this.board[6][2])
				{
					this.board[3][2] = -1;
					this.board[4][2] = -1;
					this.board[5][2] = -1;
					this.board[6][2] = -1;
				}
				else if (!this.board[3][1] && !this.board[4][1] && !this.board[5][1] && !this.board[6][1])
				{
					this.board[3][1] = -1;
					this.board[4][1] = -1;
					this.board[5][1] = -1;
					this.board[6][1] = -1;
				}
				else
				{
					this.gameOver = 1;
					console.log("game over man, game over...")
				}
				break;
			case "O":
				if (!this.board[4][1] && !this.board[5][1] && !this.board[4][2] && !this.board[5][2])
				{
					this.board[4][1] = -2;
					this.board[5][1] = -2;
					this.board[4][2] = -2;
					this.board[5][2] = -2;
				}
				else if (!this.board[4][0] && !this.board[5][0] && !this.board[4][1] && !this.board[5][1])
				{
					this.board[4][0] = -2;
					this.board[5][0] = -2;
					this.board[4][1] = -2;
					this.board[5][1] = -2;
				}
				else
				{
					this.gameOver = 1;
					console.log("game over man, game over...")
				}
				break;
			case "T":
				if (!this.board[4][2] && !this.board[5][2] && !this.board[6][2] && !this.board[5][1])
				{
					this.board[4][2] = -3;
					this.board[5][2] = -3;
					this.board[6][2] = -3;
					this.board[5][1] = -3;
				}
				else if (!this.board[4][1] && !this.board[5][1] && !this.board[6][1] && !this.board[5][0])
				{
					this.board[4][1] = -3;
					this.board[5][1] = -3;
					this.board[6][1] = -3;
					this.board[5][0] = -3;
				}
				else
				{
					this.gameOver = 1;
					console.log("game over man, game over...")
				}
				break;
			case "S":
				if (!this.board[5][1] && !this.board[6][1] && !this.board[5][2] && !this.board[4][2])
				{
					this.board[5][1] = -4;
					this.board[6][1] = -4;
					this.board[5][2] = -4;
					this.board[4][2] = -4;
				}
				else if (!this.board[5][0] && !this.board[6][0] && !this.board[5][1] && !this.board[4][1])
				{
					this.board[5][0] = -4;
					this.board[6][0] = -4;
					this.board[5][1] = -4;
					this.board[4][1] = -4;
				}
				else
				{
					this.gameOver = 1;
					console.log("game over man, game over...")
				}
				break;
			case "Z":
				if (!this.board[4][1] && !this.board[5][1] && !this.board[5][2] && !this.board[6][2])
				{
					this.board[4][1] = -5;
					this.board[5][1] = -5;
					this.board[5][2] = -5;
					this.board[6][2] = -5;
				}
				else if (!this.board[4][0] && !this.board[5][0] && !this.board[5][1] && !this.board[6][1])
				{
					this.board[4][0] = -5;
					this.board[5][0] = -5;
					this.board[5][1] = -5;
					this.board[6][1] = -5;
				}
				else
				{
					this.gameOver = 1;
					console.log("game over man, game over...")
				}
				break;
			case "J":
				if (!this.board[4][1] && !this.board[4][2] && !this.board[5][2] && !this.board[6][2])
				{
					this.board[4][1] = -6;
					this.board[4][2] = -6;
					this.board[5][2] = -6;
					this.board[6][2] = -6;
				}
				else if (!this.board[4][0] && !this.board[4][1] && !this.board[5][1] && !this.board[6][1])
				{
					this.board[4][0] = -6;
					this.board[4][1] = -6;
					this.board[5][1] = -6;
					this.board[6][1] = -6;
				}
				else
				{
					this.gameOver = 1;
					console.log("game over man, game over...")
				}
				break;
			case "L":
				if (!this.board[6][1] && !this.board[4][2] && !this.board[5][2] && !this.board[6][2])
				{
					this.board[6][1] = -7;
					this.board[4][2] = -7;
					this.board[5][2] = -7;
					this.board[6][2] = -7;
				}
				else if (!this.board[6][0] && !this.board[4][1] && !this.board[5][1] && !this.board[6][1])
				{
					this.board[6][0] = -7;
					this.board[4][1] = -7;
					this.board[5][1] = -7;
					this.board[6][1] = -7;
				}
				else
				{
					this.gameOver = 1;
					console.log("game over man, game over...")
				}
				break;
		}
	}

	placePiece() {
		for (let i = 0 ; i < 10 ; i++) {
			for (let j = 0 ; j < 22 ; j++) {
				if (this.board[i][j] < 0)
					this.board[i][j] = -this.board[i][j];
			}
		}
		this.setPiece(this.pieces[this.currentPiece]);
		this.currentPiece++;
		this.currentRotation = 0;
	}

	rotatePiece()
	{
		for (let i = 0 ; i < 10 ; i++) {
			for (let j = 0 ; j < 22 ; j++) {
				if (this.board[i][j] < 0)
				{
					this.currentRotation = (this.currentRotation + 1) % 4;
					switch (this.board[i][j]) {
						default:
							break;
						case -1:
							this.rotateI(i, j);
							break;
						case -3:
							this.rotateT(i, j);
							break;
						case -4:
							this.rotateS(i, j);
							break;
						case -5:
							this.rotateZ(i, j);
							break;
						case -6:
							this.rotateJ(i, j);
							break;
						case -7:
							this.rotateL(i, j);
							break;
					}
					break;
				}
			}
		}
	}

	rotateJ(i, j)
	{
		switch (this.currentRotation) {
			default:
				break;
			case 0:
				break;
			case 1:
				if (((i + 2 < 10) && (j + 2 < 22)) && 
					((this.tmpBoard[i + 1][j] <= 0) && (this.tmpBoard[i + 2][j] <= 0) && (this.tmpBoard[i + 1][j + 1] <= 0) && (this.tmpBoard[i + 1][j + 2] <= 0)))
				{
					this.tmpBoard[i][j] = 0;
					this.tmpBoard[i][j + 1] = 0;
					this.tmpBoard[i + 2][j + 1] = 0;
					this.tmpBoard[i + 1][j] = -6;
					this.tmpBoard[i + 1][j + 2] = -6;
					this.tmpBoard[i + 2][j] = -6;
				}
				else if (((i + 1 < 10) && (j + 2 < 22) && (i - 1 >= 0)) && 
					((this.tmpBoard[i][j] <= 0) && (this.tmpBoard[i + 1][j] <= 0) && (this.tmpBoard[i][j + 1] <= 0) && (this.tmpBoard[i][j + 2] <= 0)))
				{
					this.tmpBoard[i + 2][j + 1] = 0;
					this.tmpBoard[i + 1][j + 1] = 0;
					this.tmpBoard[i][j + 2] = -6;
					this.tmpBoard[i + 1][j] = -6;
				}
				else if (((i + 1 < 10) && (j + 3 < 22) && (i - 1 >= 0)) && 
					((this.tmpBoard[i][j + 1] <= 0) && (this.tmpBoard[i + 1][j + 1] <= 0) && (this.tmpBoard[i][j + 2] <= 0) && (this.tmpBoard[i][j + 3] <= 0)))
				{
					this.tmpBoard[i][j] = 0;
					this.tmpBoard[i + 2][j + 1] = 0;
					this.tmpBoard[i][j + 2] = -6;
					this.tmpBoard[i][j + 3] = -6;
				}
				else if (((i + 2 < 10) && (j < 22) && (j - 2 >= 0)) && 
					((this.tmpBoard[i + 1][j - 2] <= 0) && (this.tmpBoard[i + 2][j - 2] <= 0) && (this.tmpBoard[i + 1][j - 1] <= 0) && (this.tmpBoard[i + 1][j] <= 0)))
				{
					this.tmpBoard[i][j] = 0;
					this.tmpBoard[i][j + 1] = 0;
					this.tmpBoard[i + 2][j + 1] = 0;
					this.tmpBoard[i + 1][j + 1] = 0;
					this.tmpBoard[i + 1][j - 1] = -6;
					this.tmpBoard[i + 1][j - 2] = -6;
					this.tmpBoard[i + 1][j] = -6;
					this.tmpBoard[i + 2][j - 2] = -6;
				}
				else if (((i + 1 < 10) && (j < 22) && (i - 1 >= 0) && (j - 2 >= 0)) && 
					((this.tmpBoard[i][j - 2] <= 0) && (this.tmpBoard[i + 1][j - 2] <= 0) && (this.tmpBoard[i][j - 1] <= 0) && (this.tmpBoard[i][j] <= 0)))
				{
					this.tmpBoard[i][j + 1] = 0;
					this.tmpBoard[i + 2][j + 1] = 0;
					this.tmpBoard[i + 1][j + 1] = 0;
					this.tmpBoard[i][j - 1] = -6;
					this.tmpBoard[i][j - 2] = -6;
					this.tmpBoard[i + 1][j - 2] = -6;
				}
				break;
			case 2:
				break;
			case 3:
				break;
		}
	}

	rotateL(i, j)
	{

	}

	rotateZ(i, j)
	{

	}

	rotateS(i, j)
	{

	}

	rotateI(i, j)
	{
		
	}

	rotateT(i, j)
	{

	}
}

module.exports = Player;