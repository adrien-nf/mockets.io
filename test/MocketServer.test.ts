import { MocketSocket } from '../src/classes/Socket/MocketSocket';
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
		expect(mocketServer.defaultNamespace.sentEvents.length).to.be.equal(0);
		expect(mocketSocket.receivedEvents.length).to.be.equal(0);

		mocketServer.emit('random-event');

		expect(mocketServer.defaultNamespace.sentEvents.length).to.be.equal(1);
		expect(mocketServer.defaultNamespace.sentEvents[0].name).to.be.equal('random-event');
		expect(mocketSocket.receivedEvents.length).to.be.equal(1);
		expect(mocketSocket.receivedEvents[0].name).to.be.equal('random-event');
	})

	it('should be able to send events to namespaces without sharing to other namespaces', () => {
		const namespacedSocket = mocketServer.of('random-namespace').createSocket();

		expect(mocketServer.defaultNamespace.sentEvents.length).to.be.equal(0);
		expect(mocketSocket.receivedEvents.length).to.be.equal(0);
		expect(namespacedSocket.receivedEvents.length).to.be.equal(0);

		mocketServer.emit('random-event');

		expect(mocketServer.defaultNamespace.sentEvents.length).to.be.equal(1);
		expect(mocketServer.defaultNamespace.sentEvents[0].name).to.be.equal('random-event');
		expect(mocketSocket.receivedEvents.length).to.be.equal(1);
		expect(mocketSocket.receivedEvents[0].name).to.be.equal('random-event');
		expect(namespacedSocket.receivedEvents.length).to.be.equal(0);
	})
})