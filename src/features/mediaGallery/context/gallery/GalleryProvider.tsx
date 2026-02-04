import type { FC, PropsWithChildren } from 'react';
import { useCallback, useMemo, useState } from 'react';

import type { AutoplayProgressState } from '../../models/gallery';

import { GalleryContext, type GalleryContextValue } from './GalleryContext';

interface GalleryProviderProps {
	total: number;
	activeIndex?: number;
	loop?: boolean;
	autoplay?: boolean;
}

export const GalleryProvider: FC<PropsWithChildren<GalleryProviderProps>> = props => {
	const {
		children,
		total,
		loop = false,
		autoplay = false,
		activeIndex: initialIndex = 0,
	} = props;

	const [zoomed, setZoomed] = useState(false);
	const [activeIndex, setActiveIndex] = useState(initialIndex);
	const [autoplayState, setAutoplayState] = useState(autoplay);
	const [autoplayProgress, setAutoplayProgress] = useState<AutoplayProgressState | null>(
		null,
	);

	const toggleAutoplay = useCallback(() => setAutoplayState(prev => !prev), []);
	const toggleZoom = useCallback(() => setZoomed(prev => !prev), []);

	const value = useMemo<GalleryContextValue>(
		() => ({
			total,
			activeIndex,
			loop,
			autoplay: autoplayState,
			zoomed,
			autoplayProgress,
			setActiveIndex,
			setAutoplayProgress,
			toggleAutoplay,
			toggleZoom,
		}),
		[
			total,
			activeIndex,
			loop,
			autoplayState,
			zoomed,
			autoplayProgress,
			toggleAutoplay,
			toggleZoom,
		],
	);

	return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
};
