class Player {
	name = 'defaultPlayer';
	room = 'defaultRoom';
	isLeader = 'false';

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

	getIsLeader() {
		return this.isLeader;
	}
}

module.exports = Player;