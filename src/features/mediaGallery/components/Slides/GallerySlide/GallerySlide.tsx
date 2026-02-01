import { type FC } from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';

import type { MediaItem } from '@/features/mediaGallery/models/media';

import EmbeddedVideoSlide from './EmbeddedVideoSlide';
import ImageSlide from './ImageSlide';
import VideoSlide from './VideoSlide';

interface GallerySlideProps {
	item: MediaItem;
	style?: SxProps<Theme>;
}

const renderMediaSlide = (item: MediaItem) => {
	if (item.type === 'image') {
		return <ImageSlide item={item} />;
	}

	if (item.embedded) {
		return <EmbeddedVideoSlide item={item} />;
	}

	return <VideoSlide item={item} />;
};

const baseStyle: SxProps<Theme> = {
	width: '100%',
	height: '100%',
	overflow: 'hidden',
	position: 'relative',

	// For transparent images (fixes 'Fade' showing previous slide)
	background: '#cecccc',
};

const GallerySlide: FC<GallerySlideProps> = ({ item, style }) => {
	return <Box sx={{ ...baseStyle, ...style }}>{renderMediaSlide(item)}</Box>;
};

export default GallerySlide;
