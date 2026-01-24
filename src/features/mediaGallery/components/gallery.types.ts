import type { MediaItem } from '../models/media.types';
import type { AutoplayOptions } from 'swiper/types';

export interface GalleryProps {
	items: MediaItem[];
	loop?: boolean;
	thumbnail?: {
		width: number;
		height: number;
	};
	autoplay?: boolean;
	autoplayOptions?: AutoplayOptions;
}
