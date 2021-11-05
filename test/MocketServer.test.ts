import { MocketSocket } from '../src/classes/Socket/MocketSocket';
import { expect } from 'chai';
import { MocketServer } from '../src/classes/Server/MocketServer';
import { ServerSocket } from '../src/classes/Socket/ServerSocket';

describe('MocketServer', () => {
	let mocketServer: MocketServer;
	let mocketSocket: MocketSocket;

	beforeEach(() => {
		mocketServer = new MocketServer();
		mocketSocket = mocketServer.createSocket();
	})

	it('should bind events to serverSideSocket', () => {
		mocketServer.on('connection', (socket) => {
			expect(socket instanceof ServerSocket).to.be.true;
		})

		mocketServer.createSocket();
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

	it('should be able to handle auth object', () => {
		const socket = mocketServer.createSocket({
			id: 'test-id'
		});

		expect(socket.handshake.auth.id).to.be.equal('test-id');
	})

	it('should be able to use connection event', () => {
		const ack = (socket) => {
			socket.handshake.auth.isTriggered = true;
		}

		mocketServer.on('connection', (socket: MocketSocket) => {
			socket.on('test-event', () => ack(socket))
		})

		const newMocket = mocketServer.createSocket();
		const anotherNewMocket = mocketServer.createSocket();

		expect(newMocket.serverSideSocket.eventPlayer.events.registeredEvents.size).to.be.equal(1);
		expect(anotherNewMocket.serverSideSocket.eventPlayer.events.registeredEvents.size).to.be.equal(1);

		newMocket.emit('test-event')

		expect(newMocket.serverSideSocket.handshake.auth.isTriggered).to.be.true;
		expect(anotherNewMocket.serverSideSocket.handshake.auth.isTriggered).to.be.undefined;
	})
})