import { EventSender } from './../../interfaces/EventSender/EventSender';
import { EventReceiver } from './../../interfaces/EventReceiver/EventReceiver';
import { EventName, Room } from './../types/types';
import { EventBuilder } from "../Event/EventBuilder";
import type { MocketServer } from "../Server/MocketServer";
import { Event } from '../Event/Event';

export class MocketSocket implements EventReceiver, EventSender {
	public rooms: Set<Room> = new Set<Room>();
	public joinedRooms: Set<Room> = new Set<Room>();
	public connected = true;
	public server: MocketServer;
	public receivedEvents = new Array<Event>();
	public sentEvents = new Array<Event>();

	get disconnected() {
		return !this.connected;
	}

	constructor(server: MocketServer) {
		this.server = server;
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

	to(room: Room): EventBuilder {
		return (new EventBuilder(this.server)).to(room);
	}

	in(room: Room): EventBuilder {
		return this.to(room);
	}

	emit(ev: EventName, ...args): void {
		const event = (new EventBuilder(this.server)).emit(ev, ...args)
		this.sentEvents.push(event);
		this.server.notify(event)
	}

	notify(event: Event) {
		this.receivedEvents.push(event);
	}
}