import { Event } from "../Event/Event";
import { Namespace } from "../Server/Namespace";
import { EventName } from "../types/types";
import { MocketSocket } from "./MocketSocket"
import { ServerSocket } from "./ServerSocket";

export class ClientSocket extends MocketSocket {
	public serverSideSocket: ServerSocket;

	constructor(namespace: Namespace) {
		super(namespace);
		this.serverSideSocket = new ServerSocket(namespace);
	}

	emit(ev: EventName, ...args: unknown[]): void {
		const event: Event = new Event({ namespace: this.namespace, rooms: new Set(), name: ev, args: args, sender: this })
		this.sentEvents.push(event);
		this.serverSideSocket.notify(event);
	}
}