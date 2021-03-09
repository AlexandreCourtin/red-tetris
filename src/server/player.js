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

	testJ0(i, j)
	{
		return (((i + 2 < 10) && (j + 1 < 22) && (i >= 0) && (j >= 0)) && 
			(this.tmpBoard[i][j] <= 0) && (this.tmpBoard[i][j + 1] <= 0) && 
			(this.tmpBoard[i + 1][j + 1] <= 0) && (this.tmpBoard[i + 2][j + 1] <= 0))
	}

	resetJ0(i, j)
	{
		this.tmpBoard[i][j + 2] = 0;
		this.tmpBoard[i + 1][j] = 0;
		this.tmpBoard[i + 1][j + 1] = 0;
		this.tmpBoard[i + 1][j + 2] = 0;
	}

	placeJ0(i, j)
	{
		this.tmpBoard[i][j] = -6;
		this.tmpBoard[i][j + 1] = -6;
		this.tmpBoard[i + 1][j + 1] = -6;
		this.tmpBoard[i + 2][j + 1] = -6;
	}

	testJ1(i, j)
	{
		return (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
			((this.tmpBoard[i + 1][j] <= 0) && (this.tmpBoard[i + 2][j] <= 0) && 
			(this.tmpBoard[i + 1][j + 1] <= 0) && (this.tmpBoard[i + 1][j + 2] <= 0)))
	}

	resetJ1(i, j)
	{
		this.tmpBoard[i][j] = 0;
		this.tmpBoard[i][j + 1] = 0;
		this.tmpBoard[i + 1][j + 1] = 0;
		this.tmpBoard[i + 2][j + 1] = 0;
	}
	placeJ1(i, j)
	{
		this.tmpBoard[i + 1][j + 1] = -6;
		this.tmpBoard[i + 1][j] = -6;
		this.tmpBoard[i + 1][j + 2] = -6;
		this.tmpBoard[i + 2][j] = -6;
	}

	testJ2(i, j)
	{
		return (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
			((this.tmpBoard[i][j + 1] <= 0) && (this.tmpBoard[i + 1][j + 1] <= 0) &&
			(this.tmpBoard[i + 2][j + 1] <= 0) && (this.tmpBoard[i + 2][j + 2] <= 0)))
	}
	
	resetJ2(i, j)
	{
		this.tmpBoard[i + 1][j] = 0;
		this.tmpBoard[i + 1][j + 1] = 0;
		this.tmpBoard[i + 1][j + 2] = 0;
		this.tmpBoard[i + 2][j] = 0;
	}

	placeJ2(i, j)
	{
		this.tmpBoard[i][j + 1] = -6;
		this.tmpBoard[i + 1][j + 1] = -6;
		this.tmpBoard[i + 2][j + 1] = -6;
		this.tmpBoard[i + 2][j + 2] = -6;
	}

	testJ3(i, j)
	{
		return (((i + 1 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
			((this.tmpBoard[i][j + 2] <= 0) && (this.tmpBoard[i + 1][j] <= 0) &&
			(this.tmpBoard[i + 1][j + 1] <= 0) && (this.tmpBoard[i + 1][j + 2] <= 0)))

	}
	resetJ3(i, j)
	{
		this.tmpBoard[i][j + 1] = 0;
		this.tmpBoard[i + 1][j + 1] = 0;
		this.tmpBoard[i + 2][j + 1] = 0;
		this.tmpBoard[i + 2][j + 2] = 0;
	}

	placeJ3(i, j)
	{
		this.tmpBoard[i][j + 2] = -6;
		this.tmpBoard[i + 1][j] = -6;
		this.tmpBoard[i + 1][j + 1] = -6;
		this.tmpBoard[i + 1][j + 2] = -6;
	}

	rotateJ(i, j)
	{
		switch (this.currentRotation) {
			default:
				break;
			case 0:
				if (this.testJ0(i, j))
				{
					this.resetJ0(i, j);
					this.placeJ0(i, j);
				}
				else if (this.testJ0(i - 1, j))
				{
					this.resetJ0(i, j);
					this.placeJ0(i - 1, j);
				}
				else if (this.testJ0(i - 1, j - 1))
				{
					this.resetJ0(i, j);
					this.placeJ0(i - 1, j - 1);
				}
				else if (this.testJ0(i, j + 2))
				{
					this.resetJ0(i, j);
					this.placeJ0(i, j + 2);
				}
				else if (this.testJ0(i - 1, j + 2))
				{
					this.resetJ0(i, j);
					this.placeJ0(i - 1, j + 2);
				}
				else
					this.currentRotation = 4;
				break;
			case 1:
				if (this.testJ1(i, j))
				{
					this.resetJ1(i, j);
					this.placeJ1(i, j);
				}
				else if (this.testJ1(i - 1, j))
				{
					this.resetJ1(i, j);
					this.placeJ1(i - 1, j);
				}
				else if (this.testJ1(i - 1, j + 1))
				{
					this.resetJ1(i, j);
					this.placeJ1(i - 1, j + 1);
				}
				else if (this.testJ1(i, j - 2))
				{
					this.resetJ1(i, j);
					this.placeJ1(i, j - 2);
				}
				else if (this.testJ1(i - 1, j - 2))
				{
					this.resetJ1(i, j);
					this.placeJ1(i - 1, j - 2);
				}
				else
					this.currentRotation--;
				break;
			case 2:
				if (this.testJ2(i, j))
				{
					this.resetJ2(i, j);
					this.placeJ2(i, j);
				}
				else if (this.testJ2(i + 1, j))
				{
					this.resetJ2(i, j);
					this.placeJ2(i + 1, j);
				}
				else if (this.testJ2(i + 1, j - 1))
				{
					this.resetJ2(i, j);
					this.placeJ2(i + 1, j - 1);
				}
				else if (this.testJ2(i, j + 2))
				{
					this.resetJ2(i, j);
					this.placeJ2(i, j + 2);
				}
				else if (this.testJ2(i + 1, j + 2))
				{
					this.resetJ2(i, j);
					this.placeJ2(i + 1, j + 2);
				}
				else
					this.currentRotation--;
				break;
			case 3:
				if (this.testJ3(i, j))
				{
					this.resetJ3(i, j);
					this.placeJ3(i, j);
				}
				else if (this.testJ3(i - 1, j))
				{
					this.resetJ3(i, j);
					this.placeJ3(i - 1, j);
				}
				else if (this.testJ3(i - 1, j - 1))
				{
					this.resetJ3(i, j);
					this.placeJ3(i - 1, j - 1);
				}
				else if (this.testJ3(i, j + 2))
				{
					this.resetJ3(i, j);
					this.placeJ3(i, + 2);
				}
				else if (this.testJ3(i - 1, j + 2))
				{
					this.resetJ3(i, j);
					this.placeJ3(i - 1, j + 2);
				}
				else
					this.currentRotation--;
				break;
		}
	}

	testL0(i, j)
	{
		return (((i + 2 < 10) && (j + 1 < 22) && (i >= 0) && (j >= 0)) && 
			(this.tmpBoard[i + 2][j] <= 0) && (this.tmpBoard[i][j + 1] <= 0) && 
			(this.tmpBoard[i + 1][j + 1] <= 0) && (this.tmpBoard[i + 2][j + 1] <= 0))
	}

	resetL0(i, j)
	{
		this.tmpBoard[i][j] = 0;
		this.tmpBoard[i + 1][j] = 0;
		this.tmpBoard[i + 1][j + 1] = 0;
		this.tmpBoard[i + 1][j + 2] = 0;
	}

	placeL0(i, j)
	{
		this.tmpBoard[i + 2][j] = -7;
		this.tmpBoard[i][j + 1] = -7;
		this.tmpBoard[i + 1][j + 1] = -7;
		this.tmpBoard[i + 2][j + 1] = -7;
	}

	testL1(i, j)
	{
		return (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
			((this.tmpBoard[i + 1][j] <= 0) && (this.tmpBoard[i + 2][j + 2] <= 0) && 
			(this.tmpBoard[i + 1][j + 1] <= 0) && (this.tmpBoard[i + 1][j + 2] <= 0)))
	}

	resetL1(i, j)
	{
		this.tmpBoard[i + 2][j] = 0;
		this.tmpBoard[i][j + 1] = 0;
		this.tmpBoard[i + 1][j + 1] = 0;
		this.tmpBoard[i + 2][j + 1] = 0;
	}

	placeL1(i, j)
	{
		this.tmpBoard[i + 1][j + 1] = -7;
		this.tmpBoard[i + 1][j] = -7;
		this.tmpBoard[i + 1][j + 2] = -7;
		this.tmpBoard[i + 2][j + 2] = -7;
	}

	testL2(i, j)
	{
		return (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
			((this.tmpBoard[i][j + 1] <= 0) && (this.tmpBoard[i + 1][j + 1] <= 0) &&
			(this.tmpBoard[i + 2][j + 1] <= 0) && (this.tmpBoard[i][j + 2] <= 0)))
	}
	
	resetL2(i, j)
	{
		this.tmpBoard[i + 1][j] = 0;
		this.tmpBoard[i + 1][j + 1] = 0;
		this.tmpBoard[i + 1][j + 2] = 0;
		this.tmpBoard[i + 2][j + 2] = 0;
	}

	placeL2(i, j)
	{
		this.tmpBoard[i][j + 1] = -7;
		this.tmpBoard[i + 1][j + 1] = -7;
		this.tmpBoard[i + 2][j + 1] = -7;
		this.tmpBoard[i][j + 2] = -7;
	}

	testL3(i, j)
	{
		return (((i + 1 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
			((this.tmpBoard[i][j] <= 0) && (this.tmpBoard[i + 1][j] <= 0) &&
			(this.tmpBoard[i + 1][j + 1] <= 0) && (this.tmpBoard[i + 1][j + 2] <= 0)))

	}
	resetL3(i, j)
	{
		this.tmpBoard[i][j + 1] = 0;
		this.tmpBoard[i + 1][j + 1] = 0;
		this.tmpBoard[i + 2][j + 1] = 0;
		this.tmpBoard[i][j + 2] = 0;
	}

	placeL3(i, j)
	{
		this.tmpBoard[i][j] = -7;
		this.tmpBoard[i + 1][j] = -7;
		this.tmpBoard[i + 1][j + 1] = -7;
		this.tmpBoard[i + 1][j + 2] = -7;
	}

	rotateL(i, j)
	{
		switch (this.currentRotation) {
			default:
				break;
			case 0:
				if (this.testL0(i, j))
				{
					this.resetL0(i, j);
					this.placeL0(i, j);
				}
				else if (this.testL0(i - 1, j))
				{
					this.resetL0(i, j);
					this.placeL0(i - 1, j);
				}
				else if (this.testL0(i - 1, j - 1))
				{
					this.resetL0(i, j);
					this.placeL0(i - 1, j - 1);
				}
				else if (this.testL0(i, j + 2))
				{
					this.resetL0(i, j);
					this.placeL0(i, j + 2);
				}
				else if (this.testL0(i - 1, j + 2))
				{
					this.resetL0(i, j);
					this.placeL0(i - 1, j + 2);
				}
				else
					this.currentRotation = 4;
				break;
			case 1:
				if (this.testL1(i, j))
				{
					this.resetL1(i, j);
					this.placeL1(i, j);
				}
				else if (this.testL1(i - 1, j))
				{
					this.resetL1(i, j);
					this.placeL1(i - 1, j);
				}
				else if (this.testL1(i - 1, j + 1))
				{
					this.resetL1(i, j);
					this.placeL1(i - 1, j + 1);
				}
				else if (this.testL1(i, j - 2))
				{
					this.resetL1(i, j);
					this.placeL1(i, j - 2);
				}
				else if (this.testL1(i - 1, j - 2))
				{
					this.resetL1(i, j);
					this.placeL1(i - 1, j - 2);
				}
				else
					this.currentRotation--;
				break;
			case 2:
				if (this.testL2(i, j))
				{
					this.resetL2(i, j);
					this.placeL2(i, j);
				}
				else if (this.testL2(i + 1, j))
				{
					this.resetL2(i, j);
					this.placeL2(i + 1, j);
				}
				else if (this.testL2(i + 1, j - 1))
				{
					this.resetL2(i, j);
					this.placeL2(i + 1, j - 1);
				}
				else if (this.testL2(i, j + 2))
				{
					this.resetL2(i, j);
					this.placeL2(i, j + 2);
				}
				else if (this.testL2(i + 1, j + 2))
				{
					this.resetL2(i, j);
					this.placeL2(i + 1, j + 2);
				}
				else
					this.currentRotation--;
				break;
			case 3:
				if (this.testL3(i, j))
				{
					this.resetL3(i, j);
					this.placeL3(i, j);
				}
				else if (this.testL3(i - 1, j))
				{
					this.resetL3(i, j);
					this.placeL3(i - 1, j);
				}
				else if (this.testL3(i - 1, j - 1))
				{
					this.resetL3(i, j);
					this.placeL3(i - 1, j - 1);
				}
				else if (this.testL3(i, j + 2))
				{
					this.resetL3(i, j);
					this.placeL3(i, + 2);
				}
				else if (this.testL3(i - 1, j + 2))
				{
					this.resetL3(i, j);
					this.placeL3(i - 1, j + 2);
				}
				else
					this.currentRotation--;
				break;
		}
	}

	testZ0(i, j)
	{
		return (((i + 2 < 10) && (j + 1 < 22) && (i >= 0) && (j >= 0)) && 
			(this.tmpBoard[i + 2][j + 1] <= 0) && (this.tmpBoard[i][j] <= 0) && 
			(this.tmpBoard[i + 1][j + 1] <= 0) && (this.tmpBoard[i + 1][j] <= 0))
	}

	resetZ0(i, j)
	{
		this.tmpBoard[i + 1][j] = 0;
		this.tmpBoard[i][j + 1] = 0;
		this.tmpBoard[i + 1][j + 1] = 0;
		this.tmpBoard[i][j + 2] = 0;
	}

	placeZ0(i, j)
	{
		this.tmpBoard[i + 2][j + 1] = -5;
		this.tmpBoard[i][j] = -5;
		this.tmpBoard[i + 1][j + 1] = -5;
		this.tmpBoard[i + 1][j] = -5;
	}

	testZ1(i, j)
	{
		return (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
			((this.tmpBoard[i + 2][j] <= 0) && (this.tmpBoard[i + 2][j + 1] <= 0) && 
			(this.tmpBoard[i + 1][j + 1] <= 0) && (this.tmpBoard[i + 1][j + 2] <= 0)))
	}

	resetZ1(i, j)
	{
		this.tmpBoard[i][j] = 0;
		this.tmpBoard[i + 2][j + 1] = 0;
		this.tmpBoard[i + 1][j + 1] = 0;
		this.tmpBoard[i + 1][j] = 0;
	}

	placeZ1(i, j)
	{
		this.tmpBoard[i + 2][j] = -5;
		this.tmpBoard[i + 2][j + 1] = -5;
		this.tmpBoard[i + 1][j + 1] = -5;
		this.tmpBoard[i + 1][j + 2] = -5;
	}

	testZ2(i, j)
	{
		return (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
			((this.tmpBoard[i + 1][j + 2] <= 0) && (this.tmpBoard[i + 1][j + 1] <= 0) &&
			(this.tmpBoard[i + 2][j + 2] <= 0) && (this.tmpBoard[i][j + 1] <= 0)))
	}
	
	resetZ2(i, j)
	{
		this.tmpBoard[i + 2][j] = 0;
		this.tmpBoard[i + 2][j + 1] = 0;
		this.tmpBoard[i + 1][j + 1] = 0;
		this.tmpBoard[i + 1][j + 2] = 0;
	}

	placeZ2(i, j)
	{
		this.tmpBoard[i + 1][j + 2] = -5;
		this.tmpBoard[i + 1][j + 1] = -5;
		this.tmpBoard[i + 2][j + 2] = -5;
		this.tmpBoard[i][j + 1] = -5;
	}

	testZ3(i, j)
	{
		return (((i + 1 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
			((this.tmpBoard[i + 1][j] <= 0) && (this.tmpBoard[i][j + 1] <= 0) &&
			(this.tmpBoard[i + 1][j + 1] <= 0) && (this.tmpBoard[i][j + 2] <= 0)))

	}
	resetZ3(i, j)
	{
		this.tmpBoard[i + 1][j + 2] = 0;
		this.tmpBoard[i + 1][j + 1] = 0;
		this.tmpBoard[i + 2][j + 2] = 0;
		this.tmpBoard[i][j + 1] = 0;
	}

	placeZ3(i, j)
	{
		this.tmpBoard[i + 1][j] = -5;
		this.tmpBoard[i][j + 1] = -5;
		this.tmpBoard[i + 1][j + 1] = -5;
		this.tmpBoard[i][j + 2] = -5;
	}

	rotateZ(i, j)
	{
		switch (this.currentRotation) {
			default:
				break;
			case 0:
				if (this.testZ0(i, j))
				{
					this.resetZ0(i, j);
					this.placeZ0(i, j);
				}
				else if (this.testZ0(i - 1, j))
				{
					this.resetZ0(i, j);
					this.placeZ0(i - 1, j);
				}
				else if (this.testZ0(i - 1, j - 1))
				{
					this.resetZ0(i, j);
					this.placeZ0(i - 1, j - 1);
				}
				else if (this.testZ0(i, j + 2))
				{
					this.resetZ0(i, j);
					this.placeZ0(i, j + 2);
				}
				else if (this.testZ0(i - 1, j + 2))
				{
					this.resetZ0(i, j);
					this.placeZ0(i - 1, j + 2);
				}
				else
					this.currentRotation = 4;
				break;
			case 1:
				if (this.testZ1(i, j))
				{
					this.resetZ1(i, j);
					this.placeZ1(i, j);
				}
				else if (this.testZ1(i - 1, j))
				{
					this.resetZ1(i, j);
					this.placeZ1(i - 1, j);
				}
				else if (this.testZ1(i - 1, j + 1))
				{
					this.resetZ1(i, j);
					this.placeZ1(i - 1, j + 1);
				}
				else if (this.testZ1(i, j - 2))
				{
					this.resetZ1(i, j);
					this.placeZ1(i, j - 2);
				}
				else if (this.testZ1(i - 1, j - 2))
				{
					this.resetZ1(i, j);
					this.placeZ1(i - 1, j - 2);
				}
				else
					this.currentRotation--;
				break;
			case 2:
				if (this.testZ2(i, j))
				{
					this.resetZ2(i, j);
					this.placeZ2(i, j);
				}
				else if (this.testZ2(i + 1, j))
				{
					this.resetZ2(i, j);
					this.placeZ2(i + 1, j);
				}
				else if (this.testZ2(i + 1, j - 1))
				{
					this.resetZ2(i, j);
					this.placeZ2(i + 1, j - 1);
				}
				else if (this.testZ2(i, j + 2))
				{
					this.resetZ2(i, j);
					this.placeZ2(i, j + 2);
				}
				else if (this.testZ2(i + 1, j + 2))
				{
					this.resetZ2(i, j);
					this.placeZ2(i + 1, j + 2);
				}
				else
					this.currentRotation--;
				break;
			case 3:
				if (this.testZ3(i, j))
				{
					this.resetZ3(i, j);
					this.placeZ3(i, j);
				}
				else if (this.testZ3(i - 1, j))
				{
					this.resetZ3(i, j);
					this.placeZ3(i - 1, j);
				}
				else if (this.testZ3(i - 1, j - 1))
				{
					this.resetZ3(i, j);
					this.placeZ3(i - 1, j - 1);
				}
				else if (this.testZ3(i, j + 2))
				{
					this.resetZ3(i, j);
					this.placeZ3(i, + 2);
				}
				else if (this.testZ3(i - 1, j + 2))
				{
					this.resetZ3(i, j);
					this.placeZ3(i - 1, j + 2);
				}
				else
					this.currentRotation--;
				break;
		}
	}

	testS0(i, j)
	{
		return (((i + 2 < 10) && (j + 1 < 22) && (i >= 0) && (j >= 0)) && 
			(this.tmpBoard[i + 2][j] <= 0) && (this.tmpBoard[i][j + 1] <= 0) && 
			(this.tmpBoard[i + 1][j + 1] <= 0) && (this.tmpBoard[i + 1][j] <= 0))
	}

	resetS0(i, j)
	{
		this.tmpBoard[i][j] = 0;
		this.tmpBoard[i][j + 1] = 0;
		this.tmpBoard[i + 1][j + 1] = 0;
		this.tmpBoard[i + 1][j + 2] = 0;
	}

	placeS0(i, j)
	{
		this.tmpBoard[i + 2][j] = -4;
		this.tmpBoard[i][j + 1] = -4;
		this.tmpBoard[i + 1][j + 1] = -4;
		this.tmpBoard[i + 1][j] = -4;
	}

	testS1(i, j)
	{
		return (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
			((this.tmpBoard[i + 1][j] <= 0) && (this.tmpBoard[i + 2][j + 2] <= 0) && 
			(this.tmpBoard[i + 1][j + 1] <= 0) && (this.tmpBoard[i + 2][j + 1] <= 0)))
	}

	resetS1(i, j)
	{
		this.tmpBoard[i + 2][j] = 0;
		this.tmpBoard[i][j + 1] = 0;
		this.tmpBoard[i + 1][j + 1] = 0;
		this.tmpBoard[i + 1][j] = 0;
	}

	placeS1(i, j)
	{
		this.tmpBoard[i + 1][j + 1] = -4;
		this.tmpBoard[i + 1][j] = -4;
		this.tmpBoard[i + 2][j + 1] = -4;
		this.tmpBoard[i + 2][j + 2] = -4;
	}

	testS2(i, j)
	{
		return (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
			((this.tmpBoard[i + 1][j + 2] <= 0) && (this.tmpBoard[i + 1][j + 1] <= 0) &&
			(this.tmpBoard[i + 2][j + 1] <= 0) && (this.tmpBoard[i][j + 2] <= 0)))
	}
	
	resetS2(i, j)
	{
		this.tmpBoard[i + 1][j] = 0;
		this.tmpBoard[i + 1][j + 1] = 0;
		this.tmpBoard[i + 2][j + 1] = 0;
		this.tmpBoard[i + 2][j + 2] = 0;
	}

	placeS2(i, j)
	{
		this.tmpBoard[i + 1][j + 2] = -4;
		this.tmpBoard[i + 1][j + 1] = -4;
		this.tmpBoard[i + 2][j + 1] = -4;
		this.tmpBoard[i][j + 2] = -4;
	}

	testS3(i, j)
	{
		return (((i + 1 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
			((this.tmpBoard[i][j] <= 0) && (this.tmpBoard[i][j + 1] <= 0) &&
			(this.tmpBoard[i + 1][j + 1] <= 0) && (this.tmpBoard[i + 1][j + 2] <= 0)))

	}
	resetS3(i, j)
	{
		this.tmpBoard[i + 1][j + 2] = 0;
		this.tmpBoard[i + 1][j + 1] = 0;
		this.tmpBoard[i + 2][j + 1] = 0;
		this.tmpBoard[i][j + 2] = 0;
	}

	placeS3(i, j)
	{
		this.tmpBoard[i][j] = -4;
		this.tmpBoard[i][j + 1] = -4;
		this.tmpBoard[i + 1][j + 1] = -4;
		this.tmpBoard[i + 1][j + 2] = -4;
	}

	rotateS(i, j)
	{
		switch (this.currentRotation) {
			default:
				break;
			case 0:
				if (this.testS0(i, j))
				{
					this.resetS0(i, j);
					this.placeS0(i, j);
				}
				else if (this.testS0(i - 1, j))
				{
					this.resetS0(i, j);
					this.placeS0(i - 1, j);
				}
				else if (this.testS0(i - 1, j - 1))
				{
					this.resetS0(i, j);
					this.placeS0(i - 1, j - 1);
				}
				else if (this.testS0(i, j + 2))
				{
					this.resetS0(i, j);
					this.placeS0(i, j + 2);
				}
				else if (this.testS0(i - 1, j + 2))
				{
					this.resetS0(i, j);
					this.placeS0(i - 1, j + 2);
				}
				else
					this.currentRotation = 4;
				break;
			case 1:
				if (this.testS1(i, j))
				{
					this.resetS1(i, j);
					this.placeS1(i, j);
				}
				else if (this.testS1(i - 1, j))
				{
					this.resetS1(i, j);
					this.placeS1(i - 1, j);
				}
				else if (this.testS1(i - 1, j + 1))
				{
					this.resetS1(i, j);
					this.placeS1(i - 1, j + 1);
				}
				else if (this.testS1(i, j - 2))
				{
					this.resetS1(i, j);
					this.placeS1(i, j - 2);
				}
				else if (this.testS1(i - 1, j - 2))
				{
					this.resetS1(i, j);
					this.placeS1(i - 1, j - 2);
				}
				else
					this.currentRotation--;
				break;
			case 2:
				if (this.testS2(i, j))
				{
					this.resetS2(i, j);
					this.placeS2(i, j);
				}
				else if (this.testS2(i + 1, j))
				{
					this.resetS2(i, j);
					this.placeS2(i + 1, j);
				}
				else if (this.testS2(i + 1, j - 1))
				{
					this.resetS2(i, j);
					this.placeS2(i + 1, j - 1);
				}
				else if (this.testS2(i, j + 2))
				{
					this.resetS2(i, j);
					this.placeS2(i, j + 2);
				}
				else if (this.testS2(i + 1, j + 2))
				{
					this.resetS2(i, j);
					this.placeS2(i + 1, j + 2);
				}
				else
					this.currentRotation--;
				break;
			case 3:
				if (this.testS3(i, j))
				{
					this.resetS3(i, j);
					this.placeS3(i, j);
				}
				else if (this.testS3(i - 1, j))
				{
					this.resetS3(i, j);
					this.placeS3(i - 1, j);
				}
				else if (this.testS3(i - 1, j - 1))
				{
					this.resetS3(i, j);
					this.placeS3(i - 1, j - 1);
				}
				else if (this.testS3(i, j + 2))
				{
					this.resetS3(i, j);
					this.placeS3(i, + 2);
				}
				else if (this.testS3(i - 1, j + 2))
				{
					this.resetS3(i, j);
					this.placeS3(i - 1, j + 2);
				}
				else
					this.currentRotation--;
				break;
		}
	}

	rotateI(i, j)
	{
		
	}


	testT0(i, j)
	{
		return (((i + 1 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
			(this.tmpBoard[i + 1][j] <= 0) && (this.tmpBoard[i][j + 1] <= 0) && 
			(this.tmpBoard[i + 1][j + 1] <= 0) && (this.tmpBoard[i + 1][j + 2] <= 0))
	}

	resetT0(i, j)
	{
		this.tmpBoard[i + 1][j] = 0;
		this.tmpBoard[i + 1][j + 1] = 0;
		this.tmpBoard[i + 1][j + 2] = 0;
		this.tmpBoard[i][j + 1] = 0;
	}

	placeT0(i, j)
	{
		this.tmpBoard[i + 1][j] = -3;
		this.tmpBoard[i][j + 1] = -3;
		this.tmpBoard[i + 1][j + 1] = -3;
		this.tmpBoard[i + 2][j + 1] = -3;
	}

	testT1(i, j)
	{
		return (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
			((this.tmpBoard[i + 1][j] <= 0) && (this.tmpBoard[i + 2][j + 1] <= 0) && 
			(this.tmpBoard[i + 1][j + 1] <= 0) && (this.tmpBoard[i + 1][j + 2] <= 0)))
	}

	resetT1(i, j)
	{
		this.tmpBoard[i + 1][j] = 0;
		this.tmpBoard[i + 1][j + 1] = 0;
		this.tmpBoard[i][j + 1] = 0;
		this.tmpBoard[i + 2][j + 2] = 0;
	}

	placeT1(i, j)
	{
		this.tmpBoard[i + 1][j] = -3;
		this.tmpBoard[i + 2][j + 1] = -3;
		this.tmpBoard[i + 1][j + 1] = -3;
		this.tmpBoard[i + 1][j + 2] = -3;
	}

	testT2(i, j)
	{
		return (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
			((this.tmpBoard[i + 1][j] <= 0) && (this.tmpBoard[i + 1][j + 1] <= 0) &&
			(this.tmpBoard[i + 2][j + 1] <= 0) && (this.tmpBoard[i + 1][j + 2] <= 0)))
	}
	
	resetT2(i, j)
	{
		this.tmpBoard[i + 1][j] = 0;
		this.tmpBoard[i + 2][j + 1] = 0;
		this.tmpBoard[i + 1][j + 1] = 0;
		this.tmpBoard[i + 1][j + 2] = 0;
	}

	placeT2(i, j)
	{
		this.tmpBoard[i + 1][j] = -3;
		this.tmpBoard[i + 1][j + 1] = -3;
		this.tmpBoard[i + 2][j + 1] = -3;
		this.tmpBoard[i + 1][j + 2] = -3;
	}

	testT3(i, j)
	{
		return (((i + 1 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
			((this.tmpBoard[i + 1][j] <= 0) && (this.tmpBoard[i][j + 1] <= 0) &&
			(this.tmpBoard[i + 1][j + 1] <= 0) && (this.tmpBoard[i + 1][j + 2] <= 0)))

	}
	resetT3(i, j)
	{
		this.tmpBoard[i + 1][j] = 0;
		this.tmpBoard[i + 1][j + 1] = 0;
		this.tmpBoard[i + 2][j + 1] = 0;
		this.tmpBoard[i + 1][j + 2] = 0;
	}

	placeT3(i, j)
	{
		this.tmpBoard[i + 1][j] = -3;
		this.tmpBoard[i][j + 1] = -3;
		this.tmpBoard[i + 1][j + 1] = -3;
		this.tmpBoard[i + 1][j + 2] = -3;
	}

	rotateT(i, j)
	{
		switch (this.currentRotation) {
			default:
				break;
			case 0:
				if (this.testT0(i, j))
				{
					this.resetT0(i, j);
					this.placeT0(i, j);
				}
				else if (this.testT0(i - 1, j))
				{
					this.resetT0(i, j);
					this.placeT0(i - 1, j);
				}
				else if (this.testT0(i - 1, j - 1))
				{
					this.resetT0(i, j);
					this.placeT0(i - 1, j - 1);
				}
				else if (this.testT0(i, j + 2))
				{
					this.resetT0(i, j);
					this.placeT0(i, j + 2);
				}
				else if (this.testT0(i - 1, j + 2))
				{
					this.resetT0(i, j);
					this.placeT0(i - 1, j + 2);
				}
				else
					this.currentRotation = 4;
				break;
			case 1:
				if (this.testT1(i, j))
				{
					this.resetT1(i, j);
					this.placeT1(i, j);
				}
				else if (this.testT1(i - 1, j))
				{
					this.resetT1(i, j);
					this.placeT1(i - 1, j);
				}
				else if (this.testT1(i - 1, j + 1))
				{
					this.resetT1(i, j);
					this.placeT1(i - 1, j + 1);
				}
				else if (this.testT1(i, j - 2))
				{
					this.resetT1(i, j);
					this.placeT1(i, j - 2);
				}
				else if (this.testT1(i - 1, j - 2))
				{
					this.resetT1(i, j);
					this.placeT1(i - 1, j - 2);
				}
				else
					this.currentRotation--;
				break;
			case 2:
				if (this.testT2(i, j))
				{
					this.resetT2(i, j);
					this.placeT2(i, j);
				}
				else if (this.testT2(i + 1, j))
				{
					this.resetT2(i, j);
					this.placeT2(i + 1, j);
				}
				else if (this.testT2(i + 1, j - 1))
				{
					this.resetT2(i, j);
					this.placeT2(i + 1, j - 1);
				}
				else if (this.testT2(i, j + 2))
				{
					this.resetT2(i, j);
					this.placeT2(i, j + 2);
				}
				else if (this.testT2(i + 1, j + 2))
				{
					this.resetT2(i, j);
					this.placeT2(i + 1, j + 2);
				}
				else
					this.currentRotation--;
				break;
			case 3:
				if (this.testT3(i, j))
				{
					this.resetT3(i, j);
					this.placeT3(i, j);
				}
				else if (this.testT3(i - 1, j))
				{
					this.resetT3(i, j);
					this.placeT3(i - 1, j);
				}
				else if (this.testT3(i - 1, j - 1))
				{
					this.resetT3(i, j);
					this.placeT3(i - 1, j - 1);
				}
				else if (this.testT3(i, j + 2))
				{
					this.resetT3(i, j);
					this.placeT3(i, + 2);
				}
				else if (this.testT3(i - 1, j + 2))
				{
					this.resetT3(i, j);
					this.placeT3(i - 1, j + 2);
				}
				else
					this.currentRotation--;
				break;
		}
	}

	testI0(i, j)
	{
		return (((i + 3 < 10) && (j + 1 < 22) && (i >= 0) && (j >= 0)) && 
			(this.tmpBoard[i][j + 1] <= 0) && (this.tmpBoard[i + 1][j + 1] <= 0) && 
			(this.tmpBoard[i + 2][j + 1] <= 0) && (this.tmpBoard[i + 3][j + 1] <= 0))
	}

	resetI0(i, j)
	{
		this.tmpBoard[i + 1][j] = 0;
		this.tmpBoard[i + 1][j + 1] = 0;
		this.tmpBoard[i + 1][j + 2] = 0;
		this.tmpBoard[i + 1][j + 3] = 0;
	}

	placeI0(i, j)
	{
		this.tmpBoard[i][j + 1] = -1;
		this.tmpBoard[i + 1][j + 1] = -1;
		this.tmpBoard[i + 2][j + 1] = -1;
		this.tmpBoard[i + 3][j + 1] = -1;
	}

	testI1(i, j)
	{
		return (((i + 2 < 10) && (j + 3 < 22) && (i >= 0) && (j >= 0)) && 
			((this.tmpBoard[i + 2][j] <= 0) && (this.tmpBoard[i + 2][j + 1] <= 0) && 
			(this.tmpBoard[i + 2][j + 2] <= 0) && (this.tmpBoard[i + 2][j + 3] <= 0)))
	}

	resetI1(i, j)
	{
		this.tmpBoard[i][j + 1] = 0;
		this.tmpBoard[i + 1][j + 1] = 0;
		this.tmpBoard[i + 2][j + 1] = 0;
		this.tmpBoard[i + 3][j + 1] = 0;
	}

	placeI1(i, j)
	{
		this.tmpBoard[i + 2][j] = -1;
		this.tmpBoard[i + 2][j + 1] = -1;
		this.tmpBoard[i + 2][j + 2] = -1;
		this.tmpBoard[i + 2][j + 3] = -1;
	}

	testI2(i, j)
	{
		return (((i + 3 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
			((this.tmpBoard[i][j + 2] <= 0) && (this.tmpBoard[i + 1][j + 2] <= 0) &&
			(this.tmpBoard[i + 2][j + 2] <= 0) && (this.tmpBoard[i + 3][j + 2] <= 0)))
	}
	
	resetI2(i, j)
	{
		this.tmpBoard[i + 2][j] = 0;
		this.tmpBoard[i + 2][j + 1] = 0;
		this.tmpBoard[i + 2][j + 2] = 0;
		this.tmpBoard[i + 2][j + 3] = 0;
	}

	placeI2(i, j)
	{
		this.tmpBoard[i][j + 2] = -1;
		this.tmpBoard[i + 1][j + 2] = -1;
		this.tmpBoard[i + 2][j + 2] = -1;
		this.tmpBoard[i + 3][j + 2] = -1;
	}

	testI3(i, j)
	{
		return (((i + 1 < 10) && (j + 3 < 22) && (i >= 0) && (j >= 0)) && 
			((this.tmpBoard[i + 1][j] <= 0) && (this.tmpBoard[i + 1][j + 1] <= 0) &&
			(this.tmpBoard[i + 1][j + 2] <= 0) && (this.tmpBoard[i + 1][j + 3] <= 0)))

	}
	resetI3(i, j)
	{
		this.tmpBoard[i][j + 2] = 0;
		this.tmpBoard[i + 1][j + 2] = 0;
		this.tmpBoard[i + 2][j + 2] = 0;
		this.tmpBoard[i + 3][j + 2] = 0;
	}

	placeI3(i, j)
	{
		this.tmpBoard[i + 1][j] = -1;
		this.tmpBoard[i + 1][j + 1] = -1;
		this.tmpBoard[i + 1][j + 2] = -1;
		this.tmpBoard[i + 1][j + 3] = -1;
	}

	rotateI(i, j)
	{
		switch (this.currentRotation) {
			default:
				break;
			case 0:
				if (this.testZ0(i, j))
				{
					this.resetZ0(i, j);
					this.placeZ0(i, j);
				}
				else if (this.testZ0(i - 2, j))
				{
					this.resetZ0(i, j);
					this.placeZ0(i - 2, j);
				}
				else if (this.testZ0(i + 1, j))
				{
					this.resetZ0(i, j);
					this.placeZ0(i + 1, j);
				}
				else if (this.testZ0(i - 2, j - 1))
				{
					this.resetZ0(i, j);
					this.placeZ0(i - 2, j - 1);
				}
				else if (this.testZ0(i + 1, j + 2))
				{
					this.resetZ0(i, j);
					this.placeZ0(i + 1, j + 2);
				}
				else
					this.currentRotation = 4;
				break;
			case 1:
				if (this.testZ1(i, j))
				{
					this.resetZ1(i, j);
					this.placeZ1(i, j);
				}
				else if (this.testZ1(i - 1, j))
				{
					this.resetZ1(i, j);
					this.placeZ1(i - 1, j);
				}
				else if (this.testZ1(i + 2, j))
				{
					this.resetZ1(i, j);
					this.placeZ1(i + 2, j);
				}
				else if (this.testZ1(i - 1, j + 2))
				{
					this.resetZ1(i, j);
					this.placeZ1(i - 1, j + 2);
				}
				else if (this.testZ1(i + 2, j - 1))
				{
					this.resetZ1(i, j);
					this.placeZ1(i + 2, j - 1);
				}
				else
					this.currentRotation--;
				break;
			case 2:
				if (this.testZ2(i, j))
				{
					this.resetZ2(i, j);
					this.placeZ2(i, j);
				}
				else if (this.testZ2(i + 1, j))
				{
					this.resetZ2(i, j);
					this.placeZ2(i + 1, j);
				}
				else if (this.testZ2(i + 1, j - 1))
				{
					this.resetZ2(i, j);
					this.placeZ2(i + 1, j - 1);
				}
				else if (this.testZ2(i, j + 2))
				{
					this.resetZ2(i, j);
					this.placeZ2(i, j + 2);
				}
				else if (this.testZ2(i + 1, j + 2))
				{
					this.resetZ2(i, j);
					this.placeZ2(i + 1, j + 2);
				}
				else
					this.currentRotation--;
				break;
			case 3:
				if (this.testZ3(i, j))
				{
					this.resetZ3(i, j);
					this.placeZ3(i, j);
				}
				else if (this.testZ3(i - 1, j))
				{
					this.resetZ3(i, j);
					this.placeZ3(i - 1, j);
				}
				else if (this.testZ3(i - 1, j - 1))
				{
					this.resetZ3(i, j);
					this.placeZ3(i - 1, j - 1);
				}
				else if (this.testZ3(i, j + 2))
				{
					this.resetZ3(i, j);
					this.placeZ3(i, + 2);
				}
				else if (this.testZ3(i - 1, j + 2))
				{
					this.resetZ3(i, j);
					this.placeZ3(i - 1, j + 2);
				}
				else
					this.currentRotation--;
				break;
		}
	}
}

module.exports = Player;