import type { MediaItem, VideoItem } from '../models/media';

/**
 * Enable YouTube JS API on the URL for programmatic video control (play/pause/stop).
 **/
export const addYouTubeApi = (url: string): string => {
	if (!url.includes('youtube.com')) {
		return url;
	}
	const urlEntity = new URL(url);
	urlEntity.searchParams.set('enablejsapi', '1');

	return urlEntity.toString();
};

export const isYouTubeIframe = (iframe: HTMLIFrameElement): boolean => {
	const src = iframe.src;

	return (
		src.includes('youtube.com') ||
		src.includes('youtu.be') ||
		src.includes('youtube-nocookie.com')
	);
};

/** Pause and reset all native <video> elements on the page. */
export const stopNativeVideos = () => {
	document.querySelectorAll<HTMLVideoElement>('video').forEach(video => {
		video.pause();
		video.currentTime = 0;
	});
};

/**  Send YouTube iframe API command to pause the video. */
export const stopYouTubeIframe = (iframe: HTMLIFrameElement) => {
	const win = iframe.contentWindow;
	if (!win) return;

	const message = {
		event: 'command',
		func: 'pauseVideo',
		args: [],
	};

	win.postMessage(JSON.stringify(message), '*');
};

/**
 * Type guard: tells TypeScript that when this returns true,
 * the item is definitely an VideoItem (so we can safely access video-only fields).
 */
export const isVideo = (item?: MediaItem): item is VideoItem => {
	return !!item && item.type === 'video';
};
