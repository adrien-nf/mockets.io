import { expect } from 'chai';
import { MocketServer } from '../src';
import { ServerSocket } from '../src/classes/Socket/ServerSocket';

describe('ServerSocket', () => {
	let mocketServer: MocketServer;

	beforeEach(() => {
		mocketServer = new MocketServer();
	})

	it('should be able to send events', () => {
		const mocketSocket = mocketServer.createSocket();

		mocketServer.on('connection', (socket) => {
			socket.emit('test-event')
		});

		const newMocketSocket = mocketServer.createSocket();

		expect(mocketSocket.receivedEvents.length).to.be.equal(1, "sdqsdq");
		expect(newMocketSocket.receivedEvents.length).to.be.equal(1, "qdsqd");
		expect(newMocketSocket.serverSideSocket.sentEvents.length).to.be.equal(1, "adsqd");
	})

	it('should not create loops', () => {
		let isTriggered = false;

		mocketServer.on('connection', (socket: ServerSocket) => {
			socket.on('test', () => {
				socket.emit('test');
			})
		})

		const newSocket = mocketServer.createSocket();
		newSocket.on('test', () => {
			isTriggered = true;
		})

		newSocket.emit('test');
		expect(newSocket.serverSideSocket.receivedEvents.length).to.be.equal(1);
		expect(newSocket.serverSideSocket.sentEvents.length).to.be.equal(1);
		expect(newSocket.receivedEvents.length).to.be.equal(1);
		expect(isTriggered).to.be.true;
	})
})