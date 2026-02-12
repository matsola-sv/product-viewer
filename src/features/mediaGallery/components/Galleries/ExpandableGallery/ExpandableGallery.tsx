import { type FC, useState } from 'react';

import { Box, type SxProps, type Theme, useMediaQuery, useTheme } from '@mui/material';

import GalleryActions from '@/features/mediaGallery/components/Controls/GalleryActions';
import { AutoplayTimeLeftProvider } from '@/features/mediaGallery/context';
import { GalleryProvider } from '@/features/mediaGallery/context/gallery';
import type { MediaItem } from '@/features/mediaGallery/models/media';

import type { GalleryActionProps } from '../../Controls/actions.types';
import type { GalleryProps, GalleryThumbnailProps } from '../../gallery.types';

import GalleryDialog from '../GalleryDialog';
import HorizontalGallery from '../HorizontalGallery';
import VerticalGallery from '../VerticalGallery';

import { GalleryFraction } from '../../Controls';

interface ExpandableGalleryProps {
	items: MediaItem[];
	activeIndex?: number;
	thumbnail?: GalleryThumbnailProps;
	style?: SxProps<Theme>;
}

/** Base style for gallery control action elements */
const galleryActionStyle: GalleryActionProps = {
	size: 36,
	bgColor: 'rgba(33,43,54,0.9)',
	hoverColor: '#3d1a9e',
	color: '#fff',
	fontSize: 16,
	fontWeight: 400,
	strokeColor: '#fff',
	strokeWidth: 2,
};

const ExpandableGallery: FC<ExpandableGalleryProps> = props => {
	const actionClass = 'g-action';
	const skipCloseSelector = `.swiper-button-prev, .swiper-button-next, .${actionClass}`;

	const { items, thumbnail, style, activeIndex: initIndex = 0 } = props;

	const theme = useTheme();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // xs / sm

	const galleryProps: GalleryProps = { items, thumbnail };
	const dialogGalleryProps: GalleryProps = {
		...galleryProps,
		enableZoom: true,
	};

	const openDialog = (): void => {
		setIsDialogOpen(true);
	};

	const closeDialog = (): void => {
		setIsDialogOpen(false);
	};

	return (
		<>
			<GalleryProvider
				slides={items}
				autoplay={false}
				activeIndex={initIndex}
			>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						...style,
					}}
				>
					<AutoplayTimeLeftProvider>
						<GalleryActions
							actionClass={actionClass}
							actionStyle={galleryActionStyle}
						/>

						<Box sx={{ height: 500 }}>
							<HorizontalGallery
								{...galleryProps}
								style={{ cursor: 'grab' }}
								onClick={openDialog}
							/>
						</Box>
					</AutoplayTimeLeftProvider>
				</Box>

				<AutoplayTimeLeftProvider>
					<GalleryDialog
						skipCloseSelector={skipCloseSelector}
						actions={
							<GalleryActions
								actionClass={actionClass}
								actionStyle={galleryActionStyle}
								left={<GalleryFraction {...galleryActionStyle} />}
							/>
						}
						open={isDialogOpen}
						onClose={closeDialog}
						actionsSx={{
							width: '100%',
							backgroundColor: '#eee',
							boxSizing: 'border-box',
						}}
					>
						{isSmallScreen ? (
							<HorizontalGallery {...dialogGalleryProps} />
						) : (
							<VerticalGallery {...dialogGalleryProps} />
						)}
					</GalleryDialog>
				</AutoplayTimeLeftProvider>
			</GalleryProvider>
		</>
	);
};

export default ExpandableGallery;
