import type { MocketServer } from '../Server/MocketServer';
import type { EventName, Room } from '../types/types';
import type { EventBuilder } from './EventBuilder';
export declare class Event {
    readonly server: MocketServer;
    readonly rooms: Set<Room>;
    readonly eventName: EventName;
    readonly args: unknown[];
    constructor(evBuilder: EventBuilder);
}
