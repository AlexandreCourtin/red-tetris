import React, {Component} from "react";

class ClientComponent extends Component {
	render() {	
		return (
			<div>
				<p>room name: {this.props.clientRoomName}</p>
				<p>player name: {this.props.clientPlayerName}</p>
			</div>
		);
	}
}

export default ClientComponent;