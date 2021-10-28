import type { Room, EventName } from './../types/types';
import { MocketServer } from "../Server/MocketServer";
import { Event } from './Event';
import { EventSender } from '../../interfaces/EventSender/EventSender';
export declare class EventBuilder {
    server: MocketServer;
    sender: EventSender;
    rooms: Set<Room>;
    eventName: EventName;
    args: unknown[];
    constructor(server: MocketServer, sender: EventSender);
    to(room: Room): this;
    emit(ev: EventName, ...args: unknown[]): Event;
    toEvent(): Event;
}
