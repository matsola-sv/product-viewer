import type { Swiper as SwiperType } from 'swiper';

import { isYouTubeIframe, stopNativeVideos, stopYouTubeIframe } from './video';

/** Stops video on previous slide during navigation */
export const stopSlideVideo = (swiper: SwiperType) => {
	stopNativeVideos();

	const prevSlide = swiper.slides[swiper.previousIndex];
	const iframe = prevSlide?.querySelector('iframe');

	if (iframe && isYouTubeIframe(iframe)) {
		stopYouTubeIframe(iframe);
	}
};
