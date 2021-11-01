"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPlayer = void 0;
const NormalEventRegisterer_1 = require("./EventRegisterer/NormalEventRegisterer");
const OneTimeEventRegisterer_1 = require("./EventRegisterer/OneTimeEventRegisterer");
class EventPlayer {
    constructor() {
        this.events = new NormalEventRegisterer_1.NormalEventRegisterer();
        this.oneTimeEvents = new OneTimeEventRegisterer_1.OneTimeEventRegisterer();
    }
    play(event) {
        const args = event.args || [];
        this.events.tryToPlay(event.name, ...args);
        this.oneTimeEvents.tryToPlay(event.name, ...args);
    }
    on(eventName, callback) {
        this.events.addEventCallback(eventName, callback);
    }
    off(eventName, callback) {
        this.events.removeEventCallback(eventName, callback);
    }
    once(eventName, callback) {
        this.oneTimeEvents.addEventCallback(eventName, callback);
    }
}
exports.EventPlayer = EventPlayer;
