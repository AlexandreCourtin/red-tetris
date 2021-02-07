class Player {
	name = 'defaultPlayer';
	room = 'defaultRoom';
	isLeader = false;
	pieces = [];

	constructor(name, room, isLeader) {
		this.name = name;
		this.room = room;
		this.isLeader = isLeader;
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

	addPiece(p) {
		this.pieces.push(p);
	}

	getPiece(n) {
		return this.pieces[n];
	}
}

module.exports = Player;