export declare class MocketSocket {
    rooms: Set<string>;
    join(rooms: string | Array<string>): void;
    leave(room: string): void;
    leaveAll(): void;
}
