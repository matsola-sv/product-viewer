import { useEffect } from 'react';

import type { Swiper as SwiperType } from 'swiper';

import type { AutoplayOptions } from 'swiper/types';

interface Params {
	swiper: SwiperType | null;
	autoplay: boolean;
	autoplayOptions?: AutoplayOptions;
}

export const useAutoplay = ({ swiper, autoplay, autoplayOptions }: Params) => {
	// Swiper initializes autoplay only once,
	// so we need to manually start/stop it when the prop changes
	useEffect(() => {
		if (!swiper || !swiper.autoplay) return;

		if (autoplay) {
			swiper.autoplay.start();
			return;
		}
		swiper.autoplay.stop();
	}, [swiper, autoplay]);

	const autoplayValue: AutoplayOptions | false = autoplay
		? (autoplayOptions ?? {
				delay: 3000,
				disableOnInteraction: false,
			})
		: false;

	return { autoplayValue };
};
