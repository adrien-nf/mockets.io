import { Event } from "../Event";
import { EventRegisterer } from "./EventRegisterer/EventRegisterer";
import { OneTimeEventRegisterer } from "./EventRegisterer/OneTimeEventRegisterer";

export abstract class EventPlayer {
	events = new EventRegisterer();
	oneTimeEvents = new OneTimeEventRegisterer();

	protected play(event: Event) {
		const args = event.args || [];
		this.events.tryToPlay(event.name, ...args);
		this.oneTimeEvents.tryToPlay(event.name, ...args);
	}

	public on(eventName: Event['name'], callback: CallableFunction) {
		this.events.addEventCallback(eventName, callback);
	}

	public off(eventName: Event['name'], callback: CallableFunction) {
		this.events.removeEventCallback(eventName, callback);
	}

	public once(eventName: Event['name'], callback: CallableFunction) {
		this.oneTimeEvents.addEventCallback(eventName, callback);
	}
}