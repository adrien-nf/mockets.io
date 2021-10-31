import { OneTimeEventRegisterer } from '../../src/classes/Event/EventPlayer/EventRegisterer/OneTimeEventRegisterer';
import { expect } from "chai";

describe('OneTimeEventRegisterer', () => {
	let ePlayer: OneTimeEventRegisterer;
	let numberOfTimesCallbackWasPlayed: number;

	const callback = () => {
		numberOfTimesCallbackWasPlayed++;
	}

	beforeEach(() => {
		ePlayer = new OneTimeEventRegisterer();
		numberOfTimesCallbackWasPlayed = 0;
	})

	it('should correctly remove event after playing it', () => {
		expect(numberOfTimesCallbackWasPlayed).to.be.equal(0);

		ePlayer.addEventCallback('count', callback);
		ePlayer.tryToPlay('count');
		ePlayer.tryToPlay('count');

		expect(numberOfTimesCallbackWasPlayed).to.be.equal(1);
	})
})