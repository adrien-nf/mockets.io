"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    constructor(evBuilder) {
        this.server = evBuilder.server;
        this.rooms = evBuilder.rooms;
        this.eventName = evBuilder.eventName;
        this.args = evBuilder.args;
        this.sender = evBuilder.sender;
    }
}
exports.Event = Event;
