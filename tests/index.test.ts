import { expect } from 'chai';
import { MocketSocket } from '../src';

describe('MocketSocket', () => {
	let mocketSocket: MocketSocket;

	beforeEach(() => {
		mocketSocket = new MocketSocket();
	})

	it('should be able to join room', () => {
		expect(mocketSocket.rooms.size).to.equal(0)

		mocketSocket.join("random-id");

		expect(mocketSocket.rooms.size).to.equal(1)
		expect(mocketSocket.isInRoom("random-id")).to.be.true;
	})

	it('should be able to leave room', () => {
		expect(mocketSocket.rooms.size).to.equal(0)

		mocketSocket.join("random-id");

		expect(mocketSocket.rooms.size).to.equal(1)
		expect(mocketSocket.isInRoom("random-id")).to.be.true;

		mocketSocket.leave("random-id");

		expect(mocketSocket.rooms.size).to.equal(0)
	})

	it('should be able to handle rooms history', () => {
		expect(mocketSocket.joinedRooms.size).to.equal(0)

		mocketSocket.join("random-id");

		expect(mocketSocket.joinedRooms.size).to.equal(1)
		expect(mocketSocket.hasBeenInRoom("random-id")).to.be.true;

		mocketSocket.leave("random-id");

		expect(mocketSocket.joinedRooms.size).to.equal(1)
		expect(mocketSocket.hasBeenInRoom("random-id")).to.be.true;
	})

	it('should be able to tell whether it is connected or disconnected', () => {
		expect(mocketSocket.connected).to.be.true;
		expect(mocketSocket.disconnected).to.be.false;

		mocketSocket.disconnect();

		expect(mocketSocket.connected).to.be.false;
		expect(mocketSocket.disconnected).to.be.true;
	})
})