import type { FC, PropsWithChildren } from 'react';
import { useCallback, useMemo, useState } from 'react';

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

	const toggleAutoplay = useCallback(() => setAutoplayState(prev => !prev), []);
	const toggleZoom = useCallback(() => setZoomed(prev => !prev), []);

	const value = useMemo<GalleryContextValue>(
		() => ({
			total,
			activeIndex,
			loop,
			zoomed,
			autoplay: autoplayState,
			setActiveIndex,
			toggleAutoplay,
			toggleZoom,
		}),
		[total, activeIndex, loop, autoplayState, zoomed, toggleAutoplay, toggleZoom],
	);

	return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
};
