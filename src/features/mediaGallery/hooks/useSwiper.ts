import { useCallback, useEffect, useState } from 'react';

import type { Swiper as SwiperType } from 'swiper';

import type {
	AutoplayProgressCallback,
	SlideChangeCallback,
	SlideClickCallback,
} from '../models/gallery';

interface UseSwiperParams {
	activeIndex: number;
	autoplay: boolean;
	loop: boolean;
	onSlideChange?: SlideChangeCallback;
	onClick?: SlideClickCallback;
	onAutoplayTimeLeft?: AutoplayProgressCallback;
}

export type SwiperSlideChangeHandler = (swiper: SwiperType) => void;
export type SwiperClickHandler = (swiper: SwiperType) => void;

/** Pure Swiper adapter - converts Swiper events to generic callbacks */
export const useSwiper = (params: UseSwiperParams) => {
	const { activeIndex, autoplay, loop, onSlideChange, onClick, onAutoplayTimeLeft } = params;
	const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

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
		if (!swiperInstance || !swiperInstance.autoplay) return;

		if (autoplay) {
			swiperInstance.autoplay.start();
		} else {
			swiperInstance.autoplay.stop();
		}
	}, [swiperInstance, autoplay]);

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
		setSwiperInstance,
		clickHandler,
		slideChangeHandler,
		autoplayTimeLeftHandler,
	};
};
