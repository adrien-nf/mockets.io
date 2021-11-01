export type Room = string;
export type EventName = string;
export type Handshake = {
    auth: Auth;
};
export type Auth = {
    [key: string]: unknown
}