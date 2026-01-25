import { useEffect } from 'react';

import type { Swiper as SwiperType } from 'swiper';
import type { AutoplayOptions } from 'swiper/types';

interface Params {
	swiper: SwiperType | null;
	autoplay: boolean;
	autoplayOptions?: AutoplayOptions;
}

/**
 * Syncs autoplay prop with Swiper autoplay API for dynamic control.
 * Without this, Swiper autoplay cannot be toggled after initialization.
 */
export const useAutoplayControl = ({ swiper, autoplay }: Params) => {
	useEffect(() => {
		if (!swiper || !swiper.autoplay) return;

		if (autoplay) {
			swiper.autoplay.start();
			return;
		}
		swiper.autoplay.stop();
	}, [swiper, autoplay]);
};
