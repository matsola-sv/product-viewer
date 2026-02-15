import { type FC, useState } from 'react';

import { Box, type SxProps, type Theme, useMediaQuery, useTheme } from '@mui/material';

import { AutoplayTimeLeftProvider } from '@/features/mediaGallery/context';
import { GalleryProvider } from '@/features/mediaGallery/context/gallery';
import type { MediaItem } from '@/features/mediaGallery/models/media';

import type { GalleryProps, GalleryThumbnailProps } from '../../gallery.types';

import GalleryDialog from '../GalleryDialog';
import HorizontalGallery from '../HorizontalGallery';
import VerticalGallery from '../VerticalGallery';

import { AutoplayControls, GalleryOverlayControls } from '../../Controls';

interface ExpandableGalleryProps {
	items: MediaItem[];
	activeIndex?: number;
	thumbnail?: GalleryThumbnailProps;
	style?: SxProps<Theme>;
}

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
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						minHeight: 250,
						...style,
					}}
				>
					<AutoplayTimeLeftProvider>
						<Box
							sx={{
								position: 'relative',
								height: '100%',
								flex: 1,
								minHeight: 0,
							}}
						>
							<GalleryOverlayControls slides={items}>
								<AutoplayControls />
							</GalleryOverlayControls>

							<HorizontalGallery
								{...galleryProps}
								style={{ cursor: 'grab', height: '100%' }}
								onClick={openDialog}
							/>
						</Box>
					</AutoplayTimeLeftProvider>
				</Box>

				<AutoplayTimeLeftProvider>
					<GalleryDialog
						skipCloseSelector={skipCloseSelector}
						open={isDialogOpen}
						onClose={closeDialog}
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
