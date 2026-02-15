export interface FullscreenResult {
	toggleFullscreen: () => Promise<void>;
	isFullscreen: boolean | undefined;
	isFullscreenSupported: boolean | undefined;
}

export interface DocumentElementWithFullscreen extends HTMLElement {
	msRequestFullscreen?: () => Promise<void>;
	mozRequestFullScreen?: () => Promise<void>;
	webkitRequestFullscreen?: () => Promise<void>;
}

export interface DocumentWithFullscreen extends Document {
	webkitFullscreenElement?: Element;
	mozFullScreenElement?: Element;
	msFullscreenElement?: Element;
	webkitExitFullscreen?: () => Promise<void>;
	mozCancelFullScreen?: () => Promise<void>;
	msExitFullscreen?: () => Promise<void>;
}
