"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBuilder = void 0;
const Event_1 = require("./Event");
class EventBuilder {
    constructor(namespace, sender) {
        this.rooms = new Set();
        this.namespace = namespace;
        this.sender = sender;
    }
    to(room) {
        this.rooms.add(room);
        return this;
    }
    emit(ev, ...args) {
        this.name = ev;
        this.args = args;
        const event = this.toEvent();
        this.namespace.transmit(event);
        this.sender.sentEvents.push(this);
        return event;
    }
    toEvent() {
        return new Event_1.Event(this);
    }
}
exports.EventBuilder = EventBuilder;
