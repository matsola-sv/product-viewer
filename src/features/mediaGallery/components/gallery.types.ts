import type { MediaItem } from '../models/media.types';

export interface GalleryProps {
	items: MediaItem[];
	loop?: boolean;
	thumbnail?: {
		width: number;
		height: number;
	};
	autoplay?: boolean;
	onAutoplayChange?: (value: boolean) => void;
}
