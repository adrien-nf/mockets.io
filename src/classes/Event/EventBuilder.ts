import type { Room, EventName } from './../types/types';
import { MocketServer } from "../Server/MocketServer";
import { Event } from './Event';
import { EventSender } from '../../interfaces/EventSender/EventSender';

export class EventBuilder {
	public server: MocketServer;
	public sender: EventSender;
	public rooms: Set<Room> = new Set<Room>();
	public eventName: EventName;
	public args: unknown[];

	constructor(server: MocketServer, sender: EventSender) {
		this.server = server;
		this.sender = sender;
	}

	to(room: Room): this {
		this.rooms.add(room);
		return this;
	}

	emit(ev: EventName, ...args: unknown[]): Event {
		this.eventName = ev;
		this.args = args;
		const event = this.toEvent();
		this.server.notify(event);
		this.sender.sentEvents.push(event);
		return event;
	}

	toEvent(): Event {
		return new Event(this);
	}
}