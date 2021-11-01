import { Event } from "../../Event";
import { NormalEventRegisterer } from "./NormalEventRegisterer";
export declare class OneTimeEventRegisterer extends NormalEventRegisterer {
    tryToPlay(evName: Event['name'], ...args: unknown[]): void;
}
