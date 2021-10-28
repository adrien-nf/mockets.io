export class MocketSocket {
	public rooms: Set<string>;
	public joinedRooms: Set<string>;
	public connected: boolean;
	public disconnected: boolean;

	constructor() {
		this.rooms = new Set<string>();
		this.joinedRooms = new Set<string>();
		this.connected = true;
		this.disconnected = false;
	}

	join(rooms: string | Array<string>) {
		if (typeof rooms === 'string') {
			rooms = [rooms];
		}

		rooms.forEach(e => this.rooms.add(e));
		this.joinedRooms.forEach(e => this.rooms.add(e));
	}

	leave(room: string) {
		this.rooms.delete(room);
	}

	leaveAll() {
		this.rooms.clear();
	}

	disconnect(): this {
		this.disconnected = true;
		this.connected = true;

		return this;
	}
}