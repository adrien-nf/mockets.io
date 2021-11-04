"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MocketSocket = void 0;
const EventBuilder_1 = require("../Event/EventBuilder");
const Event_1 = require("../Event/Event");
const EventPlayer_1 = require("../Event/EventPlayer/EventPlayer");
class MocketSocket {
    constructor(namespace) {
        this.rooms = new Set();
        this.joinedRooms = new Set();
        this.connected = true;
        this.receivedEvents = new Array();
        this.sentEvents = new Array();
        this.eventPlayer = new EventPlayer_1.EventPlayer();
        this.namespace = namespace;
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
        return (new EventBuilder_1.EventBuilder(this.namespace, this)).to(room);
    }
    in(room) {
        return this.to(room);
    }
    emit(ev, ...args) {
        const event = new Event_1.Event({ namespace: this.namespace, rooms: new Set(), name: ev, args: args, sender: this });
        this.sentEvents.push(event);
        this.eventPlayer.play(event);
    }
    notify(event) {
        this.receivedEvents.push(event);
        this.eventPlayer.play(event);
    }
    on(eventName, callback) {
        this.eventPlayer.on(eventName, callback);
    }
    off(eventName, callback) {
        this.eventPlayer.off(eventName, callback);
    }
    once(eventName, callback) {
        this.eventPlayer.once(eventName, callback);
    }
}
exports.MocketSocket = MocketSocket;
