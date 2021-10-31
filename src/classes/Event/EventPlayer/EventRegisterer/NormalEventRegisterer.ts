import { Event } from "../../Event";

export class NormalEventRegisterer {
	public registeredEvents: Map<Event['name'], Array<CallableFunction>> = new Map();

	public addEventCallback(eventName: Event['name'], callback: CallableFunction): void {
		const currentCallbacks = this.registeredEvents.get(eventName) || [];
		this.registeredEvents.set(eventName, [...currentCallbacks, callback]);
	}

	public removeEventCallback(eventName: Event['name'], callback: CallableFunction): void {
		if (!this.eventIsRegistered(eventName)) {
			return;
		}

		const events = this.registeredEvents.get(eventName);

		const cbIndex = events.findIndex(cb => cb === callback);
		events.splice(cbIndex, 1)

		this.registeredEvents.set(eventName, events);
	}

	public tryToPlay(evName: Event['name'], ...args: unknown[]) {
		if (this.eventIsRegistered(evName)) {
			const callables = this.registeredEvents.get(evName);

			callables.forEach(callback => {
				this.play(callback, args)
			})
		}
	}

	protected play(cb, args): void {
		cb(...args);
	}

	protected eventIsRegistered(eventName: Event['name']) {
		return this.registeredEvents.has(eventName);
	}
}