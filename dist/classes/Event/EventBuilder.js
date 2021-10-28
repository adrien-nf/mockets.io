"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBuilder = void 0;
const Event_1 = require("./Event");
class EventBuilder {
    constructor(server, sender) {
        this.rooms = new Set();
        this.server = server;
        this.sender = sender;
    }
    to(room) {
        this.rooms.add(room);
        return this;
    }
    emit(ev, ...args) {
        this.eventName = ev;
        this.args = args;
        const event = this.toEvent();
        this.server.notify(event);
        this.sender.sentEvents.push(event);
        return event;
    }
    toEvent() {
        return new Event_1.Event(this);
    }
}
exports.EventBuilder = EventBuilder;
