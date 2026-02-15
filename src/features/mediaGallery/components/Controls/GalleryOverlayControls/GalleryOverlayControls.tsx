import { type FC } from 'react';

import { type StackProps } from '@mui/material';

import { galleryClasses } from '@/features/mediaGallery/constants/galleryClasses';
import { useGalleryContext } from '@/features/mediaGallery/hooks';
import type { MediaItem } from '@/features/mediaGallery/models/media';
import { isVideo } from '@/features/mediaGallery/utils/video';

import { ControlsGroup } from '../../Controls';

interface GalleryOverlayControlsProps extends StackProps {
	slides: MediaItem[];
}
const videoStyles = {
	bgcolor: 'rgba(0,0,0,0.45)',
	backdropFilter: 'blur(6px)',
	border: '1px solid rgba(255,255,255,0.3)',
	boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
	color: '#fff',
	textShadow: '0 0 4px rgba(0,0,0,0.6)',

	[`& .${galleryClasses.ctrlIcon} svg`]: {
		stroke: '#fff',
		strokeWidth: 0.5,
		fill: '#fff',
	},
	[`& .${galleryClasses.ctrlIcon}:not(:disabled):hover svg`]: {
		stroke: '#CCA300',
		fill: '#CCA300',
		transform: 'scale(1.1)',
	},
	[`& .${galleryClasses.ctrlActive} svg`]: {
		stroke: '#CCA300',
		fill: '#CCA300',
	},
	[`& .${galleryClasses.ctrlIcon}:disabled svg`]: {
		stroke: 'rgba(255,255,255,0.4)',
		fill: 'rgba(255,255,255,0.4)',
		opacity: 0.4,
	},
	[`& .${galleryClasses.autoprog} svg`]: {
		stroke: '#fff',
	},
	[`& .${galleryClasses.autoprog}`]: {
		color: '#fff',
		textShadow: '0 0 4px rgba(0,0,0,0.6)',
	},
};

const imageStyles = {
	bgcolor: 'rgba(0,0,0,0.25)', // for contrast on white
	backdropFilter: 'blur(6px)',
	border: '1px solid rgba(255,255,255,0.2)',

	[`& .${galleryClasses.ctrlIcon}:disabled svg`]: {
		opacity: 0.55,
	},
	[`& .${galleryClasses.ctrlActive}`]: {
		backgroundColor: 'rgba(0,0,0,0.05)',
	},
};

const GalleryOverlayControls: FC<GalleryOverlayControlsProps> = ({ slides, sx, ...props }) => {
	const { activeIndex } = useGalleryContext();
	const activeItem = slides[activeIndex];

	return (
		<ControlsGroup
			sx={{
				position: 'absolute',
				zIndex: 2,
				borderRadius: 3,
				transition: 'all 0.3s ease',
				top: { xs: 6, sm: 10, md: 14 },
				left: { xs: 6, sm: 10, md: 12 },
				px: { xs: 0.5, sm: 0.75, md: 1 },
				py: { xs: 0.25, sm: 0.5, md: 0.75 },

				...(isVideo(activeItem) ? videoStyles : imageStyles),
				...sx,
			}}
			// Destructured props aren’t in ...props, so sx merges correctly
			{...props}
		>
			{props.children}
		</ControlsGroup>
	);
};

export default GalleryOverlayControls;
