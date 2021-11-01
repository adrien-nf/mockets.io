import { EventRegisterer } from "../../../interfaces/EventRegisterer/EventRegisterer";
import { Event } from "../Event";
import { NormalEventRegisterer } from "./EventRegisterer/NormalEventRegisterer";
import { OneTimeEventRegisterer } from "./EventRegisterer/OneTimeEventRegisterer";
export declare class EventPlayer implements EventRegisterer {
    events: NormalEventRegisterer;
    oneTimeEvents: OneTimeEventRegisterer;
    play(event: Event): void;
    on(eventName: Event['name'], callback: CallableFunction): void;
    off(eventName: Event['name'], callback: CallableFunction): void;
    once(eventName: Event['name'], callback: CallableFunction): void;
}
