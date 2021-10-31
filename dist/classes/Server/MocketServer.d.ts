import { EventSender } from './../../interfaces/EventSender/EventSender';
import { EventReceiver } from './../../interfaces/EventReceiver/EventReceiver';
import { MocketSocket } from "../..";
import { Event } from "../Event/Event";
import { EventName } from '../types/types';
export declare class MocketServer implements EventReceiver, EventSender {
    sockets: Set<MocketSocket>;
    receivedEvents: Event[];
    sentEvents: Event[];
    static currentServerId: number;
    static currentSocketId: number;
    id: number;
    constructor();
    createSocket(): MocketSocket;
    registerSocket(mSocket: MocketSocket): void;
    notify(event: Event): void;
    private getDestinationSocketsForEvent;
    emit(ev: EventName, ...args: any[]): void;
    get connectedSockets(): Set<MocketSocket>;
}
