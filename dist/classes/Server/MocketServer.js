"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MocketServer = void 0;
const __1 = require("../..");
const EventBuilder_1 = require("../Event/EventBuilder");
class MocketServer {
    constructor() {
        this.sockets = new Set();
        this.receivedEvents = new Array();
        this.sentEvents = new Array();
        this.id = MocketServer.currentServerId++;
    }
    createSocket() {
        const mSocket = new __1.MocketSocket(this);
        this.registerSocket(mSocket);
        return mSocket;
    }
    registerSocket(mSocket) {
        this.sockets.add(mSocket);
        mSocket.id = MocketServer.currentSocketId++;
    }
    notify(event) {
        if (event.rooms.size > 0) {
            this.getDestinationSocketsForEvent(event).forEach(socket => socket.notify(event));
        }
        else {
            this.receivedEvents.push(event);
        }
    }
    getDestinationSocketsForEvent(event) {
        return [...this.connectedSockets]
            .filter(socket => [...socket.rooms]
            .some(room => event.rooms.has(room)))
            .filter(socket => socket.id !== event.sender.id);
    }
    emit(ev, ...args) {
        const event = (new EventBuilder_1.EventBuilder(this, this)).emit(ev, args);
        this.connectedSockets.forEach(e => e.notify(event));
    }
    get connectedSockets() {
        return (new Set([...this.sockets].filter(e => e.connected)));
    }
}
exports.MocketServer = MocketServer;
MocketServer.currentServerId = 1;
MocketServer.currentSocketId = 1;
