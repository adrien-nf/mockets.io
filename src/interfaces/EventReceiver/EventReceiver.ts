import { Event } from "../../classes/Event/Event";

export interface EventReceiver {
    receivedEvents: Array<Event>;

    notify(event: Event);
}