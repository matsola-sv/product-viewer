import type { FC } from 'react';

import { useGalleryContext } from '@/features/mediaGallery/hooks';

import type { GalleryActionProps } from '../actions.types';

import GalleryFractionView from './GalleryFractionView';

const GalleryFraction: FC<GalleryActionProps> = props => {
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
