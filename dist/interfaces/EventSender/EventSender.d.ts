import { Event } from "../../classes/Event/Event";
import { EventName } from "../../classes/types/types";
export interface EventSender {
    sentEvents: Array<Event>;
    emit(ev: EventName, ...args: any[]): void;
}
