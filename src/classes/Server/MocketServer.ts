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

	createSocket(): MocketSocket {
		const mSocket = new MocketSocket(this);
		this.sockets.add(mSocket);
		return mSocket;
	}

	notify(event: Event) {
		this.receivedEvents.push(event);
	}

	emit(ev: EventName, ...args): void {
		const event = (new EventBuilder(this)).emit(ev, args);
		this.sentEvents.push(event);
		this.connectedSockets.forEach(e => e.notify(event));
	}

	get connectedSockets(): Set<MocketSocket> {
		return (new Set([...this.sockets].filter(e => e.connected)));
	}
}