"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MocketSocket = void 0;
class MocketSocket {
    constructor() {
        this.rooms = new Set();
        this.joinedRooms = new Set();
        this.connected = true;
        this.disconnected = false;
    }
    join(rooms) {
        if (typeof rooms === 'string') {
            rooms = [rooms];
        }
        rooms.forEach(e => this.rooms.add(e));
        this.joinedRooms.forEach(e => this.rooms.add(e));
    }
    leave(room) {
        this.rooms.delete(room);
    }
    leaveAll() {
        this.rooms.clear();
    }
    disconnect() {
        this.disconnected = true;
        this.connected = true;
        return this;
    }
}
exports.MocketSocket = MocketSocket;
