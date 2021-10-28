/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import { MocketSocket } from '../src';
import { MocketServer } from '../src/classes/Server/MocketServer';

describe('MocketSocket', () => {
	let mocketServer: MocketServer;
	let mocketSocket: MocketSocket;

	beforeEach(() => {
		mocketServer = new MocketServer();
		mocketSocket = mocketServer.createSocket();
	})

	it('should be able to join room', () => {
		expect(mocketSocket.rooms.size).to.equal(0)

		mocketSocket.join("random-id");

		expect(mocketSocket.rooms.size).to.equal(1)
		expect(mocketSocket.rooms.has("random-id")).to.be.true;
	})

	it('should be able to leave room', () => {
		expect(mocketSocket.rooms.size).to.equal(0)

		mocketSocket.join("random-id");

		expect(mocketSocket.rooms.size).to.equal(1)
		expect(mocketSocket.rooms.has("random-id")).to.be.true;

		mocketSocket.leave("random-id");

		expect(mocketSocket.rooms.size).to.equal(0)
	})

	it('should be able to tell whether it is connected or disconnected', () => {
		expect(mocketSocket.connected).to.be.true;
		expect(mocketSocket.disconnected).to.be.false;

		mocketSocket.disconnect();

		expect(mocketSocket.connected).to.be.false;
		expect(mocketSocket.disconnected).to.be.true;
	})


	it('should be able to handle rooms history', () => {
		expect(mocketSocket.joinedRooms.size).to.equal(0)

		mocketSocket.join("random-id");

		expect(mocketSocket.joinedRooms.size).to.equal(1)
		expect(mocketSocket.joinedRooms.has("random-id")).to.be.true;

		mocketSocket.leave("random-id");

		expect(mocketSocket.joinedRooms.size).to.equal(1)
		expect(mocketSocket.joinedRooms.has("random-id")).to.be.true;
	})

	it('should be able to send events', () => {
		expect(mocketSocket.sentEvents.length).to.be.equal(0);

		mocketSocket.emit('random-event');

		expect(mocketSocket.sentEvents.length).to.be.equal(1);
		expect(mocketSocket.sentEvents[0].eventName).to.be.equal('random-event')
	})

	it('should be able to receive events', () => {
		expect(mocketSocket.receivedEvents.length).to.be.equal(0);

		mocketServer.emit('random-event')

		expect(mocketSocket.receivedEvents.length).to.be.equal(1);
		expect(mocketSocket.receivedEvents[0].eventName).to.be.equal('random-event')
	})

	it('should be able to communicate to rooms', () => {
		const mocketInRoom = mocketServer.createSocket();
		const mocketNotInRoom = mocketServer.createSocket();

		mocketInRoom.join('random-id');

		expect(mocketInRoom.receivedEvents.length).to.be.equal(0);
		expect(mocketNotInRoom.receivedEvents.length).to.be.equal(0);
		expect(mocketSocket.sentEvents.length).to.be.equal(0);

		mocketSocket.to('random-id').emit('random-event');

		expect(mocketInRoom.receivedEvents.length).to.be.equal(1);
		expect(mocketNotInRoom.receivedEvents.length).to.be.equal(0);
		expect(mocketSocket.sentEvents.length).to.be.equal(1);
	})
})