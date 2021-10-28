import { Subject } from "./Subject";

export interface Observer {
    update(subject: Subject): void;
}