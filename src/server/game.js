class Game {
	players = {};
	level = 1;

	addPlayer(playerId, newPlayer) {
		this.players[playerId] = newPlayer;
	}

	removePlayer(playerId) {
		this.players[playerId] = null;
	}

	getPlayers() {
		return this.players;
	}

	getPlayer(playerId) {
		return this.players[playerId];
	}

	updateLevel()
	{
		for (let id in this.getPlayers())
		{
			if (this.level < this.getPlayer(id).level)
				this.level = this.getPlayer(id).level | 0;
		}
	}
}

module.exports = Game;