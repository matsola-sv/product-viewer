import { useCallback } from 'react';

import type {
	AutoplayProgressCallback,
	SlideChangeCallback,
	SlideClickCallback,
	SlideState,
	SlideStateChange,
} from '../models/gallery';

import { stopSlideVideo } from '../utils/galleryVideo';

import { useGalleryContext } from './useGalleryContext';

interface UseGalleryParams {
	onClick?: SlideClickCallback;
	onSlideChange?: SlideChangeCallback;
	onAutoplayTimeLeft?: AutoplayProgressCallback;
}

/**
 * Business logic layer for gallery
 * - Manages context updates
 * - Handles video stop logic
 * - Calls external callbacks
 */
export const useGallery = (params: UseGalleryParams) => {
	/** External handlers */
	const { onClick, onSlideChange, onAutoplayTimeLeft } = params;

	/** Context setters for updating gallery state */
	const { setActiveIndex, setAutoplayProgress } = useGalleryContext();

	const handleSlideChange = useCallback(
		(event: SlideStateChange) => {
			// Stop video on previous slide
			if (event.prev?.slideEl) {
				stopSlideVideo(event.prev?.slideEl);
			}

			setActiveIndex(event.active.index);
			onSlideChange?.(event);
		},
		[setActiveIndex, onSlideChange],
	);

	const handleClick = useCallback(
		(event: SlideState) => {
			onClick?.(event);
		},
		[onClick],
	);

	const handleAutoplayProgress = useCallback(
		(time: number, progress: number) => {
			setAutoplayProgress({ time, progress });
			onAutoplayTimeLeft?.(time, progress);
		},
		[setAutoplayProgress, onAutoplayTimeLeft],
	);

	return {
		handleSlideChange,
		handleClick,
		handleAutoplayProgress,
	};
};
