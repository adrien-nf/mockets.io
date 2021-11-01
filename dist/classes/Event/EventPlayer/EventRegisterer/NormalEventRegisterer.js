"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalEventRegisterer = void 0;
class NormalEventRegisterer {
    constructor() {
        this.registeredEvents = new Map();
    }
    addEventCallback(eventName, callback) {
        const currentCallbacks = this.registeredEvents.get(eventName) || [];
        this.registeredEvents.set(eventName, [...currentCallbacks, callback]);
    }
    removeEventCallback(eventName, callback) {
        if (!this.eventIsRegistered(eventName)) {
            return;
        }
        const events = this.registeredEvents.get(eventName);
        const cbIndex = events.findIndex(cb => cb === callback);
        events.splice(cbIndex, 1);
        this.registeredEvents.set(eventName, events);
    }
    tryToPlay(evName, ...args) {
        if (this.eventIsRegistered(evName)) {
            const callables = this.registeredEvents.get(evName);
            callables.forEach(callback => {
                this.play(callback, args);
            });
        }
    }
    play(cb, args) {
        cb(...args);
    }
    eventIsRegistered(eventName) {
        return this.registeredEvents.has(eventName);
    }
}
exports.NormalEventRegisterer = NormalEventRegisterer;
