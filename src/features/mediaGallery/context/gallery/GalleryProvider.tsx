import type { FC, PropsWithChildren } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { MediaItem } from '../../models/media';

import { GalleryContext, type GalleryContextValue } from './GalleryContext';

interface GalleryProviderProps {
	slides: MediaItem[];
	activeIndex?: number;
	loop?: boolean;
	autoplay?: boolean;
}

export const GalleryProvider: FC<PropsWithChildren<GalleryProviderProps>> = props => {
	const {
		slides,
		activeIndex: initialIndex = 0,
		loop = false,
		autoplay = false,
		children,
	} = props;

	const [zoomed, setZoomed] = useState(false);
	const [activeIndex, setActiveIndex] = useState(initialIndex);
	const [autoplayState, setAutoplayState] = useState(autoplay);
	const [canZoom, setCanZoom] = useState(false);

	/** Manage zoom availability for the active slide */
	useEffect(() => {
		const slide = slides[activeIndex];

		if (slide) {
			setCanZoom(slide.type === 'image');
		}
	}, [activeIndex, slides]);

	const toggleAutoplay = useCallback(() => setAutoplayState(prev => !prev), []);

	const toggleZoom = useCallback(() => {
		if (canZoom) {
			setZoomed(prev => !prev);
		}
	}, [canZoom]);

	const value = useMemo<GalleryContextValue>(
		() => ({
			total: slides.length,
			activeIndex,
			loop,
			zoomed,
			canZoom,
			autoplay: autoplayState,
			setActiveIndex,
			toggleAutoplay,
			toggleZoom,
		}),
		[
			slides.length,
			activeIndex,
			loop,
			zoomed,
			canZoom,
			autoplayState,
			toggleAutoplay,
			toggleZoom,
		],
	);

	return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
};
