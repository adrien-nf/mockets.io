import { MocketSocket, Room } from "./MocketSocket";

export class EnhancedMocketSocket extends MocketSocket {
	public joinedRooms: Set<string>;

	constructor() {
		super();
		this.joinedRooms = new Set<string>();
	}

	public join(rooms: Room | Array<Room>) {
		if (typeof rooms === 'string') {
			rooms = [rooms];
		}

		rooms.forEach(e => {
			this.rooms.add(e)
			this.joinedRooms.add(e)
		});
	}

	public isInRoom(room: Room) {
		return this.rooms.has(room);
	}

	public hasBeenInRoom(room: Room) {
		return this.joinedRooms.has(room);
	}
}