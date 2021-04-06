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
	gameOver = 0;
	start = 1;
	posI = 0;
	posJ = 0;
	type = 0;


	// board[x][y] = x Horizontal | y Vertical
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

	setPiece(i, j, n)
	{
		switch (this.type) {
			default:
				console.log("qu'est ce que tu fous ici");
				break;
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
		return 
	}
 	
 	newPiece(i) {
 		console.log(i.type);
		switch (i.type) {
			default:
				this.type = -1;
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
				if (!this.setPiece(4, 2, 1))
					break ;
				else if (!this.setPiece(4, 1, 1))
					break ;
				else
				{
					this.gameOver = 1;
					console.log("game over man, game over...")
				}
				break;
			case "S":
				this.type = -4;
				if (!this.setPiece(6, 1, 1))
					break ;
				else if (!this.setPiece(6, 0, 1))
					break ;
				else
				{
					this.gameOver = 1;
					console.log("game over man, game over...")
				}
				break;
			case "Z":
				this.type = -5;
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
			case "J":
				this.type = -6;
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
			case "L":
				this.type = -7;
				if (!this.setPiece(6, 2, 1))
					break ;
				else if (!this.setPiece(6, 1, 1))
					break ;
				else
				{
					this.gameOver = 1;
					console.log("game over man, game over...")
				}
				break;
		}
		console.log("test");
	}

	placePiece() {
		for (let i = 0 ; i < 10 ; i++) {
			for (let j = 0 ; j < 22 ; j++) {
				if (this.board[i][j] < 0)
					this.board[i][j] = -this.board[i][j];
			}
		}
		this.currentPiece++;
		this.currentRotation = 0;
		this.newPiece(this.pieces[this.currentPiece]);
	}

	rotatePiece()
	{
		for (let j = 0 ; j < 22 ; j++) {
			for (let i = 0 ; i < 10 ; i++) {
				if (this.board[i][j] < 0)
				{
					if (this.board[i][j] == -1)
						this.rotateI(i, j);
					else if (this.board[i][j] == -2)
						return (0);
					else if (this.board[i][j] <= -3 && this.board[i][j] >= -7)
						console.log(this.rotateJLZST(i, j, this.board[i][j]));
					else
						return (1);
					return (0);
				}
			}
		}
	}

	setO(i, j, n)
	{
		console.log("piece : ", this.type, "   i, j : ", i, j,"   n : ", n, "   rotation :", this.currentRotation);
		if (((i + 1 < 10) && (j + 1 < 22) && (i >= 0) && (j >= 0)) &&
			(this.board[i][j] <= 0) && (this.board[i + 1][j] <= 0) &&
			(this.board[i][j + 1] <= 0) && (this.board[i + 1][j + 1] <= 0))
		{
			this.board[i][j] = n * -2;
			this.board[i + 1][j] = n * -2;
			this.board[i][j + 1] = n * -2;
			this.board[i + 1][j + 1] = n * -2;
			return (0);
		}
		return (1);
	}

	setJ(i, j, n)
	{
		console.log("piece : ", this.type, "   i, j : ", i, j,"   n : ", n, "   rotation :", this.currentRotation);
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
					this.posJ = j;
					this.posI = i;
					return (0);
				}
				else
					return (1);
			case 1:
				i--;
				if (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
					((this.board[i + 1][j] <= 0) && (this.board[i + 2][j] <= 0) && 
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 1][j + 2] <= 0)))
				{
					this.board[i + 1][j] = n * -6;
					this.board[i + 2][j] = n * -6;
					this.board[i + 1][j + 1] = n * -6;
					this.board[i + 1][j + 2] = n * -6;
					this.posI = i + 1;
					this.posJ = j;
					return (0);
				}
				else
					return (1);
			case 2:
				j--;
				if (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
					((this.board[i][j + 1] <= 0) && (this.board[i + 1][j + 1] <= 0) &&
					(this.board[i + 2][j + 1] <= 0) && (this.board[i + 2][j + 2] <= 0)))
				{
					this.board[i][j + 1] = n * -6;
					this.board[i + 1][j + 1] = n * -6;
					this.board[i + 2][j + 1] = n * -6;
					this.board[i + 2][j + 2] = n * -6;
					this.posI = i;
					this.posJ = j + 1;
					return (0);
				}
				else
					return (1);
			case 3:
				i--;
				if (((i + 1 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
					((this.board[i][j + 2] <= 0) && (this.board[i + 1][j] <= 0) &&
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 1][j + 2] <= 0)))
				{
					this.board[i][j + 2] = n * -6;
					this.board[i + 1][j] = n * -6;
					this.board[i + 1][j + 1] = n * -6;
					this.board[i + 1][j + 2] = n * -6;
					this.posI = i;
					this.posJ = j + 2;
					return (0);
				}
				else
					return (1);

		}
	}

	setL(i, j, n)
	{
		console.log("piece : ", this.type, "   i, j : ", i, j,"   n : ", n, "   rotation :", this.currentRotation);
		switch (this.currentRotation) {
			default:
				return (-1);
			case 0:
				i -= 2;
				if (((i + 2 < 10) && (j + 1 < 22) && (i >= 0) && (j >= 0)) && 
					(this.board[i + 2][j] <= 0) && (this.board[i][j + 1] <= 0) && 
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 2][j + 1] <= 0))
				{
					this.board[i + 2][j] = -7 * n;
					this.board[i][j + 1] = -7 * n;
					this.board[i + 1][j + 1] = -7 * n;
					this.board[i + 2][j + 1] = -7 * n;
					this.posJ = j + 1;
					this.posI = i;
					return (0);
				}
				else
					return (1);
			case 1:
				i--;
				if (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
					((this.board[i + 1][j] <= 0) && (this.board[i + 2][j + 2] <= 0) && 
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 1][j + 2] <= 0)))
				{
					this.board[i + 1][j + 1] = -7 * n;
					this.board[i + 1][j] = -7 * n;
					this.board[i + 1][j + 2] = -7 * n;
					this.board[i + 2][j + 2] = -7 * n;
					this.posI = i + 1;
					this.posJ = j;
					return (0);
				}
				else
					return (1);
			case 2:
				j--;
				if (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
					((this.board[i][j + 1] <= 0) && (this.board[i + 1][j + 1] <= 0) &&
					(this.board[i + 2][j + 1] <= 0) && (this.board[i][j + 2] <= 0)))
				{
					this.board[i][j + 1] = -7 * n;
					this.board[i + 1][j + 1] = -7 * n;
					this.board[i + 2][j + 1] = -7 * n;
					this.board[i][j + 2] = -7 * n;
					this.posI = i;
					this.posJ = j + 1;
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
					this.posI = i;
					this.posJ = j;
					return (0);
				}
				else
					return (1);

		}
	}

	setZ(i, j, n)
	{
		console.log("piece : ", this.type, "   i, j : ", i, j,"   n : ", n, "   rotation :", this.currentRotation);
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
					this.posJ = j;
					this.posI = i;
					return (0);
				}
				else
					return (1);
			case 1:
				if (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
					((this.board[i + 2][j] <= 0) && (this.board[i + 2][j + 1] <= 0) && 
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 1][j + 2] <= 0)))
				{
					i -= 2;
					this.board[i + 1][j + 1] = -5 * n;
					this.board[i + 1][j + 2] = -5 * n;
					this.board[i + 2][j] = -5 * n;
					this.board[i + 2][j + 1] = -5 * n;
					this.posI = i + 1;
					this.posJ = j + 1;
					return (0);
				}
				else
					return (1);
			case 2:
				j--;
				if (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
					((this.board[i + 1][j + 2] <= 0) && (this.board[i + 1][j + 1] <= 0) &&
					(this.board[i + 2][j + 2] <= 0) && (this.board[i][j + 1] <= 0)))
				{
					this.board[i][j + 1] = -5 * n;
					this.board[i + 1][j + 1] = -5 * n;
					this.board[i + 1][j + 2] = -5 * n;
					this.board[i + 2][j + 2] = -5 * n;
					this.posI = i;
					this.posJ = j + 1;
					return (0);
				}
				else
					return (1);
			case 3:
				i--;
				if (((i + 1 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
					((this.board[i + 1][j] <= 0) && (this.board[i][j + 1] <= 0) &&
					(this.board[i + 1][j + 1] <= 0) && (this.board[i][j + 2] <= 0)))
				{
					this.board[i][j + 1] = -5 * n;
					this.board[i][j + 2] = -5 * n;
					this.board[i + 1][j] = -5 * n;
					this.board[i + 1][j + 1] = -5 * n;
					this.posI = i;
					this.posJ = j + 1;
					return (0);
				}
				else
					return (1);

		}
	}

	setS(i, j, n)
	{
		console.log("piece : ", this.type, "   i, j : ", i, j,"   n : ", n, "   rotation :", this.currentRotation);
		switch (this.currentRotation) {
			default:
				return (-1);
			case 0:
				i--;
				if (((i + 2 < 10) && (j + 1 < 22) && (i >= 0) && (j >= 0)) && 
					((this.board[i + 2][j] <= 0) && (this.board[i][j + 1] <= 0) && 
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 1][j] <= 0)))
				{
					this.board[i][j + 1] = -4 * n;
					this.board[i + 1][j] = -4 * n;
					this.board[i + 1][j + 1] = -4 * n;
					this.board[i + 2][j] = -4 * n;
					this.posI = i;
					this.posJ = j + 1;
					return (0);
				}
				else
					return (1);
			case 1:
				i--;
				if (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
					((this.board[i + 1][j] <= 0) && (this.board[i + 2][j + 2] <= 0) && 
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 2][j + 1] <= 0)))
				{
					this.board[i + 1][j] = -4 * n;
					this.board[i + 1][j + 1] = -4 * n;
					this.board[i + 2][j + 1] = -4 * n;
					this.board[i + 2][j + 2] = -4 * n;
					this.posI = i + 1;
					this.posJ = j;
					return (0);
				}
				else
					return (1);
			case 2:
				i--;
				j--;
				if (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
					((this.board[i + 1][j + 2] <= 0) && (this.board[i + 1][j + 1] <= 0) &&
					(this.board[i + 2][j + 1] <= 0) && (this.board[i][j + 2] <= 0)))
				{
					this.board[i][j + 2] = -4 * n;
					this.board[i + 1][j + 1] = -4 * n;
					this.board[i + 1][j + 2] = -4 * n;
					this.board[i + 2][j + 1] = -4 * n;
					this.posI = i;
					this.posJ = j + 2;
					return (0);
				}
				else
					return (1);
			case 3:
				if (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
					((this.board[i][j] <= 0) && (this.board[i][j + 1] <= 0) &&
					(this.board[i + 1][j + 1] <= 0) && (this.board[i + 1][j + 2] <= 0)))
				{
					this.board[i][j] = -4 * n;
					this.board[i][j + 1] = -4 * n;
					this.board[i + 1][j + 1] = -4 * n;
					this.board[i + 1][j + 2] = -4 * n;
					this.posI = i;
					this.posJ = j;
					return (0);
				}
				else
					return (1);

		}
	}

	rotateJLZST(i, j)
	{
		console.log(i, j, this.board[i][j], this.type, this.currentRotation);
		this.setPiece(i, j, 0);
		this.currentRotation = (this.currentRotation + 1) % 4;
		if (this.currentRotation == 0)
		{
			if (this.type == -4)
				i++;
			if (this.type == -6 || this.type == -5)
				i--;
			if (this.type == -7)
				i+= 2;
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
				if (this.type == -7)
					i -= 2;
				if (this.type == -4)
					i--;
				if (this.type == -6 || this.type == -5)
					i++;

				this.currentRotation = 4;
				return (this.setPiece(i, j, 1));
			}
		}
		if (this.currentRotation == 1)
		{
			if (this.type == -6)
				i++;
			if (this.type == -7)
				i--;
			if (this.type == -5)
				i+=2;
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
				if (this.type == -6)
					i--;
				if (this.type == -7)
					i++;
				if (this.type == -5)
					i-=2;	
				this.currentRotation--;
				return (this.setPiece(i, j, 1));
			}
		}
		if (this.currentRotation == 2)
		{
			if (this.type == -4)
				j++;
			if (this.type == -6 || this.type == -7)
				i--, j++;
			if (this.type == -5)
				i-=2, j++;
			if (this.setPiece(i, j, 1) == 0)
				return 0;
			else if (this.setPiece(i + 1, j, 1) == 0)
				return 0;
			else if (this.setPiece(i + 1, j - 1, 1) == 0)
				return 0;
			else if (this.setPiece(i, j + 2, 1) == 0)
				return 0;
			else if (this.setPiece(i + 1, j + 2, 1) == 0)
				return 0;
			else
			{
				if (this.type == -5)
					i+=2, j--;
				if (this.type == -4)
					j--;
				if (this.type == -6 || this.type == -7)
					i++, j--;
				this.currentRotation--;
				return (this.setPiece(i, j, 1));
			}
		}
		if (this.currentRotation == 3)
		{
			if (this.type == -4)
				i--, j--;
			if (this.type == -6 || this.type == -5)
				i++, j--;
			if (this.type == -7)
				j--;
			
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
				if (this.type == -4)
					i++, j++;
				if (this.type == -6 || this.type == -5)
					i--, j++;
				if (this.type == -7)
					j++;
				this.currentRotation--;
				return (this.setPiece(i, j, 1));
			}
		}
	}


	testT0(i, j)
	{
		return (((i + 1 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
			(this.board[i + 1][j] <= 0) && (this.board[i][j + 1] <= 0) && 
			(this.board[i + 1][j + 1] <= 0) && (this.board[i + 1][j + 2] <= 0))
	}

	resetT0(i, j)
	{
		this.board[i + 1][j] = 0;
		this.board[i + 1][j + 1] = 0;
		this.board[i + 1][j + 2] = 0;
		this.board[i][j + 1] = 0;
	}

	placeT0(i, j)
	{
		this.board[i + 1][j] = -3;
		this.board[i][j + 1] = -3;
		this.board[i + 1][j + 1] = -3;
		this.board[i + 2][j + 1] = -3;
	}

	testT1(i, j)
	{
		return (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
			((this.board[i + 1][j] <= 0) && (this.board[i + 2][j + 1] <= 0) && 
			(this.board[i + 1][j + 1] <= 0) && (this.board[i + 1][j + 2] <= 0)))
	}

	resetT1(i, j)
	{
		this.board[i + 1][j] = 0;
		this.board[i + 1][j + 1] = 0;
		this.board[i][j + 1] = 0;
		this.board[i + 2][j + 2] = 0;
	}

	placeT1(i, j)
	{
		this.board[i + 1][j] = -3;
		this.board[i + 2][j + 1] = -3;
		this.board[i + 1][j + 1] = -3;
		this.board[i + 1][j + 2] = -3;
	}

	testT2(i, j)
	{
		return (((i + 2 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
			((this.board[i + 1][j] <= 0) && (this.board[i + 1][j + 1] <= 0) &&
			(this.board[i + 2][j + 1] <= 0) && (this.board[i + 1][j + 2] <= 0)))
	}
	
	resetT2(i, j)
	{
		this.board[i + 1][j] = 0;
		this.board[i + 2][j + 1] = 0;
		this.board[i + 1][j + 1] = 0;
		this.board[i + 1][j + 2] = 0;
	}

	placeT2(i, j)
	{
		this.board[i + 1][j + 2] = -3;
		this.board[i][j + 1] = -3;
		this.board[i + 1][j + 1] = -3;
		this.board[i + 2][j + 1] = -3;
	}

	testT3(i, j)
	{
		return (((i + 1 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
			((this.board[i + 1][j] <= 0) && (this.board[i][j + 1] <= 0) &&
			(this.board[i + 1][j + 1] <= 0) && (this.board[i + 1][j + 2] <= 0)))

	}
	resetT3(i, j)
	{
		this.board[i + 1][j] = 0;
		this.board[i + 1][j + 1] = 0;
		this.board[i + 2][j + 1] = 0;
		this.board[i + 1][j + 2] = 0;
	}

	placeT3(i, j)
	{
		this.board[i + 1][j] = -3;
		this.board[i][j + 1] = -3;
		this.board[i + 1][j + 1] = -3;
		this.board[i + 1][j + 2] = -3;
	}

	rotateT(i, j)
	{
		console.log(i, j, this.board[i][j]);
		switch (this.currentRotation) {
			default:
				break;
			case 0:
				i--;
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
				i--;
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
				i--;
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
				j--;
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
					this.placeT3(i, j + 2);
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
			(this.board[i][j + 1] <= 0) && (this.board[i + 1][j + 1] <= 0) && 
			(this.board[i + 2][j + 1] <= 0) && (this.board[i + 3][j + 1] <= 0))
	}

	resetI0(i, j)
	{
		this.board[i + 1][j] = 0;
		this.board[i + 1][j + 1] = 0;
		this.board[i + 1][j + 2] = 0;
		this.board[i + 1][j + 3] = 0;
	}

	placeI0(i, j)
	{
		this.board[i][j + 1] = -1;
		this.board[i + 1][j + 1] = -1;
		this.board[i + 2][j + 1] = -1;
		this.board[i + 3][j + 1] = -1;
	}

	testI1(i, j)
	{
		return (((i + 2 < 10) && (j + 3 < 22) && (i >= 0) && (j >= 0)) && 
			((this.board[i + 2][j] <= 0) && (this.board[i + 2][j + 1] <= 0) && 
			(this.board[i + 2][j + 2] <= 0) && (this.board[i + 2][j + 3] <= 0)))
	}

	resetI1(i, j)
	{
		this.board[i][j + 1] = 0;
		this.board[i + 1][j + 1] = 0;
		this.board[i + 2][j + 1] = 0;
		this.board[i + 3][j + 1] = 0;
	}

	placeI1(i, j)
	{
		this.board[i + 2][j] = -1;
		this.board[i + 2][j + 1] = -1;
		this.board[i + 2][j + 2] = -1;
		this.board[i + 2][j + 3] = -1;
	}

	testI2(i, j)
	{
		return (((i + 3 < 10) && (j + 2 < 22) && (i >= 0) && (j >= 0)) && 
			((this.board[i][j + 2] <= 0) && (this.board[i + 1][j + 2] <= 0) &&
			(this.board[i + 2][j + 2] <= 0) && (this.board[i + 3][j + 2] <= 0)))
	}
	
	resetI2(i, j)
	{
		this.board[i + 2][j] = 0;
		this.board[i + 2][j + 1] = 0;
		this.board[i + 2][j + 2] = 0;
		this.board[i + 2][j + 3] = 0;
	}

	placeI2(i, j)
	{
		this.board[i][j + 2] = -1;
		this.board[i + 1][j + 2] = -1;
		this.board[i + 2][j + 2] = -1;
		this.board[i + 3][j + 2] = -1;
	}

	testI3(i, j)
	{
		return (((i + 1 < 10) && (j + 3 < 22) && (i >= 0) && (j >= 0)) && 
			((this.board[i + 1][j] <= 0) && (this.board[i + 1][j + 1] <= 0) &&
			(this.board[i + 1][j + 2] <= 0) && (this.board[i + 1][j + 3] <= 0)))

	}
	resetI3(i, j)
	{
		this.board[i][j + 2] = 0;
		this.board[i + 1][j + 2] = 0;
		this.board[i + 2][j + 2] = 0;
		this.board[i + 3][j + 2] = 0;
	}

	placeI3(i, j)
	{
		this.board[i + 1][j] = -1;
		this.board[i + 1][j + 1] = -1;
		this.board[i + 1][j + 2] = -1;
		this.board[i + 1][j + 3] = -1;
	}

	rotateI(i, j)
	{
		switch (this.currentRotation) {
			default:
				break;
			case 0:
				i--;
				if (this.testI0(i, j))
				{
					this.resetI0(i, j);
					this.placeI0(i, j);
				}
				else if (this.testI0(i - 2, j))
				{
					this.resetI0(i, j);
					this.placeI0(i - 2, j);
				}
				else if (this.testI0(i + 1, j))
				{
					this.resetI0(i, j);
					this.placeI0(i + 1, j);
				}
				else if (this.testI0(i - 2, j - 1))
				{
					this.resetI0(i, j);
					this.placeI0(i - 2, j - 1);
				}
				else if (this.testI0(i + 1, j + 2))
				{
					this.resetI0(i, j);
					this.placeI0(i + 1, j + 2);
				}
				else
					this.currentRotation = 4;
				break;
			case 1:
				j--;
				if (this.testI1(i, j))
				{
					this.resetI1(i, j);
					this.placeI1(i, j);
				}
				else if (this.testI1(i - 1, j))
				{
					this.resetI1(i, j);
					this.placeI1(i - 1, j);
				}
				else if (this.testI1(i + 2, j))
				{
					this.resetI1(i, j);
					this.placeI1(i + 2, j);
				}
				else if (this.testI1(i - 1, j + 2))
				{
					this.resetI1(i, j);
					this.placeI1(i - 1, j + 2);
				}
				else if (this.testI1(i + 2, j - 1))
				{
					this.resetI1(i, j);
					this.placeI1(i + 2, j - 1);
				}
				else
					this.currentRotation--;
				break;
			case 2:
				i-=2;
				if (this.testI2(i, j))
				{
					this.resetI2(i, j);
					this.placeI2(i, j);
				}
				else if (this.testI2(i + 2, j))
				{
					this.resetI2(i, j);
					this.placeI2(i + 2, j);
				}
				else if (this.testI2(i - 1, j))
				{
					this.resetI2(i, j);
					this.placeI2(i - 1, j);
				}
				else if (this.testI2(i + 2, j + 1))
				{
					this.resetI2(i, j);
					this.placeI2(i + 2, j + 1);
				}
				else if (this.testI2(i - 1, j - 2))
				{
					this.resetI2(i, j);
					this.placeI2(i - 1, j - 2);
				}
				else
					this.currentRotation--;
				break;
			case 3:
				j-=2;
				if (this.testI3(i, j))
				{
					this.resetI3(i, j);
					this.placeI3(i, j);
				}
				else if (this.testI3(i + 1, j))
				{
					this.resetI3(i, j);
					this.placeI3(i + 1, j);
				}
				else if (this.testI3(i - 2, j))
				{
					this.resetI3(i, j);
					this.placeI3(i - 2, j);
				}
				else if (this.testI3(i + 1, j - 2))
				{
					this.resetI3(i, j);
					this.placeI3(i + 1, j - 2);
				}
				else if (this.testI3(i - 2, j + 1))
				{
					this.resetI3(i, j);
					this.placeI3(i - 2, j + 1);
				}
				else
					this.currentRotation--;
				break;
		}
	}
}

module.exports = Player;