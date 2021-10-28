"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MocketSocket = void 0;
const EventBuilder_1 = require("../Event/EventBuilder");
class MocketSocket {
    constructor(server) {
        this.rooms = new Set();
        this.joinedRooms = new Set();
        this.connected = true;
        this.receivedEvents = new Array();
        this.sentEvents = new Array();
        this.server = server;
    }
    get disconnected() {
        return !this.connected;
    }
    join(rooms) {
        if (typeof rooms === 'string') {
            rooms = [rooms];
        }
        rooms.forEach(e => {
            this.rooms.add(e);
            this.joinedRooms.add(e);
        });
    }
    leave(room) {
        this.rooms.delete(room);
    }
    leaveAll() {
        this.rooms.clear();
    }
    disconnect() {
        this.connected = false;
        return this;
    }
    to(room) {
        return (new EventBuilder_1.EventBuilder(this.server, this)).to(room);
    }
    in(room) {
        return this.to(room);
    }
    emit(ev, ...args) {
        (new EventBuilder_1.EventBuilder(this.server, this)).emit(ev, ...args);
    }
    notify(event) {
        this.receivedEvents.push(event);
    }
}
exports.MocketSocket = MocketSocket;
