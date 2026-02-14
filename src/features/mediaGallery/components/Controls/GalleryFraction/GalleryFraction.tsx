import type { FC } from 'react';

import { type BoxProps } from '@mui/material';

import { useGalleryContext } from '@/features/mediaGallery/hooks';

import GalleryFractionView from './GalleryFractionView';

const GalleryFraction: FC<BoxProps> = props => {
	const { activeIndex, total } = useGalleryContext();

	return (
		<GalleryFractionView
			current={activeIndex + 1}
			total={total}
			{...props}
		/>
	);
};

export default GalleryFraction;
