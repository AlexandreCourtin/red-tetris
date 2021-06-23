class Player {
	socketId;
	name = 'defaultPlayer';
	room = 'defaultRoom';

	isLeader = false;
	isPlaying = false;
	
	pieces = [];
	currentPiece = 0;
	pieceType = 0;
	
	currentRotation = 0;
	level = 1;
	completedLines = 0;
	nbClearedLines = 0;

	gameOver = 0;
	start = 1;
	
	type = 0;

	fullLines = [];
	garbageLines = 0;
	
	// board[x][y] = x Horizontal | y Vertical
	posx = 0;
	posy = 0;
	posghostx = 0;
	posghosty = 0;
	board = [];

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

	getGarbage(){
		return this.garbageLines;
	}

	setGarbage(n) {
		this.garbageLines = n;
		console.log("add garbage ", n);
	}

	checkLines() {
		let flag = 1;

		for (let j = 0 ; j < 22 ; j++) {
			flag = 1;
			for (let i = 0 ; i < 10 ; i++) {
				flag *= (this.board[i][j] > 0)
			}
			if (flag)
				this.fullLines.push(j);
		}
		if (this.fullLines.length >= 1)
			return (this.fullLines.length);
		return (0);
	}

	cleanLines() {
		for (let x = 0 ; x < this.fullLines.length ; x++)
		{
			for (let j = this.fullLines[x] ; j >= 0 ; j--) {
				for (let i = 0 ; i < 10 ; i++) {
					if (j > 0)
						this.board[i][j] = this.board[i][j - 1];
					else
						this.board[i][j] = 0;
				}
			}
		}
		this.fullLines = [];
	}

	addGarbage(){
		let n = this.garbageLines;

		console.log("garbage", n);
		if (n > 4)
			n = 4;
		for (let j = 0 ; j < 22 - n ; j++) {
			for (let i = 0 ; i < 10 ; i++) {
				this.board[i][j] = this.board[i][j + n]
			}
		}
		let k = Math.floor(Math.random() * 10);
		for (let j = 22 ; j >= 22 - n ; j--) {
			for (let i = 0 ; i < 10 ; i++) {
				this.board[i][j] = 8;
				if (i == k)
					this.board[i][j] = 0
			}
		}
		this.garbageLines -= n;
		if (this.garbageLines <= 0)
			this.garbageLines = 0;
	}

	setPiece(i, j, n)
	{
		switch (this.type) {
			default:
				return (1);
			case -1:
				return(this.setI(i, j, n));
			case -2:
				return(this.setO(i, j, n));
			case -3:
				return(this.setT(i, j, n));
			case -4:
				return(this.setS(i, j, n));
			case -5:
				return(this.setZ(i, j, n));
			case -6:
				return(this.setJ(i, j, n));
			case -7:
				return(this.setL(i, j, n));
			}
		return (1);
	}
 	
 	newPiece(i) {
 		console.log(i.type);
		switch (i.type) {
			default:
				this.type = -1;
				if (!this.setPiece(3, 0, 1))
					break;
				else if (!this.setPiece(3, -1, 1))
					break;
				else
				{
					this.gameOver = 1;
					console.log("game over man, game over...")
				}
				break;
			case "O":
				this.type = -2;
				if (!this.setPiece(4, 1, 1))
					break ;
				else if (!this.setPiece(4, 0, 1))
					break ;
				else
				{
					this.gameOver = 1;
					console.log("game over man, game over...")
				}
				break;
			case "T":
				this.type = -3;
				if (!this.setPiece(3, 1, 1))
					break ;
				else if (!this.setPiece(3, 0, 1))
					break ;
				else
				{
					this.gameOver = 1;
					console.log("game over man, game over...")
				}
				break;
			case "S":
				this.type = -4;
				if (!this.setPiece(3, 1, 1))
					break ;
				else if (!this.setPiece(3, 0, 1))
					break ;
				else
				{
					this.gameOver = 1;
					console.log("game over man, game over...")
				}
				break;
			case "Z":
				this.type = -5;
				if (!this.setPiece(3, 1, 1))
					break ;
				else if (!this.setPiece(3, 0, 1))
					break ;
				else
				{
					this.gameOver = 1;
					console.log("game over man, game over...")
				}
				break;
			case "J":
				this.type = -6;
				if (!this.setPiece(3, 1, 1))
					break ;
				else if (!this.setPiece(3, 0, 1))
					break ;
				else
				{
					this.gameOver = 1;
					console.log("game over man, game over...")
				}
				break;
			case "L":
				this.type = -7;
				if (!this.setPiece(3, 1, 1))
					break ;
				else if (!this.setPiece(3, 0, 1))
					break ;
				else
				{
					this.gameOver = 1;
					console.log("game over man, game over...")
				}
				break;
		}
		this.ghostPiece(this.posx, this.posy);
	}

	hardDrop(i, j) {
		let k = 0;
		while (k == 0)
		{
			this.setPiece(i, j, 0);
			k = this.setPiece(i, ++j, 9);
		}
		this.setPiece(i, --j, 1);
		this.placePiece();
	}

	ghostPiece(i, j) {
		let k = 0;
		let x = this.posx;
		let y = this.posy;
		while (k == 0)
		{
			this.setPiece(i, j, 0);
			k = this.setPiece(i, ++j, 9);
		}
		this.setPiece(i, --j, 9);
		this.setPiece(x, y, 1)
		this.posghostx = i;
		this.posghosty = j;
	}

	removeGhost() {
		for (let i = 0 ; i < 10; i++) {
			for (let j = 0 ; j < 22 ; j++) {
				if (this.board[i][j] < -8)
					this.board[i][j] = 0;
			}
		}
	}

	placePiece() {
		this.setPiece(this.posx, this.posy, -1)
		this.currentPiece++;
		this.currentRotation = 0;
		this.addGarbage()
		this.nbClearedLines = this.checkLines();
		if (this.nbClearedLines > 0)
		{
			this.completedLines += this.nbClearedLines;
			this.level = 1 + this.completedLines / 10;
			this.cleanLines();
		}
		this.newPiece(this.pieces[this.currentPiece]);
	}

	rotatePiece()
	{
		if (this.type == -1)
			this.rotateI(this.posx, this.posy);
		else if (this.type == -2)
			return (0);
		else if (this.type <= -3 && this.type >= -7)
			console.log(this.rotateJLZST(this.posx, this.posy));
		else
			return (1);
		return (0);
	}

	setO(i, j, n)
	{
		//if (n == 1 || n == 0)
			//console.log("piece : ", this.type, "   i, j : ", i, j,"   n : ", n, "   rotation :", this.currentRotation);
		if (((i + 1 < 10) && (j + 1 < 22) && (i >= 0) && (j >= 0)) &&
			(this.board[i][j] <= 0) && (this.board[i + 1][j] <= 0) &&
			(this.board[i][j + 1] <= 0) && (this.board[i + 1][j + 1] <= 0))
		{
			this.board[i][j] = n * -2;
			this.board[i + 1][j] = n * -2;
			this.board[i][j + 1] = n * -2;
			this.board[i + 1][j + 1] = n * -2;
			if (n == 1) 
			{
				this.posx = i;
				this.posy = j;
			}
			return (0);
		}
		return (1);
	}

	setJ(i, j, n)
	{
		//if (n == 1 || n == 0)
			//console.log("piece : ", this.type, "   i, j : ", i, j,"   n : ", n, "   rotation :", this.currentRotation);
		switch (this.currentRotation) {
			default:
				return (-1);
			case 0:
				if (((i + 2 < 10) && (j + 1 < 22) && (i >= 0) && (j >= 0)) && 
					(this.board[i][j] <= 0) && (this.board[i][j + 1] <= 0) && 
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 2][j + 1] <= 0))
				{
					this.board[i][j] = n * -6;
					this.board[i][j + 1] = n * -6;
					this.board[i + 1][j + 1] = n * -6;
					this.board[i + 2][j + 1] = n * -6;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);
			case 1:
				if (((i + 2 < 10) && (j + 2 < 22) && (i + 1 >= 0) && (j >= 0)) && 
					((this.board[i + 1][j] <= 0) && (this.board[i + 2][j] <= 0) && 
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 1][j + 2] <= 0)))
				{
					this.board[i + 1][j] = n * -6;
					this.board[i + 2][j] = n * -6;
					this.board[i + 1][j + 1] = n * -6;
					this.board[i + 1][j + 2] = n * -6;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);
			case 2:
				if (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j + 1 >= 0)) && 
					((this.board[i][j + 1] <= 0) && (this.board[i + 1][j + 1] <= 0) &&
					(this.board[i + 2][j + 1] <= 0) && (this.board[i + 2][j + 2] <= 0)))
				{
					this.board[i][j + 1] = n * -6;
					this.board[i + 1][j + 1] = n * -6;
					this.board[i + 2][j + 1] = n * -6;
					this.board[i + 2][j + 2] = n * -6;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);
			case 3:
				if (((i + 1 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
					((this.board[i][j + 2] <= 0) && (this.board[i + 1][j] <= 0) &&
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 1][j + 2] <= 0)))
				{
					this.board[i][j + 2] = n * -6;
					this.board[i + 1][j] = n * -6;
					this.board[i + 1][j + 1] = n * -6;
					this.board[i + 1][j + 2] = n * -6;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);
		}
	}

	setL(i, j, n)
	{
		//if (n == 1 || n == 0)
			//console.log("piece : ", this.type, "   i, j : ", i, j,"   n : ", n, "   rotation :", this.currentRotation);
		switch (this.currentRotation) {
			default:
				return (-1);
			case 0:
				if (((i + 2 < 10) && (j + 1 < 22) && (i >= 0) && (j >= 0)) && 
					(this.board[i + 2][j] <= 0) && (this.board[i][j + 1] <= 0) && 
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 2][j + 1] <= 0))
				{
					this.board[i + 2][j] = -7 * n;
					this.board[i][j + 1] = -7 * n;
					this.board[i + 1][j + 1] = -7 * n;
					this.board[i + 2][j + 1] = -7 * n;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);
			case 1:
				if (((i + 2 < 10) && (j + 2 < 22) && (i + 1 >= 0) && (j >= 0)) && 
					((this.board[i + 1][j] <= 0) && (this.board[i + 2][j + 2] <= 0) && 
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 1][j + 2] <= 0)))
				{
					this.board[i + 1][j + 1] = -7 * n;
					this.board[i + 1][j] = -7 * n;
					this.board[i + 1][j + 2] = -7 * n;
					this.board[i + 2][j + 2] = -7 * n;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);
			case 2:
				if (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j + 1 >= 0)) && 
					((this.board[i][j + 1] <= 0) && (this.board[i + 1][j + 1] <= 0) &&
					(this.board[i + 2][j + 1] <= 0) && (this.board[i][j + 2] <= 0)))
				{
					this.board[i][j + 1] = -7 * n;
					this.board[i + 1][j + 1] = -7 * n;
					this.board[i + 2][j + 1] = -7 * n;
					this.board[i][j + 2] = -7 * n;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);
			case 3:
				if (((i + 1 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
					((this.board[i][j] <= 0) && (this.board[i + 1][j] <= 0) &&
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 1][j + 2] <= 0)))
				{
					this.board[i][j] = -7 * n;
					this.board[i + 1][j] = -7 * n;
					this.board[i + 1][j + 1] = -7 * n;
					this.board[i + 1][j + 2] = -7 * n;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);

		}
	}

	setZ(i, j, n)
	{
		//if (n == 1 || n == 0)
			//console.log("piece : ", this.type, "   i, j : ", i, j,"   n : ", n, "   rotation :", this.currentRotation);
		switch (this.currentRotation) {
			default:
				return (-1);
			case 0:
				if (((i + 2 < 10) && (j + 1 < 22) && (i >= 0) && (j >= 0)) && 
					(this.board[i + 2][j + 1] <= 0) && (this.board[i][j] <= 0) && 
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 1][j] <= 0))
				{
					this.board[i][j] = -5 * n;
					this.board[i + 1][j] = -5 * n;
					this.board[i + 1][j + 1] = -5 * n;
					this.board[i + 2][j + 1] = -5 * n;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);
			case 1:
				if (((i + 2 < 10) && (j + 2 < 22) && (i + 1 >= 0) && (j >= 0)) && 
					((this.board[i + 2][j] <= 0) && (this.board[i + 2][j + 1] <= 0) && 
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 1][j + 2] <= 0)))
				{
					this.board[i + 1][j + 1] = -5 * n;
					this.board[i + 1][j + 2] = -5 * n;
					this.board[i + 2][j] = -5 * n;
					this.board[i + 2][j + 1] = -5 * n;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);
			case 2:
				if (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j + 1 >= 0)) && 
					((this.board[i + 1][j + 2] <= 0) && (this.board[i + 1][j + 1] <= 0) &&
					(this.board[i + 2][j + 2] <= 0) && (this.board[i][j + 1] <= 0)))
				{
					this.board[i][j + 1] = -5 * n;
					this.board[i + 1][j + 1] = -5 * n;
					this.board[i + 1][j + 2] = -5 * n;
					this.board[i + 2][j + 2] = -5 * n;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);
			case 3:
				if (((i + 1 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
					((this.board[i + 1][j] <= 0) && (this.board[i][j + 1] <= 0) &&
					(this.board[i + 1][j + 1] <= 0) && (this.board[i][j + 2] <= 0)))
				{
					this.board[i][j + 1] = -5 * n;
					this.board[i][j + 2] = -5 * n;
					this.board[i + 1][j] = -5 * n;
					this.board[i + 1][j + 1] = -5 * n;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);

		}
	}

	setS(i, j, n)
	{
		//if (n == 1 || n == 0)
			//console.log("piece : ", this.type, "   i, j : ", i, j,"   n : ", n, "   rotation :", this.currentRotation);
		switch (this.currentRotation) {
			default:
				return (-1);
			case 0:
				if (((i + 2 < 10) && (j + 1 < 22) && (i >= 0) && (j >= 0)) && 
					((this.board[i + 2][j] <= 0) && (this.board[i][j + 1] <= 0) && 
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 1][j] <= 0)))
				{
					this.board[i][j + 1] = -4 * n;
					this.board[i + 1][j] = -4 * n;
					this.board[i + 1][j + 1] = -4 * n;
					this.board[i + 2][j] = -4 * n;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);
			case 1:
				if (((i + 2 < 10) && (j + 2 < 22) && (i + 1 >= 0) && (j >= 0)) && 
					((this.board[i + 1][j] <= 0) && (this.board[i + 2][j + 2] <= 0) && 
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 2][j + 1] <= 0)))
				{
					this.board[i + 1][j] = -4 * n;
					this.board[i + 1][j + 1] = -4 * n;
					this.board[i + 2][j + 1] = -4 * n;
					this.board[i + 2][j + 2] = -4 * n;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);
			case 2:
				if (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j + 1 >= 0)) && 
					((this.board[i + 1][j + 2] <= 0) && (this.board[i + 1][j + 1] <= 0) &&
					(this.board[i + 2][j + 1] <= 0) && (this.board[i][j + 2] <= 0)))
				{
					this.board[i][j + 2] = -4 * n;
					this.board[i + 1][j + 1] = -4 * n;
					this.board[i + 1][j + 2] = -4 * n;
					this.board[i + 2][j + 1] = -4 * n;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);
			case 3:
				if (((i + 1 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
					((this.board[i][j] <= 0) && (this.board[i][j + 1] <= 0) &&
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 1][j + 2] <= 0)))
				{
					this.board[i][j] = -4 * n;
					this.board[i][j + 1] = -4 * n;
					this.board[i + 1][j + 1] = -4 * n;
					this.board[i + 1][j + 2] = -4 * n;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);

		}
	}

	setT(i, j, n)
	{
		//if (n == 1 || n == 0)
			//console.log("piece : ", this.type, "   i, j : ", i, j,"   n : ", n, "   rotation :", this.currentRotation);
		switch (this.currentRotation) {
			default:
				return (-1);
			case 0:
				if (((i + 2 < 10) && (j + 1 < 22) && (i >= 0) && (j >= 0)) && 
					(this.board[i][j + 1] <= 0) && (this.board[i + 1][j] <= 0) && 
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 2][j + 1] <= 0))
				{
					this.board[i][j + 1] = -3 * n;
					this.board[i + 1][j] = -3 * n;
					this.board[i + 1][j + 1] = -3 * n;
					this.board[i + 2][j + 1] = -3 * n;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);
			case 1:
				if (((i + 2 < 10) && (j + 2 < 22) && (i + 1 >= 0) && (j >= 0)) && 
					((this.board[i + 1][j] <= 0) && (this.board[i + 2][j + 1] <= 0) && 
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 1][j + 2] <= 0)))
				{
					this.board[i + 1][j] = -3 * n;
					this.board[i + 1][j + 1] = -3 * n;
					this.board[i + 1][j + 2] = -3 * n;
					this.board[i + 2][j + 1] = -3 * n;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);
			case 2:
				if (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j + 1 >= 0)) && 
					((this.board[i][j + 1] <= 0) && (this.board[i + 1][j + 2] <= 0) &&
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 2][j + 1] <= 0)))
				{
					this.board[i][j + 1] = -3 * n;
					this.board[i + 1][j + 2] = -3 * n;
					this.board[i + 1][j + 1] = -3 * n;
					this.board[i + 2][j + 1] = -3 * n;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);
			case 3:
				if (((i + 1 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
					((this.board[i + 1][j] <= 0) && (this.board[i][j + 1] <= 0) &&
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 1][j + 2] <= 0)))
				{
					this.board[i][j + 1] = -3 * n;
					this.board[i + 1][j] = -3 * n;
					this.board[i + 1][j + 1] = -3 * n;
					this.board[i + 1][j + 2] = -3 * n;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);

		}
	}

	setI(i, j, n)
	{
		//if (n == 1 || n == 0)
			//console.log("piece : ", this.type, "   i, j : ", i, j,"   n : ", n, "   rotation :", this.currentRotation);
		switch (this.currentRotation) {
			default:
				return (-1);
			case 0:
				if (((i + 3 < 10) && (j + 2 < 22) && (i >= 0) && (j + 2 >= 0)) && 
					((this.board[i][j + 2] <= 0) && (this.board[i + 1][j + 2] <= 0) &&
					(this.board[i + 2][j + 2] <= 0) && (this.board[i + 3][j + 2] <= 0)))
				{
					this.board[i][j + 2] = -1 * n;
					this.board[i + 1][j + 2] = -1 * n;
					this.board[i + 2][j + 2] = -1 * n;
					this.board[i + 3][j + 2] = -1 * n;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);
			case 1:
				if (((i + 2 < 10) && (j + 3 < 22) && (i + 2 >= 0) && (j >= 0)) && 
					((this.board[i + 2][j] <= 0) && (this.board[i + 2][j + 1] <= 0) && 
					(this.board[i + 2][j + 2] <= 0) && (this.board[i + 2][j + 3] <= 0)))
				{
					this.board[i + 2][j] = -1 * n;
					this.board[i + 2][j + 1] = -1 * n;
					this.board[i + 2][j + 2] = -1 * n;
					this.board[i + 2][j + 3] = -1 * n;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);
			case 2:
				if (((i + 3 < 10) && (j + 1 < 22) && (i >= 0) && (j + 1 >= 0)) && 
					((this.board[i][j + 1] <= 0) && (this.board[i + 1][j + 1] <= 0) && 
					(this.board[i + 2][j + 1] <= 0) && (this.board[i + 3][j + 1] <= 0)))
				{
					this.board[i][j + 1] = -1 * n;
					this.board[i + 1][j + 1] = -1 * n;
					this.board[i + 2][j + 1] = -1 * n;
					this.board[i + 3][j + 1] = -1 * n;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);
			case 3:
				if (((i + 1 < 10) && (j + 3 < 22) && (i + 1 >= 0) && (j >= 0)) && 
					(this.board[i + 1][j] <= 0) && (this.board[i + 1][j + 1] <= 0) && 
					(this.board[i + 1][j + 2] <= 0) && (this.board[i + 1][j + 3] <= 0))
				{
					this.board[i + 1][j] = -1 * n;
					this.board[i + 1][j + 1] = -1 * n;
					this.board[i + 1][j + 2] = -1 * n;
					this.board[i + 1][j + 3] = -1 * n;
					if (n == 1) 
					{
						this.posx = i;
						this.posy = j;
					}
					return (0);
				}
				else
					return (1);
		}
	}

	rotateJLZST(i, j)
	{
		//console.log(i, j, this.board[i][j], this.type, this.currentRotation);
		this.setPiece(i, j, 0);
		this.currentRotation = (this.currentRotation + 1) % 4;
		if (this.currentRotation == 0)
		{
			if (this.setPiece(i, j, 1) == 0)
				return 0;
			else if (this.setPiece(i - 1, j, 1) == 0)
				return 0;
			else if (this.setPiece(i - 1, j + 1, 1) == 0)
				return 0;
			else if (this.setPiece(i, j - 2, 1) == 0)
				return 0;
			else if (this.setPiece(i - 1, j - 2, 1) == 0)
				return 0;
			else
			{
				this.currentRotation = 3;
				return (this.setPiece(i, j, 1));
			}
		}
		if (this.currentRotation == 1)
		{
			if (this.setPiece(i, j, 1) == 0)
				return 0;
			else if (this.setPiece(i - 1, j, 1) == 0)
				return 0;
			else if (this.setPiece(i - 1, j - 1, 1) == 0)
				return 0;
			else if (this.setPiece(i, j + 2, 1) == 0)
				return 0;
			else if (this.setPiece(i - 1, j + 2, 1) == 0)
				return 0;
			else
			{
				this.currentRotation--;
				return (this.setPiece(i, j, 1));
			}
		}
		if (this.currentRotation == 2)
		{
			if (this.setPiece(i, j, 1) == 0)
				return 0;
			else if (this.setPiece(i + 1, j, 1) == 0)
				return 0;
			else if (this.setPiece(i + 1, j + 1, 1) == 0)
				return 0;
			else if (this.setPiece(i, j - 2, 1) == 0)
				return 0;
			else if (this.setPiece(i + 1, j - 2, 1) == 0)
				return 0;
			else
			{
				this.currentRotation--;
				return (this.setPiece(i, j, 1));
			}
		}
		if (this.currentRotation == 3)
		{
			if (this.setPiece(i, j, 1) == 0)
				return 0;
			else if (this.setPiece(i - 1, j, 1) == 0)
				return 0;
			else if (this.setPiece(i - 1, j + 1, 1) == 0)
				return 0;
			else if (this.setPiece(i, j - 2, 1) == 0)
				return 0;
			else if (this.setPiece(i - 1, j - 2, 1) == 0)
				return 0;
			else
			{
				this.currentRotation--;
				return (this.setPiece(i, j, 1));
			}
		}
	}

	rotateI(i, j)
	{
		//console.log(i, j, this.board[i][j], this.type, this.currentRotation);
		this.setPiece(i, j, 0);
		this.currentRotation = (this.currentRotation + 1) % 4;
		if (this.currentRotation == 0)
		{
			if (this.setPiece(i, j, 1) == 0)
				return 0;
			else if (this.setPiece(i + 1, j, 1) == 0)
				return 0;
			else if (this.setPiece(i - 2, j, 1) == 0)
				return 0;
			else if (this.setPiece(i + 1, j + 2, 1) == 0)
				return 0;
			else if (this.setPiece(i - 2, j - 1, 1) == 0)
				return 0;
			else
			{
				this.currentRotation = 3;
				return (this.setPiece(i, j, 1));
			}
		}
		if (this.currentRotation == 1)
		{
			if (this.setPiece(i, j, 1) == 0)
				return 0;
			else if (this.setPiece(i - 2, j, 1) == 0)
				return 0;
			else if (this.setPiece(i + 1, j, 1) == 0)
				return 0;
			else if (this.setPiece(i - 2, j + 1, 1) == 0)
				return 0;
			else if (this.setPiece(i + 1, j - 2, 1) == 0)
				return 0;
			else
			{
				this.currentRotation--;
				return (this.setPiece(i, j, 1));
			}
		}
		if (this.currentRotation == 2)
		{
			if (this.setPiece(i, j, 1) == 0)
				return 0;
			else if (this.setPiece(i - 1, j, 1) == 0)
				return 0;
			else if (this.setPiece(i + 2, j + 1, 1) == 0)
				return 0;
			else if (this.setPiece(i - 1, j - 2, 1) == 0)
				return 0;
			else if (this.setPiece(i + 2, j + 1, 1) == 0)
				return 0;
			else
			{
				this.currentRotation--;
				return (this.setPiece(i, j, 1));
			}
		}
		if (this.currentRotation == 3)
		{
			if (this.setPiece(i, j, 1) == 0)
				return 0;
			else if (this.setPiece(i + 2, j, 1) == 0)
				return 0;
			else if (this.setPiece(i - 1, j, 1) == 0)
				return 0;
			else if (this.setPiece(i + 2, j - 1, 1) == 0)
				return 0;
			else if (this.setPiece(i - 1, j + 2, 1) == 0)
				return 0;
			else
			{
				this.currentRotation--;
				return (this.setPiece(i, j, 1));
			}
		}
	}
}
module.exports = Player;