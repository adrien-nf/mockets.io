"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MocketServer = void 0;
const Namespace_1 = require("./Namespace");
class MocketServer {
    constructor() {
        this.namespaces = new Map();
    }
    createSocket(auth) {
        return this.defaultNamespace.createSocket(auth);
    }
    registerSocket(mSocket) {
        this.defaultNamespace.registerSocket(mSocket);
    }
    transmit(event) {
        this.defaultNamespace.transmit(event);
    }
    get defaultNamespace() {
        return this.of('/');
    }
    emit(ev, ...args) {
        this.defaultNamespace.emit(ev, args);
    }
    of(namespaceKey) {
        let namespace = this.namespaces.get(namespaceKey);
        if (!namespace) {
            namespace = new Namespace_1.Namespace(this);
            this.namespaces.set(namespaceKey, namespace);
        }
        return namespace;
    }
    to(room) {
        return this.defaultNamespace.to(room);
    }
    on(eventName, callback) {
        this.defaultNamespace.on(MocketServer.parseEventName(eventName), callback);
    }
    off(eventName, callback) {
        this.defaultNamespace.off(MocketServer.parseEventName(eventName), callback);
    }
    once(eventName, callback) {
        this.defaultNamespace.once(MocketServer.parseEventName(eventName), callback);
    }
    static parseEventName(eventName) {
        return eventName === 'connect' ? 'connection' : eventName;
    }
}
exports.MocketServer = MocketServer;
