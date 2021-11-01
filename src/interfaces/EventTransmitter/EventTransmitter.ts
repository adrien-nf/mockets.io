import { Event } from "../../classes/Event/Event";

export interface EventTransmitter {
    transmit(event: Event);
}