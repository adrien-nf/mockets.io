export declare class MocketSocket {
    rooms: Set<string>;
    constructor();
    join(rooms: string | Array<string>): void;
    leave(room: string): void;
    leaveAll(): void;
}
