export declare class MocketSocket {
    rooms: Set<string>;
    joinedRooms: Set<string>;
    connected: boolean;
    disconnected: boolean;
    constructor();
    join(rooms: string | Array<string>): void;
    leave(room: string): void;
    leaveAll(): void;
    disconnect(): this;
}
