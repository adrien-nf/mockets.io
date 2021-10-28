import type { MocketServer } from '../Server/MocketServer';
import type { EventName, Room } from '../types/types';
import type { EventBuilder } from './EventBuilder';

export class Event {
	public readonly server: MocketServer;
	public readonly rooms: Set<Room>;
	public readonly eventName: EventName;
	public readonly args: unknown[];

	constructor(evBuilder: EventBuilder) {
		this.server = evBuilder.server;
		this.rooms = evBuilder.rooms;
		this.eventName = evBuilder.eventName;
		this.args = evBuilder.args;
	}
}