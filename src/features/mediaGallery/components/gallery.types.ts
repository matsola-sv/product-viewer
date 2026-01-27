import type { SxProps, Theme } from '@mui/material';

import type { MediaItem } from '../models/media.types';
import type { SwiperClickHandler, SwiperSlideChangeHandler } from '../models/swiper';

export interface GalleryProps {
	items: MediaItem[];
	activeIndex?: number;
	loop?: boolean;
	autoplay?: boolean;
	style?: SxProps<Theme>;
	thumbnail?: {
		width: number;
		height: number;
	};

	onClick?: SwiperClickHandler;
	onSlideChange?: SwiperSlideChangeHandler;
	onAutoplayChange?: (value: boolean) => void;
}
