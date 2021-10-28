export declare type Room = string;
export declare class MocketSocket {
    rooms: Set<string>;
    connected: boolean;
    get disconnected(): boolean;
    constructor();
    join(rooms: Room | Array<Room>): void;
    leave(room: Room): void;
    leaveAll(): void;
    disconnect(): this;
}
