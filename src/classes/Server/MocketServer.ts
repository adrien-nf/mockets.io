import { Namespace } from './Namespace';
import { MocketSocket } from "../..";
import { Event } from "../Event/Event";
import { EventName, Room } from '../types/types';
import { EventRegisterer } from '../../interfaces/EventRegisterer/EventRegisterer';
import { MocketServerEventName, NamespaceKey } from "./types";
import { EventTransmitter } from '../../interfaces/EventTransmitter/EventTransmitter';
import { EventBuilder } from '../Event/EventBuilder';

export class MocketServer implements EventTransmitter, EventRegisterer {
	public namespaces = new Map<NamespaceKey, Namespace>();

	createSocket(): MocketSocket {
		return this.defaultNamespace.createSocket();
	}

	registerSocket(mSocket: MocketSocket): void {
		this.defaultNamespace.registerSocket(mSocket);
	}

	transmit(event: Event): void {
		this.defaultNamespace.transmit(event);
	}

	get defaultNamespace(): Namespace {
		return this.of('/');
	}

	emit(ev: EventName, ...args: unknown[]): void {
		this.defaultNamespace.emit(ev, args);
	}

	of(namespaceKey: NamespaceKey) {
		let namespace = this.namespaces.get(namespaceKey)

		if (!namespace) {
			namespace = new Namespace(this);
			this.namespaces.set(namespaceKey, namespace);
		}

		return namespace;
	}

	to(room: Room): EventBuilder {
		return this.defaultNamespace.to(room);
	}

	on(eventName: MocketServerEventName, callback: CallableFunction) {
		this.defaultNamespace.on(MocketServer.parseEventName(eventName), callback);
	}

	off(eventName: MocketServerEventName, callback: CallableFunction) {
		this.defaultNamespace.off(MocketServer.parseEventName(eventName), callback);
	}

	once(eventName: MocketServerEventName, callback: CallableFunction) {
		this.defaultNamespace.once(MocketServer.parseEventName(eventName), callback);
	}

	public static parseEventName(eventName: MocketServerEventName): MocketServerEventName {
		return eventName === 'connect' ? 'connection' : eventName;
	}
}