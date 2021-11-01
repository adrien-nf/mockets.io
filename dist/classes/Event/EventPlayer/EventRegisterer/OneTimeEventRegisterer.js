"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneTimeEventRegisterer = void 0;
const NormalEventRegisterer_1 = require("./NormalEventRegisterer");
class OneTimeEventRegisterer extends NormalEventRegisterer_1.NormalEventRegisterer {
    tryToPlay(evName, ...args) {
        if (this.eventIsRegistered(evName)) {
            const callables = this.registeredEvents.get(evName);
            callables.forEach(callback => {
                this.play(callback, args);
                this.removeEventCallback(evName, callback);
            });
        }
    }
}
exports.OneTimeEventRegisterer = OneTimeEventRegisterer;
