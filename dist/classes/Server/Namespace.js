"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Namespace = void 0;
const MocketServer_1 = require("./MocketServer");
const EventPlayer_1 = require("../Event/EventPlayer/EventPlayer");
const __1 = require("../..");
const EventBuilder_1 = require("../Event/EventBuilder");
class Namespace {
    constructor(server) {
        this.currentSocketId = 1;
        this.sockets = new Set();
        this.eventPlayer = new EventPlayer_1.EventPlayer();
        this.sentEvents = [];
        this.server = server;
    }
    createSocket() {
        const mSocket = new __1.MocketSocket(this);
        this.registerSocket(mSocket);
        return mSocket;
    }
    registerSocket(mSocket) {
        mSocket.id = this.currentSocketId++;
        this.sockets.add(mSocket);
    }
    on(eventName, callback) {
        this.eventPlayer.on(MocketServer_1.MocketServer.parseEventName(eventName), callback);
    }
    off(eventName, callback) {
        this.eventPlayer.off(MocketServer_1.MocketServer.parseEventName(eventName), callback);
    }
    once(eventName, callback) {
        this.eventPlayer.once(MocketServer_1.MocketServer.parseEventName(eventName), callback);
    }
    transmit(event) {
        this.getDestinationSocketsForEvent(event).forEach(socket => socket.notify(event));
    }
    getDestinationSocketsForEvent(event) {
        let sockets = [...this.connectedSockets];
        if (event.rooms.size > 0) {
            sockets = sockets.filter(socket => [...socket.rooms]
                .some(room => event.rooms.has(room)))
                .filter((socket) => socket !== event.sender);
        }
        return sockets;
    }
    get connectedSockets() {
        return (new Set([...this.sockets].filter(e => e.connected)));
    }
    emit(ev, ...args) {
        (new EventBuilder_1.EventBuilder(this, this)).emit(ev, args);
    }
}
exports.Namespace = Namespace;
