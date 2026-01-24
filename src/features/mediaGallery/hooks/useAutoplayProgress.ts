import { useRef } from 'react';

import type { Swiper as SwiperType } from 'swiper';

export const useAutoplayProgress = () => {
	const progressCircle = useRef<HTMLElement>(null);
	const progressContent = useRef<HTMLElement>(null);

	const onAutoplayTimeLeft = (_: SwiperType, time: number, progress: number) => {
		if (progressCircle.current) {
			progressCircle.current.style.setProperty(
				'--autoplay-progress', // Used by AutoplayProgress component
				String(1 - progress),
			);
		}
		if (progressContent.current) {
			progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
		}
	};

	return {
		progressCircle: progressCircle,
		progressContent: progressContent,
		onAutoplayTimeLeft,
	};
};
