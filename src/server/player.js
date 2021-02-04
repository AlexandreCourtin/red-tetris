class Player {
	name = 'defaultPlayer';
	room = 'defaultRoom';

	constructor(name, room) {
		this.name = name;
		this.room = room;
	}

	get name() {
		return this.name;
	}

	get room() {
		return this.room;
	}
}

module.exports = Player;