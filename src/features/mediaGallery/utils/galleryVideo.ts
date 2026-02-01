import { isYouTubeIframe, stopNativeVideos, stopYouTubeIframe } from './video';

/** Stops any playing video inside a given element. */
export const stopSlideVideo = (container: HTMLElement) => {
	const iframe = container?.querySelector('iframe');

	stopNativeVideos();

	if (iframe && isYouTubeIframe(iframe)) {
		stopYouTubeIframe(iframe);
	}
};
