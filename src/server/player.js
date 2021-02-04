class Player {
	name = 'defaultPlayer';
	room = 'defaultRoom';

	constructor(name, room) {
		this.name = name;
		this.room = room;
	}

	getName() {
		return this.name;
	}

	getRoom() {
		return this.room;
	}
}

module.exports = Player;