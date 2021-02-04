class Game {
	players = {};

	addPlayer(playerId, newPlayer) {
		this.players[playerId] = newPlayer;
	}

	removePlayer(playerId) {
		this.players[playerId] = null;
	}

	getPlayer(playerId) {
		return this.players[playerId];
	}
}

module.exports = Game;