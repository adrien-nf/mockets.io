import { EventSender } from './../../interfaces/EventSender/EventSender';
import { EventReceiver } from './../../interfaces/EventReceiver/EventReceiver';
import { MocketSocket } from "../..";
import { Event } from "../Event/Event";
import { EventName } from '../types/types';
export declare class MocketServer implements EventReceiver, EventSender {
    sockets: Set<MocketSocket>;
    receivedEvents: Event[];
    sentEvents: Event[];
    createSocket(): MocketSocket;
    notify(event: Event): void;
    emit(ev: EventName, ...args: any[]): void;
    get connectedSockets(): Set<MocketSocket>;
}
