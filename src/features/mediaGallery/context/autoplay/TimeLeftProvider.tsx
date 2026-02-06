import { type FC, type PropsWithChildren, useCallback, useState } from 'react';

import type { AutoplayTimeLeftState } from '../../models/gallery';

import { AutoplayTimeLeftContext } from './TimeLeftContext';

/**
 * This provider is separate so each gallery can have its own autoplay state.
 * Otherwise, multiple galleries would update a single shared progress value, causing glitches.
 */
export const AutoplayTimeLeftProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, setState] = useState<AutoplayTimeLeftState>({
		time: 0,
		progress: 0,
	});

	const setTimeLeft = useCallback((time: number, progress: number) => {
		setState({ time, progress });
	}, []);

	const resetTimeLeft = useCallback(() => setTimeLeft(0, 0), [setTimeLeft]);

	return (
		<AutoplayTimeLeftContext.Provider
			value={{ timeLeft: state, setTimeLeft, resetTimeLeft }}
		>
			{children}
		</AutoplayTimeLeftContext.Provider>
	);
};
