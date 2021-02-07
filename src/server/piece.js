//  PIECES TYPE: I, O, T, S, Z, J, and L

class Piece {
	type = 'I';

	constructor(type) {
		this.type = type;
	}

	getType() {
		this.type;
	}

	static getTypeFromInt(i) {
		switch (i) {
			default:
				return 'I';
				break;
			case 1:
				return 'O';
				break;
			case 2:
				return 'T';
				break;
			case 3:
				return 'S';
				break;
			case 4:
				return 'Z';
				break;
			case 5:
				return 'J';
				break;
			case 6:
				return 'L';
				break;
		}
	}
}

module.exports = Piece;