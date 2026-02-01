import type { FC, PropsWithChildren } from 'react';
import { useCallback, useMemo, useState } from 'react';

import type { AutoplayProgressState } from '../../models/gallery';

import { GalleryContext, type GalleryContextValue } from './GalleryContext';

interface GalleryProviderProps {
	activeIndex?: number;
	loop?: boolean;
	autoplay?: boolean;
}

export const GalleryProvider: FC<PropsWithChildren<GalleryProviderProps>> = props => {
	const { children, activeIndex: initialIndex = 0, loop = false, autoplay = false } = props;

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
			activeIndex,
			loop,
			autoplay: isAutoplay,
			autoplayProgress,
			setActiveIndex,
			toggleAutoplay,
			setAutoplayProgress,
		}),
		[activeIndex, loop, isAutoplay, autoplayProgress, toggleAutoplay],
	);

	return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
};
