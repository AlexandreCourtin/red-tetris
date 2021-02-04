import React, {Component} from "react";

class ClientComponent extends Component {
	render() {

		let otherPlayerNames = '';

		for (let id in this.props.serverState.players) {
			if (this.props.serverState.players[id]) {
				otherPlayerNames += this.props.serverState.players[id].name + ' ';
			}
		}

		return (
			<div>
				<p>room name: {this.props.clientRoomName}</p>
				<p>player name: {this.props.clientPlayerName}</p>
				<p>other players: {otherPlayerNames}</p>
			</div>
		);
	}
}

export default ClientComponent;