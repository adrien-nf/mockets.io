import { Namespace } from './Namespace';
import { MocketSocket } from "../..";
import { Event } from "../Event/Event";
import { Auth, EventName, Room } from '../types/types';
import { EventRegisterer } from '../../interfaces/EventRegisterer/EventRegisterer';
import { MocketServerEventName, NamespaceKey } from "./types";
import { EventTransmitter } from '../../interfaces/EventTransmitter/EventTransmitter';
import { EventBuilder } from '../Event/EventBuilder';
export declare class MocketServer implements EventTransmitter, EventRegisterer {
    namespaces: Map<string, Namespace>;
    createSocket(auth?: Auth): MocketSocket;
    registerSocket(mSocket: MocketSocket): void;
    transmit(event: Event): void;
    get defaultNamespace(): Namespace;
    emit(ev: EventName, ...args: unknown[]): void;
    of(namespaceKey: NamespaceKey): Namespace;
    to(room: Room): EventBuilder;
    on(eventName: MocketServerEventName, callback: CallableFunction): void;
    off(eventName: MocketServerEventName, callback: CallableFunction): void;
    once(eventName: MocketServerEventName, callback: CallableFunction): void;
    static parseEventName(eventName: MocketServerEventName): MocketServerEventName;
}
