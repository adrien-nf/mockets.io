import { MocketSocket } from './../src/classes/Socket/MocketSocket';
import { expect } from 'chai';
import { MocketServer } from '../src/classes/Server/MocketServer';

describe('MocketServer', () => {
	let mocketServer: MocketServer;
	let mocketSocket: MocketSocket;

	beforeEach(() => {
		mocketServer = new MocketServer();
		mocketSocket = mocketServer.createSocket();
	})

	it('should be able to send events', () => {
		expect(mocketServer.sentEvents.length).to.be.equal(0);

		mocketServer.emit('random-event');

		expect(mocketServer.sentEvents.length).to.be.equal(1);
		expect(mocketServer.sentEvents[0].eventName).to.be.equal('random-event');
	})

	it('should be able to receive events', () => {
		expect(mocketServer.receivedEvents.length).to.be.equal(0);

		mocketSocket.emit('random-event');

		expect(mocketServer.receivedEvents.length).to.be.equal(1);
		expect(mocketServer.receivedEvents[0].eventName).to.be.equal('random-event');
	})
})