import { Event } from "../../Event";
export declare class NormalEventRegisterer {
    registeredEvents: Map<Event['name'], Array<CallableFunction>>;
    addEventCallback(eventName: Event['name'], callback: CallableFunction): void;
    removeEventCallback(eventName: Event['name'], callback: CallableFunction): void;
    tryToPlay(evName: Event['name'], ...args: unknown[]): void;
    protected play(cb: any, args: any): void;
    protected eventIsRegistered(eventName: Event['name']): boolean;
}
