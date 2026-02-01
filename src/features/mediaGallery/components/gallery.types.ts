import type { SxProps, Theme } from '@mui/material';

import type {
	AutoplayProgressCallback,
	SlideChangeCallback,
	SlideClickCallback,
} from '../models/gallery';
import type { MediaItem } from '../models/media';

export interface GalleryProps {
	items: MediaItem[];
	thumbnail?: { width: number; height: number };
	style?: SxProps<Theme>;

	onClick?: SlideClickCallback;
	onSlideChange?: SlideChangeCallback;
	onAutoplayTimeLeft?: AutoplayProgressCallback;
}
