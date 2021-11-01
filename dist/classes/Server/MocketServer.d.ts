import { Namespace } from './Namespace';
import { MocketSocket } from "../..";
import { Event } from "../Event/Event";
import { EventName } from '../types/types';
import { EventRegisterer } from '../../interfaces/EventRegisterer/EventRegisterer';
import { MocketServerEventName, NamespaceKey } from "./types";
import { EventTransmitter } from '../../interfaces/EventTransmitter/EventTransmitter';
export declare class MocketServer implements EventTransmitter, EventRegisterer {
    namespaces: Map<string, Namespace>;
    createSocket(): MocketSocket;
    registerSocket(mSocket: MocketSocket): void;
    transmit(event: Event): void;
    get defaultNamespace(): Namespace;
    emit(ev: EventName, ...args: unknown[]): void;
    of(namespaceKey: NamespaceKey): Namespace;
    on(eventName: MocketServerEventName, callback: CallableFunction): void;
    off(eventName: MocketServerEventName, callback: CallableFunction): void;
    once(eventName: MocketServerEventName, callback: CallableFunction): void;
    static parseEventName(eventName: MocketServerEventName): MocketServerEventName;
}
