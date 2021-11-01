import type { Room, EventName } from './../types/types';
import { Event } from './Event';
import { EventSender } from '../../interfaces/EventSender/EventSender';
import { Namespace } from '../Server/Namespace';

export class EventBuilder {
	public namespace: Namespace;
	public sender: EventSender;
	public rooms: Set<Room> = new Set<Room>();
	public name: EventName;
	public args: unknown[];

	constructor(namespace: Namespace, sender: EventSender) {
		this.namespace = namespace;
		this.sender = sender;
	}

	to(room: Room): this {
		this.rooms.add(room);
		return this;
	}

	emit(ev: EventName, ...args: unknown[]): Event {
		this.name = ev;
		this.args = args;
		const event = this.toEvent();
		this.namespace.transmit(event);
		this.sender.sentEvents.push(this);
		return event;
	}

	toEvent(): Event {
		return new Event(this);
	}
}