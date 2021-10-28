import type { Room, EventName } from './../types/types';
import { MocketServer } from "../Server/MocketServer";
import { Event } from './Event';

export class EventBuilder {
	public server: MocketServer;
	public rooms: Set<Room>;
	public eventName: EventName;
	public args: unknown[];

	constructor(server: MocketServer) {
		this.server = server;
	}

	to(room: Room): this {
		this.rooms.add(room);
		return this;
	}

	emit(ev: EventName, ...args: unknown[]): Event {
		this.eventName = ev;
		this.args = args;
		return this.toEvent();
	}

	toEvent(): Event {
		return new Event(this);
	}
}