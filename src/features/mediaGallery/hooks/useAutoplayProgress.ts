import { useContext } from 'react';

import type { AutoplayResetTimeLeftFn, AutoplayTimeLeftFn } from '../models/gallery';

import { AutoplayTimeLeftContext } from '../context';

export interface AutoplayTimeLeftResult {
	seconds: number;
	progress: number; // [0-1]
	setTimeLeft: AutoplayTimeLeftFn;
	resetTimeLeft: AutoplayResetTimeLeftFn;
}

/** */
export const useAutoplayTimeLeft = (): AutoplayTimeLeftResult => {
	const context = useContext(AutoplayTimeLeftContext);

	// Prevent errors if gallery is used without autoplay progress provider
	if (!context) {
		return {
			seconds: 0,
			progress: 0,
			setTimeLeft: () => {},
			resetTimeLeft: () => {},
		};
	}

	const { timeLeft, setTimeLeft, resetTimeLeft } = context;
	const { time, progress } = timeLeft;
	const seconds = Math.ceil(time / 1000);

	return { seconds, progress, setTimeLeft, resetTimeLeft };
};
