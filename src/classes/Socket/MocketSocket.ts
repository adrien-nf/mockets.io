import { EventSender } from './../../interfaces/EventSender/EventSender';
import { EventReceiver } from './../../interfaces/EventReceiver/EventReceiver';
import { EventName, Handshake, Room } from './../types/types';
import { EventBuilder } from "../Event/EventBuilder";
import { Event } from '../Event/Event';
import { EventPlayer } from '../Event/EventPlayer/EventPlayer';
import { EventRegisterer } from '../../interfaces/EventRegisterer/EventRegisterer';
import { Namespace } from '../Server/Namespace';

export class MocketSocket implements EventReceiver, EventSender, EventRegisterer {
	public rooms: Set<Room> = new Set<Room>();
	public joinedRooms: Set<Room> = new Set<Room>();
	public connected = true;
	public namespace: Namespace;
	public receivedEvents = new Array<Event>();
	public sentEvents = new Array<Event>();
	public eventPlayer = new EventPlayer();
	public id: number;
	public handshake: Handshake;

	get disconnected() {
		return !this.connected;
	}

	constructor(namespace: Namespace) {
		this.namespace = namespace;
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
		return (new EventBuilder(this.namespace, this)).to(room);
	}

	in(room: Room): EventBuilder {
		return this.to(room);
	}

	emit(ev: EventName, ...args: unknown[]): void {
		const event: Event = new Event({ namespace: this.namespace, rooms: new Set(), name: ev, args: args, sender: this })
		this.sentEvents.push(event);
		this.eventPlayer.play(event);
	}

	notify(event: Event) {
		this.receivedEvents.push(event);
		this.eventPlayer.play(event);
	}

	on(eventName: Event['name'], callback: CallableFunction) {
		this.eventPlayer.on(eventName, callback);
	}

	off(eventName: Event['name'], callback: CallableFunction) {
		this.eventPlayer.off(eventName, callback);
	}

	once(eventName: Event['name'], callback: CallableFunction) {
		this.eventPlayer.once(eventName, callback);
	}
}