import { useEffect, useState } from 'react';

import type { Swiper as SwiperType } from 'swiper';

interface SwiperParams {
	activeIndex?: number;
	loop?: boolean;
}

const useSwiper = (params: SwiperParams) => {
	const { activeIndex = 0, loop = false } = params;
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

	return { swiperInstance, setSwiperInstance };
};

export default useSwiper;
