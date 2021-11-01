"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    constructor(params) {
        this.namespace = params.namespace;
        this.rooms = params.rooms;
        this.name = params.name;
        this.args = params.args;
        this.sender = params.sender;
    }
}
exports.Event = Event;
