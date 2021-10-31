import { EventRegisterer } from "../../../interfaces/EventRegisterer/EventRegisterer";
import { Event } from "../Event";
import { NormalEventRegisterer } from "./EventRegisterer/NormalEventRegisterer";
import { OneTimeEventRegisterer } from "./EventRegisterer/OneTimeEventRegisterer";

export class EventPlayer implements EventRegisterer {
	events = new NormalEventRegisterer();
	oneTimeEvents = new OneTimeEventRegisterer();

	public play(event: Event) {
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