import type { SxProps, Theme } from '@mui/material';

import type { AutoplayTimeLeftFn, SlideChangeFn, SlideClickFn } from '../models/gallery';
import type { MediaItem } from '../models/media';

export interface GalleryThumbnailProps {
	width: number;
	height: number;
}

export interface GalleryProps {
	items: MediaItem[];
	thumbnail?: GalleryThumbnailProps;
	enableZoom?: boolean;
	style?: SxProps<Theme>;
	onClick?: SlideClickFn;
	onSlideChange?: SlideChangeFn;
	onAutoplayTimeLeft?: AutoplayTimeLeftFn;
}
