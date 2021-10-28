"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const _1 = require(".");
describe('MocketSocket', () => {
    let mocketSocket;
    beforeEach(() => {
        mocketSocket = new _1.MocketSocket();
    });
    it('should be able to join room', () => {
        (0, chai_1.expect)(mocketSocket.rooms.size).to.equal(0);
        mocketSocket.join("random-id");
        (0, chai_1.expect)(mocketSocket.rooms.size).to.equal(1);
    });
});
