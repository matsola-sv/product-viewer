import { useCallback, useEffect, useState } from 'react';

import type { Swiper as SwiperType } from 'swiper';

import type { SwiperClickHandler, SwiperSlideChangeHandler } from '../models/swiper';

import { stopSlideVideo } from '../utils/galleryVideo';

interface SwiperParams {
	loop?: boolean;
	activeIndex?: number;
	onClick?: SwiperClickHandler;
	onSlideChange?: SwiperSlideChangeHandler;
}

const useSwiper = (params: SwiperParams) => {
	const { activeIndex = 0, loop = false, onClick, onSlideChange } = params;
	const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

	// Syncs active slide index with Swiper instance
	useEffect(() => {
		if (!swiperInstance || activeIndex == null) return;
		if (swiperInstance.realIndex === activeIndex) return;
		
		if (loop && swiperInstance.slideToLoop) {
			swiperInstance.slideToLoop(activeIndex);
			return;
		}
		
		swiperInstance.slideTo(activeIndex);
	}, [activeIndex, swiperInstance, loop]);

	const slideChangeHandler = useCallback(
		(swiper: SwiperType) => {
			stopSlideVideo(swiper);
			onSlideChange?.(swiper);
		},
		[onSlideChange],
	);

	const clickHandler = useCallback(
		(swiper: SwiperType) => {
			onClick?.(swiper);
		},
		[onClick],
	);

	return { swiperInstance, setSwiperInstance, slideChangeHandler, clickHandler };
};

export default useSwiper;
