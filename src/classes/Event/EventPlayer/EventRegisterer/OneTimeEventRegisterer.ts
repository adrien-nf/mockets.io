import { Event } from "../../Event";
import { EventRegisterer } from "./EventRegisterer";

export class OneTimeEventRegisterer extends EventRegisterer {
	public tryToPlay(evName: Event['name'], ...args: unknown[]) {
		if (this.eventIsRegistered(evName)) {
			const callables = this.registeredEvents.get(evName);

			callables.forEach(callback => {
				this.play(callback, args)
				this.removeEventCallback(evName, callback);
			})
		}
	}
}