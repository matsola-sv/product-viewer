import { type FC } from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';

import type { MediaItem } from '@/features/mediaGallery/models/media';

import EmbeddedVideoSlide from './EmbeddedVideoSlide';
import ImageSlide from './ImageSlide';
import VideoSlide from './VideoSlide';

interface GallerySlideProps {
	item: MediaItem;
	enableZoom?: boolean;
	style?: SxProps<Theme>;
}

const baseStyle: SxProps<Theme> = {
	width: '100%',
	height: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	position: 'relative',

	// For transparent images (fixes 'Fade' showing previous slide)
	background: '#cecccc',
};

const renderMediaSlide = (item: MediaItem) => {
	if (item.type === 'image') {
		return <ImageSlide item={item} />;
	}

	if (item.embedded) {
		return <EmbeddedVideoSlide item={item} />;
	}

	return <VideoSlide item={item} />;
};

const GallerySlide: FC<GallerySlideProps> = ({ item, enableZoom = false, style }) => {
	const zoomClass = 'swiper-zoom-container';
	const className = enableZoom && item.type === 'image' ? zoomClass : '';

	return (
		<Box
			className={className}
			sx={{ ...baseStyle, ...style }}
		>
			{renderMediaSlide(item)}
		</Box>
	);
};

export default GallerySlide;
