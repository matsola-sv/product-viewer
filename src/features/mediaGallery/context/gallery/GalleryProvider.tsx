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

	const [activeIndex, setActiveIndex] = useState(initialIndex);
	const [isAutoplay, setIsAutoplay] = useState(autoplay);
	const [autoplayProgress, setAutoplayProgress] = useState<AutoplayProgressState | null>(
		null,
	);

	const toggleAutoplay = useCallback(() => {
		setIsAutoplay(prev => !prev);
	}, []);

	const value = useMemo<GalleryContextValue>(
		() => ({
			total: total,
			activeIndex,
			loop,
			autoplay: isAutoplay,
			autoplayProgress,
			setActiveIndex,
			toggleAutoplay,
			setAutoplayProgress,
		}),
		[activeIndex, total, loop, isAutoplay, autoplayProgress, toggleAutoplay],
	);

	return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
};
