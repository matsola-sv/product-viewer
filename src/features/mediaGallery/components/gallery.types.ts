import type { MediaItem } from '../models/media.types';

export interface GalleryProps {
	items: MediaItem[];
	activeIndex?: number;
	loop?: boolean;
	autoplay?: boolean;
	thumbnail?: {
		width: number;
		height: number;
	};

	onAutoplayChange?: (value: boolean) => void;
}
