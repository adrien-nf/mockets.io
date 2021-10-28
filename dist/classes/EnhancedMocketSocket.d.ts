import { MocketSocket, Room } from "./MocketSocket";
export declare class EnhancedMocketSocket extends MocketSocket {
    joinedRooms: Set<string>;
    constructor();
    join(rooms: Room | Array<Room>): void;
    isInRoom(room: Room): boolean;
    hasBeenInRoom(room: Room): boolean;
}
