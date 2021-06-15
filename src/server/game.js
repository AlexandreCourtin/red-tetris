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
			if (this.getPlayer(id) && this.level < this.getPlayer(id).level)
				this.level = this.getPlayer(id).level | 0;
		}
	}

	sendGarbage(playerId, n)
	{
		for (let id in this.getPlayers())
		{
			if (this.getPlayer(id) && this.getPlayer(id) != playerId)
				this.getPlayer(id).setGarbage(this.getPlayer(id).garbageLines + n);
		//	console.log("garbage", this.getPlayer(id), this.getPlayer(id).garbageLines);
		}
	}
}

module.exports = Game;