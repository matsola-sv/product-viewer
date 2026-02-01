export type ImageItem = {
	id: string;
	type: 'image';
	src: string;
	alt?: string;
};

export type VideoItem = {
	id: string;
	type: 'video';
	src: string;
	embedded?: boolean; // true = iframe (YouTube / Vimeo), false = <video>
	thumbnail?: string; // image for small previews
	poster?: string; // splash screen for <video> (shows in main slider)
};

export type MediaItem = ImageItem | VideoItem;
