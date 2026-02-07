import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, EffectFade, Navigation, Thumbs, Zoom } from 'swiper/modules';
import type { SwiperModule, SwiperOptions, ZoomOptions } from 'swiper/types';

import type {
	AutoplayTimeLeftFn,
	SlideChangeFn,
	SlideClickFn,
	ZoomChangeFn,
} from '../models/gallery';

export type SwiperHandler = (swiper: SwiperType) => void;
export type SwiperAutoplayHandler = (
	swiper: SwiperType,
	time: number,
	progress: number,
) => void;

interface UseSwiperParams {
	activeIndex: number;
	autoplay: boolean;
	loop: boolean;
	zoomed?: boolean;
	enableZoom?: boolean;
	onClick?: SlideClickFn;
	onSlideChange?: SlideChangeFn;
	onAutoplayTimeLeft?: AutoplayTimeLeftFn;
	onZoomChange?: ZoomChangeFn;
}

interface UseSwiperResult {
	swiperInstance: SwiperType | null;
	swiperModules: SwiperModule[];
	swiperEffect?: SwiperOptions['effect'];
	zoomConfig: ZoomOptions | false;
	setSwiperInstance: (swiper: SwiperType) => void;
	clickHandler: SwiperHandler;
	slideChangeHandler: SwiperHandler;
	autoplayTimeLeftHandler: SwiperAutoplayHandler;
}

/** Pure Swiper adapter - converts Swiper events to generic callbacks */
export const useSwiper = (params: UseSwiperParams): UseSwiperResult => {
	const {
		activeIndex,
		autoplay,
		loop,
		enableZoom = false,
		zoomed = false,
		onSlideChange,
		onClick,
		onAutoplayTimeLeft,
		onZoomChange,
	} = params;

	const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

	const swiperModules = useMemo(() => {
		const baseModules = [Navigation, Thumbs, Autoplay];

		// NOTE: Fade effect conflicts with Zoom, so only one is enabled
		if (enableZoom) {
			return [...baseModules, Zoom];
		}

		return [...baseModules, EffectFade];
	}, [enableZoom]);

	const swiperEffect = useMemo(() => (enableZoom ? undefined : 'fade'), [enableZoom]);

	const zoomConfig = useMemo(() => {
		if (!enableZoom) return false;

		return {
			maxRatio: 3,
			minRatio: 1,
			toggle: false,
		};
	}, [enableZoom]);

	/** Sync activeIndex to Swiper */
	useEffect(() => {
		if (!swiperInstance) return;
		if (swiperInstance.realIndex === activeIndex) return;

		if (loop && swiperInstance.slideToLoop) {
			swiperInstance.slideToLoop(activeIndex);
			return;
		}

		swiperInstance.slideTo(activeIndex);
	}, [activeIndex, loop, swiperInstance]);

	/** Sync autoplay state to Swiper */
	useEffect(() => {
		if (!swiperInstance || !swiperInstance.autoplay) {
			return;
		}

		if (autoplay) {
			swiperInstance.autoplay.start();
			return;
		}

		swiperInstance.autoplay.stop();
	}, [swiperInstance, autoplay]);

	/** Sync zoom state to Swiper */
	useEffect(() => {
		if (!swiperInstance || !swiperInstance.zoom || !enableZoom) return;

		if (zoomed) {
			swiperInstance.zoom.in();
			return;
		}

		swiperInstance.zoom.out();
	}, [swiperInstance, zoomed, enableZoom]);

	/** Listen to Swiper zoom events */
	useEffect(() => {
		if (!swiperInstance || !enableZoom) return;

		const handleZoomChange = (_: SwiperType, scale: number) => {
			onZoomChange?.(scale > 1);
		};

		swiperInstance.on('zoomChange', handleZoomChange);

		return () => {
			swiperInstance.off('zoomChange', handleZoomChange);
		};
	}, [swiperInstance, enableZoom, onZoomChange]);

	const slideChangeHandler = useCallback(
		(swiper: SwiperType) => {
			onSlideChange?.({
				active: {
					index: swiper.realIndex,
					slideEl: swiper.slides[swiper.activeIndex],
				},
				prev: {
					index: swiper.previousIndex,
					slideEl: swiper.slides[swiper.previousIndex],
				},
			});
		},
		[onSlideChange],
	);

	const clickHandler = useCallback(
		(swiper: SwiperType) => {
			onClick?.({
				index: swiper.realIndex,
				slideEl: swiper.slides[swiper.realIndex],
			});
		},
		[onClick],
	);

	/** Ignores Swiper instance, forwards autoplay time & progress to callback */
	const autoplayTimeLeftHandler = useCallback(
		(_: SwiperType, time: number, progress: number) => {
			onAutoplayTimeLeft?.(time, progress);
		},
		[onAutoplayTimeLeft],
	);

	return {
		swiperInstance,
		swiperModules,
		swiperEffect,
		zoomConfig,
		setSwiperInstance,
		clickHandler,
		slideChangeHandler,
		autoplayTimeLeftHandler,
	};
};
