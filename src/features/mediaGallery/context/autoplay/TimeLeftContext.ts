import { createContext } from 'react';

import type {
	AutoplayResetTimeLeftFn,
	AutoplayTimeLeftFn,
	AutoplayTimeLeftState,
} from '../../models/gallery';

export interface AutoplayTimeLeftContextValue {
	timeLeft: AutoplayTimeLeftState;
	setTimeLeft: AutoplayTimeLeftFn;
	resetTimeLeft: AutoplayResetTimeLeftFn;
}

export const AutoplayTimeLeftContext = createContext<AutoplayTimeLeftContextValue | null>(
	null,
);
