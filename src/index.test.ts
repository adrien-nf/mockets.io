import { expect } from 'chai';
import { MocketSocket } from '.';

describe('MocketSocket', () => {
	let mocketSocket: MocketSocket;

	beforeEach(() => {
		mocketSocket = new MocketSocket();
	})

	it('should be able to join room', () => {
		expect(mocketSocket.rooms.size).to.equal(0)

		mocketSocket.join("random-id");

		expect(mocketSocket.rooms.size).to.equal(1)
	})
})