import { Event } from './../Event/Event';
import { MocketServer } from './MocketServer';
import { EventPlayer } from '../Event/EventPlayer/EventPlayer';
import { EventRegisterer } from './../../interfaces/EventRegisterer/EventRegisterer';
import { EventSender } from '../../interfaces/EventSender/EventSender';
import { MocketSocket } from '../..';
import { EventBuilder } from '../Event/EventBuilder';
import { MocketServerEventName } from './types';
import { EventTransmitter } from '../../interfaces/EventTransmitter/EventTransmitter';
import { Auth, Room } from '../types/types';

export class Namespace implements EventTransmitter, EventSender, EventRegisterer {
	public currentSocketId = 1;
	public sockets = new Set<MocketSocket>();
	protected eventPlayer = new EventPlayer();
	public server: MocketServer;
	public sentEvents: Event[] = [];

	constructor(server: MocketServer) {
		this.server = server;
	}

	public createSocket(auth?: Auth): MocketSocket {
		const mSocket = new MocketSocket(this);
		auth = auth || {};
		mSocket.handshake = {
			auth
		};
		this.registerSocket(mSocket);
		return mSocket;
	}

	public registerSocket(mSocket: MocketSocket) {
		mSocket.id = this.currentSocketId++;
		this.sockets.add(mSocket);
		const connectionEvent = new Event({
			namespace: this,
			args: [mSocket],
			name: 'connection',
			rooms: new Set(),
			sender: this
		})
		this.eventPlayer.play(connectionEvent);
	}

	public to(room: Room): EventBuilder {
		return (new EventBuilder(this, this)).to(room);
	}

	public on(eventName: MocketServerEventName, callback: CallableFunction) {
		this.eventPlayer.on(MocketServer.parseEventName(eventName), callback);
	}

	public off(eventName: MocketServerEventName, callback: CallableFunction) {
		this.eventPlayer.off(MocketServer.parseEventName(eventName), callback);
	}

	public once(eventName: MocketServerEventName, callback: CallableFunction) {
		this.eventPlayer.once(MocketServer.parseEventName(eventName), callback);
	}

	public transmit(event: Event) {
		this.getDestinationSocketsForEvent(event).forEach(socket => socket.notify(event))
	}

	protected getDestinationSocketsForEvent(event: Event): MocketSocket[] {
		let sockets = [...this.connectedSockets];

		if (event.rooms.size > 0) {
			sockets = sockets.filter(socket => [...socket.rooms]
				.some(room => event.rooms.has(room)))
				.filter((socket: MocketSocket) => socket !== event.sender);
		}

		return sockets;
	}

	get connectedSockets(): Set<MocketSocket> {
		return (new Set([...this.sockets].filter(e => e.connected)));
	}

	public emit(ev: Event['name'], ...args: unknown[]): void {
		(new EventBuilder(this, this)).emit(ev, args);
	}
}