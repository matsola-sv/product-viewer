import { createContext } from 'react';

import type { AutoplayProgressState } from '../../models/gallery';

export interface GalleryContextValue {
	total: number; // Total number of items
	activeIndex: number;
	loop: boolean;
	autoplay: boolean;
	autoplayProgress: AutoplayProgressState | null;
	zoomed: boolean;
	setActiveIndex: (index: number) => void;
	setAutoplayProgress: (value: AutoplayProgressState) => void;
	toggleAutoplay: () => void;
	toggleZoom: () => void;
}

export const GalleryContext = createContext<GalleryContextValue | null>(null);
