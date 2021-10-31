import { EventSender } from './../../interfaces/EventSender/EventSender';
import { EventReceiver } from './../../interfaces/EventReceiver/EventReceiver';
import { EventName, Room } from './../types/types';
import { EventBuilder } from "../Event/EventBuilder";
import type { MocketServer } from "../Server/MocketServer";
import { Event } from '../Event/Event';
import { EventPlayer } from '../Event/EventPlayer/EventPlayer';
import { EventRegisterer } from '../../interfaces/EventRegisterer/EventRegisterer';

export class MocketSocket implements EventReceiver, EventSender, EventRegisterer {
	public rooms: Set<Room> = new Set<Room>();
	public joinedRooms: Set<Room> = new Set<Room>();
	public connected = true;
	public server: MocketServer;
	public receivedEvents = new Array<Event>();
	public sentEvents = new Array<Event>();
	public eventPlayer = new EventPlayer();
	public id: number;

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
		return (new EventBuilder(this.server, this)).to(room);
	}

	in(room: Room): EventBuilder {
		return this.to(room);
	}

	emit(ev: EventName, ...args): void {
		(new EventBuilder(this.server, this)).emit(ev, ...args)
	}

	notify(event: Event) {
		this.receivedEvents.push(event);
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