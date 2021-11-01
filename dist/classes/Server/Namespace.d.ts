import { Event } from './../Event/Event';
import { MocketServer } from './MocketServer';
import { EventPlayer } from '../Event/EventPlayer/EventPlayer';
import { EventRegisterer } from './../../interfaces/EventRegisterer/EventRegisterer';
import { EventSender } from '../../interfaces/EventSender/EventSender';
import { MocketSocket } from '../..';
import { MocketServerEventName } from './types';
import { EventTransmitter } from '../../interfaces/EventTransmitter/EventTransmitter';
export declare class Namespace implements EventTransmitter, EventSender, EventRegisterer {
    currentSocketId: number;
    sockets: Set<MocketSocket>;
    protected eventPlayer: EventPlayer;
    server: MocketServer;
    sentEvents: Event[];
    constructor(server: MocketServer);
    createSocket(): MocketSocket;
    registerSocket(mSocket: MocketSocket): void;
    on(eventName: MocketServerEventName, callback: CallableFunction): void;
    off(eventName: MocketServerEventName, callback: CallableFunction): void;
    once(eventName: MocketServerEventName, callback: CallableFunction): void;
    transmit(event: Event): void;
    protected getDestinationSocketsForEvent(event: Event): MocketSocket[];
    get connectedSockets(): Set<MocketSocket>;
    emit(ev: Event['name'], ...args: unknown[]): void;
}
