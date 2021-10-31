import { Event } from "../../classes/Event/Event";

export interface EventRegisterer {
	on(eventName: Event['name'], callback: CallableFunction);

	off(eventName: Event['name'], callback: CallableFunction);

	once(eventName: Event['name'], callback: CallableFunction);
}