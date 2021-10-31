import { EventSender } from './../../interfaces/EventSender/EventSender';
import type { MocketServer } from '../Server/MocketServer';
import type { EventName, Room } from '../types/types';
import type { EventBuilder } from './EventBuilder';

export class Event {
	public readonly server: MocketServer;
	public readonly rooms: Set<Room>;
	public readonly name: EventName;
	public readonly args: unknown[];
	public readonly sender: EventSender;

	constructor(evBuilder: EventBuilder) {
		this.server = evBuilder.server;
		this.rooms = evBuilder.rooms;
		this.name = evBuilder.eventName;
		this.args = evBuilder.args;
		this.sender = evBuilder.sender;
	}
}