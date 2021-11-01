import { Event } from "../../classes/Event/Event";
export interface EventRegisterer {
    on(eventName: Event['name'], callback: CallableFunction): any;
    off(eventName: Event['name'], callback: CallableFunction): any;
    once(eventName: Event['name'], callback: CallableFunction): any;
}
