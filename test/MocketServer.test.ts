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

	it('should be able to bind connection event', () => {
		let count = 0;

		const cb = () => {
			count++;
		}

		expect(count).to.be.equal(0);

		mocketServer.on('connection', cb);

		mocketServer.createSocket();

		expect(count).to.be.equal(1);

		mocketServer.createSocket();
		mocketServer.createSocket();
		mocketServer.createSocket();

		expect(count).to.be.equal(4);
	})

	it('should be able to bind connection event with socket parameter', () => {
		const cb = (socket: MocketSocket) => {
			expect(socket.id).to.be.equal(2);
		}

		mocketServer.on('connection', cb);

		mocketServer.createSocket();
	})

	it('should be able to leaveAll rooms', () => {
		expect(mocketSocket.rooms.size).to.be.equal(0);

		mocketSocket.join('random-room');

		expect(mocketSocket.rooms.size).to.be.equal(1);

		mocketSocket.join(['random-room-2', 'random-room-3', 'random-rpom-4']);

		expect(mocketSocket.rooms.size).to.be.equal(4);

		mocketSocket.leaveAll();

		expect(mocketSocket.rooms.size).to.be.equal(0);
	})
})