import { Event } from "../../Event";
import { NormalEventRegisterer } from "./NormalEventRegisterer";

export class OneTimeEventRegisterer extends NormalEventRegisterer {
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