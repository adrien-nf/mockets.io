"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnhancedMocketSocket = void 0;
const MocketSocket_1 = require("./MocketSocket");
class EnhancedMocketSocket extends MocketSocket_1.MocketSocket {
    constructor() {
        super();
        this.joinedRooms = new Set();
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
    isInRoom(room) {
        return this.rooms.has(room);
    }
    hasBeenInRoom(room) {
        return this.joinedRooms.has(room);
    }
}
exports.EnhancedMocketSocket = EnhancedMocketSocket;
