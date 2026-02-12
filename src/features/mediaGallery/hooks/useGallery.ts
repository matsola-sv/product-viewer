import { useCallback, useMemo } from 'react';

import type {
	AutoplayTimeLeftFn,
	SlideChangeFn,
	SlideClickFn,
	SlideState,
	SlideStateChange,
	ZoomChangeFn,
} from '../models/gallery';

import { stopSlideVideo } from '../utils/galleryVideo';

import { useAutoplayTimeLeft } from './useAutoplayTimeLeft';
import { useGalleryContext } from './useGalleryContext';

interface UseGalleryParams {
	enableZoom?: boolean;
	onClick?: SlideClickFn;
	onSlideChange?: SlideChangeFn;
	onAutoplayTimeLeft?: AutoplayTimeLeftFn;
}

interface UseGalleryResult {
	handleClick: SlideClickFn;
	handleSlideChange: SlideChangeFn;
	handleAutoplayProgress: AutoplayTimeLeftFn;
	handleZoomChange: ZoomChangeFn;
	cursor?: string;
}

/**
 * Business logic layer for gallery
 * - Manages context updates
 * - Handles video stop logic
 * - Calls external callbacks
 */
export const useGallery = (params: UseGalleryParams): UseGalleryResult => {
	/** External handlers */
	const { enableZoom = false, onClick, onSlideChange, onAutoplayTimeLeft } = params;

	/** Context setters for updating gallery state */
	const { setActiveIndex, zoomed, toggleZoom } = useGalleryContext();
	const { setTimeLeft } = useAutoplayTimeLeft();

	const cursor = useMemo(() => {
		if (!enableZoom) {
			return undefined;
		}

		return zoomed ? 'zoom-out' : 'zoom-in';
	}, [enableZoom, zoomed]);

	const handleSlideChange = useCallback(
		(event: SlideStateChange) => {
			// Stop video on previous slide
			if (event.prev?.slideEl) {
				stopSlideVideo(event.prev?.slideEl);
			}

			// Reset zoom when changing slides
			if (enableZoom && zoomed) {
				toggleZoom();
			}

			setActiveIndex(event.active.index);
			onSlideChange?.(event);
		},
		[setActiveIndex, onSlideChange, enableZoom, zoomed, toggleZoom],
	);

	/**  Toggle zoom (if enabled) and call onClick handler */
	const handleClick = useCallback(
		(event: SlideState) => {
			if (enableZoom) {
				toggleZoom();
			}

			onClick?.(event);
		},
		[onClick, toggleZoom, enableZoom],
	);

	const handleAutoplayProgress = useCallback(
		(time: number, progress: number) => {
			setTimeLeft(time, progress);
			onAutoplayTimeLeft?.(time, progress);
		},
		[onAutoplayTimeLeft, setTimeLeft],
	);

	const handleZoomChange = useCallback(
		(nextZoomed: boolean) => {
			// Synchronize zoom state with external value
			if (nextZoomed !== zoomed) {
				toggleZoom();
			}
		},
		[zoomed, toggleZoom],
	);

	return {
		cursor,
		handleClick,
		handleSlideChange,
		handleAutoplayProgress,
		handleZoomChange,
	};
};
