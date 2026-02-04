import { useCallback, useMemo } from 'react';

import type {
	AutoplayProgressCallback,
	SlideChangeCallback,
	SlideClickCallback,
	SlideState,
	SlideStateChange,
	ZoomChangeCallback,
} from '../models/gallery';

import { stopSlideVideo } from '../utils/galleryVideo';

import { useGalleryContext } from './useGalleryContext';

interface UseGalleryParams {
	enableZoom?: boolean;
	onClick?: SlideClickCallback;
	onSlideChange?: SlideChangeCallback;
	onAutoplayTimeLeft?: AutoplayProgressCallback;
}

interface UseGalleryResult {
	handleClick: SlideClickCallback;
	handleSlideChange: SlideChangeCallback;
	handleAutoplayProgress: AutoplayProgressCallback;
	handleZoomChange: ZoomChangeCallback;
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
	const { setActiveIndex, setAutoplayProgress, zoomed, toggleZoom } = useGalleryContext();

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
			setAutoplayProgress({ time, progress });
			onAutoplayTimeLeft?.(time, progress);
		},
		[setAutoplayProgress, onAutoplayTimeLeft],
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
