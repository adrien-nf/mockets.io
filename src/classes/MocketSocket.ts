export declare type Room = string;

export class MocketSocket {
	public rooms: Set<string>;
	public connected: boolean;

	get disconnected() {
		return !this.connected;
	}

	constructor() {
		this.rooms = new Set<string>();
		this.connected = true;
	}

	public join(rooms: Room | Array<Room>) {
		if (typeof rooms === 'string') {
			rooms = [rooms];
		}

		rooms.forEach(e => {
			this.rooms.add(e)
		});
	}

	leave(room: Room) {
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