import { Event } from "../Event/Event";
import { EventName } from "../types/types";
import { MocketSocket } from "./MocketSocket"

export class ServerSocket extends MocketSocket {
	emit(ev: EventName, ...args: unknown[]): void {
		const newEvent = new Event({
			namespace: this.namespace,
			rooms: new Set(),
			name: ev,
			args: args,
			sender: this
		});

		this.sentEvents.push(newEvent)
		this.namespace.transmit(newEvent)
	}
}