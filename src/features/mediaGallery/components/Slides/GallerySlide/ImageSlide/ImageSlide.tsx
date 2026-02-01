import type { FC } from 'react';

import { Box } from '@mui/material';

import type { ImageItem } from '@/features/mediaGallery/models/media';

export interface ImageSlideProps {
	item: ImageItem;
}

const ImageSlide: FC<ImageSlideProps> = ({ item }) => (
	<Box
		component='img'
		src={item.src}
		alt={item.alt}
		sx={{
			width: '100%',
			height: '100%',
			objectFit: 'cover',
			display: 'block',
		}}
	/>
);

export default ImageSlide;
