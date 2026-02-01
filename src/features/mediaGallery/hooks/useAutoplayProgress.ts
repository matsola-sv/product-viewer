import { useRef } from 'react';

export const useAutoplayProgress = () => {
	const progressCircle = useRef<HTMLElement>(null);
	const progressContent = useRef<HTMLElement>(null);

	/** Refreshes autoplay UI (progress circle + time label) */
	const updateProgress = (time: number, progress: number) => {
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
		progressCircle,
		progressContent,
		updateProgress,
	};
};
