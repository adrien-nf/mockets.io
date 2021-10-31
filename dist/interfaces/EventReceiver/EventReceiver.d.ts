import { Event } from "../../classes/Event/Event";
export interface EventReceiver {
    receivedEvents: Array<Event>;
    id: number;
    notify(event: Event): any;
}
