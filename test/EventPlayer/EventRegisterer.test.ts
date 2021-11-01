import { NormalEventRegisterer } from './../../src/classes/Event/EventPlayer/EventRegisterer/NormalEventRegisterer';
import { expect } from "chai";

describe('EventRegisterer', () => {
	let ePlayer: NormalEventRegisterer;
	let numberOfTimesCallbackWasPlayed: number;
	let arg1: string, arg2: string, arg3: string;

	const callback = (argA, argB, argC) => {
		numberOfTimesCallbackWasPlayed++;
		arg1 = argA;
		arg2 = argB;
		arg3 = argC;
	}

	beforeEach(() => {
		ePlayer = new NormalEventRegisterer();
		numberOfTimesCallbackWasPlayed = 0;
	})

	it('should correctly register events', () => {
		expect(ePlayer.registeredEvents.size).to.be.equal(0);
		expect(ePlayer.registeredEvents.get('test')).to.be.undefined;

		ePlayer.addEventCallback('test', callback);

		expect(ePlayer.registeredEvents.size).to.be.equal(1);
		expect(ePlayer.registeredEvents.get('test')[0]).to.be.equal(callback)
	})

	it('should correctly unregister events', () => {
		ePlayer.addEventCallback('test', callback);

		expect(ePlayer.registeredEvents.size).to.be.equal(1);
		expect(ePlayer.registeredEvents.get('test')[0]).to.be.equal(callback)

		ePlayer.removeEventCallback('test', callback);

		expect(ePlayer.registeredEvents.size).to.be.equal(1);
		expect(ePlayer.registeredEvents.get('test').length).to.be.equal(0);
	})

	it('should correctly play events without args', () => {
		expect(numberOfTimesCallbackWasPlayed).to.be.equal(0);

		ePlayer.addEventCallback('count', callback);
		ePlayer.tryToPlay('count');

		expect(numberOfTimesCallbackWasPlayed).to.be.equal(1);
	})

	it('should correctly play events with multiple listeners', () => {
		expect(numberOfTimesCallbackWasPlayed).to.be.equal(0);

		ePlayer.addEventCallback('count', callback);
		ePlayer.tryToPlay('count');

		expect(numberOfTimesCallbackWasPlayed).to.be.equal(1);

		ePlayer.tryToPlay('count');

		expect(numberOfTimesCallbackWasPlayed).to.be.equal(2);

		ePlayer.addEventCallback('count', callback);
		ePlayer.tryToPlay('count');

		expect(numberOfTimesCallbackWasPlayed).to.be.equal(4);
	})

	it('should correctly play events with args', () => {
		expect(numberOfTimesCallbackWasPlayed).to.be.equal(0);
		ePlayer.addEventCallback('count', callback);

		ePlayer.tryToPlay('count', 'shi', 'fu', 'mi');

		expect(arg1).to.be.equal('shi');
		expect(arg2).to.be.equal('fu');
		expect(arg3).to.be.equal('mi');
	})

	it('should not crash when trying to remove event that does not exist', () => {
		expect(ePlayer.registeredEvents.size).to.be.equal(0);

		ePlayer.removeEventCallback('not-present-in-here', () => {
			//
		});

		expect(ePlayer.registeredEvents.size).to.be.equal(0);
	})
})