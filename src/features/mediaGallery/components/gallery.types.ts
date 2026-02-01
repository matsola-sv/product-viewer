import type { SxProps, Theme } from '@mui/material';

import type {
	AutoplayProgressCallback,
	SlideChangeCallback,
	SlideClickCallback,
} from '../models/gallery';
import type { MediaItem } from '../models/media';

export interface GalleryThumbnailProps {
	width: number;
	height: number;
}

export interface GalleryProps {
	items: MediaItem[];
	thumbnail?: GalleryThumbnailProps;
	style?: SxProps<Theme>;

	onClick?: SlideClickCallback;
	onSlideChange?: SlideChangeCallback;
	onAutoplayTimeLeft?: AutoplayProgressCallback;
}
