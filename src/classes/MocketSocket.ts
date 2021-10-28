export class MocketSocket {
	public rooms: Set<string>;
	public joinedRooms: Set<string>;
	public connected: boolean;

	get disconnected() {
		return !this.connected;
	}

	constructor() {
		this.rooms = new Set<string>();
		this.joinedRooms = new Set<string>();
		this.connected = true;
	}

	join(rooms: string | Array<string>) {
		if (typeof rooms === 'string') {
			rooms = [rooms];
		}

		rooms.forEach(e => {
			this.rooms.add(e)
			this.joinedRooms.add(e)
		});
	}

	leave(room: string) {
		this.rooms.delete(room);
	}

	leaveAll() {
		this.rooms.clear();
	}

	disconnect(): this {
		this.connected = false;

		return this;
	}
}