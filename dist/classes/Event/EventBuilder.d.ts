import type { Room, EventName } from './../types/types';
import { Event } from './Event';
import { EventSender } from '../../interfaces/EventSender/EventSender';
import { Namespace } from '../Server/Namespace';
export declare class EventBuilder {
    namespace: Namespace;
    sender: EventSender;
    rooms: Set<Room>;
    name: EventName;
    args: unknown[];
    constructor(namespace: Namespace, sender: EventSender);
    to(room: Room): this;
    emit(ev: EventName, ...args: unknown[]): Event;
    toEvent(): Event;
}
