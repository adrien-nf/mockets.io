import { Room, EventName } from './../types/types';
import { Namespace } from '../Server/Namespace';
import { EventSender } from '../../interfaces/EventSender/EventSender';
export declare class Event {
    readonly namespace: Namespace;
    readonly rooms: Set<Room>;
    readonly name: EventName;
    readonly args: unknown[];
    readonly sender: EventSender;
    constructor(params: {
        namespace: Namespace;
        rooms: Set<Room>;
        name: EventName;
        args: unknown[];
        sender: EventSender;
    });
}
