import { EventSender } from './../../interfaces/EventSender/EventSender';
import { EventReceiver } from './../../interfaces/EventReceiver/EventReceiver';
import { MocketSocket } from "../..";
import { Event } from "../Event/Event";
import { EventBuilder } from '../Event/EventBuilder';
import { EventName } from '../types/types';

export class MocketServer implements EventReceiver, EventSender {
	public sockets = new Set<MocketSocket>();
	public receivedEvents = new Array<Event>();
	public sentEvents = new Array<Event>();
	static currentServerId = 1;
	static currentSocketId = 1;
	public id: number;

	constructor() {
		this.id = MocketServer.currentServerId++;
	}

	createSocket(): MocketSocket {
		const mSocket = new MocketSocket(this);
		this.registerSocket(mSocket);
		return mSocket;
	}

	registerSocket(mSocket: MocketSocket) {
		this.sockets.add(mSocket);
		mSocket.id = MocketServer.currentSocketId++;
	}

	notify(event: Event) {
		if (event.rooms.size > 0) {
			this.getDestinationSocketsForEvent(event).forEach(socket => socket.notify(event))
		} else {
			this.receivedEvents.push(event);
		}
	}

	private getDestinationSocketsForEvent(event: Event): MocketSocket[] {
		return [...this.connectedSockets]
			.filter(socket => [...socket.rooms]
				.some(room => event.rooms.has(room)))
			.filter(socket => socket.id !== event.sender.id);
	}

	emit(ev: EventName, ...args): void {
		const event = (new EventBuilder(this, this)).emit(ev, args);
		this.connectedSockets.forEach(e => e.notify(event));
	}

	get connectedSockets(): Set<MocketSocket> {
		return (new Set([...this.sockets].filter(e => e.connected)));
	}
}