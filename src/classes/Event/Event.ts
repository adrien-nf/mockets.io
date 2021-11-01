import { Room, EventName } from './../types/types';
import { Namespace } from '../Server/Namespace';
import { EventSender } from '../../interfaces/EventSender/EventSender';

export class Event {
	public readonly namespace: Namespace;
	public readonly rooms: Set<Room>;
	public readonly name: EventName;
	public readonly args: unknown[];
	public readonly sender: EventSender;

	constructor(params: {
		namespace: Namespace,
		rooms: Set<Room>,
		name: EventName,
		args: unknown[],
		sender: EventSender,
	}) {
		this.namespace = params.namespace;
		this.rooms = params.rooms;
		this.name = params.name;
		this.args = params.args;
		this.sender = params.sender;
	}
}