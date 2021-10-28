export class MocketSocket {
	public rooms: Set<string>;

	constructor() {
		this.rooms = new Set<string>();
	}

	join(rooms: string | Array<string>) {
		if (typeof rooms === 'string') {
			rooms = [rooms];
		}

		rooms.forEach(e => this.rooms.add(e));
	}

	leave(room: string) {
		this.rooms.delete(room);
	}

	leaveAll() {
		this.rooms.clear();
	}
}