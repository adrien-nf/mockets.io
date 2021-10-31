import { EventSender } from './../../interfaces/EventSender/EventSender';
import { EventReceiver } from './../../interfaces/EventReceiver/EventReceiver';
import { EventName, Room } from './../types/types';
import { EventBuilder } from "../Event/EventBuilder";
import type { MocketServer } from "../Server/MocketServer";
import { Event } from '../Event/Event';
export declare class MocketSocket implements EventReceiver, EventSender {
    rooms: Set<Room>;
    joinedRooms: Set<Room>;
    connected: boolean;
    server: MocketServer;
    receivedEvents: Event[];
    sentEvents: Event[];
    id: number;
    get disconnected(): boolean;
    constructor(server: MocketServer);
    join(rooms: Room | Array<Room>): void;
    leave(room: Room): void;
    leaveAll(): void;
    disconnect(): this;
    to(room: Room): EventBuilder;
    in(room: Room): EventBuilder;
    emit(ev: EventName, ...args: any[]): void;
    notify(event: Event): void;
}
