import { type FC, useState } from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';

import GalleryActions from '@/features/mediaGallery/components/Controls/GalleryActions';
import { GalleryProvider } from '@/features/mediaGallery/context/gallery';
import type { MediaItem } from '@/features/mediaGallery/models/media';

import type { GalleryActionProps } from '../../Controls/actions.types';
import type { GalleryThumbnailProps } from '../../gallery.types';

import GalleryDialog from '../GalleryDialog';
import HorizontalGallery from '../HorizontalGallery';
import VerticalGallery from '../VerticalGallery';

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
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const openDialog = (): void => {
		setIsDialogOpen(true);
	};

	const closeDialog = (): void => {
		setIsDialogOpen(false);
	};

	return (
		<GalleryProvider
			total={items.length}
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
				<GalleryActions
					actionClass={actionClass}
					actionStyle={galleryActionStyle}
				/>

				<Box sx={{ height: 500 }}>
					<HorizontalGallery
						items={items}
						thumbnail={thumbnail}
						style={{ cursor: 'grab' }}
						onClick={openDialog}
					/>
				</Box>
			</Box>

			<GalleryDialog
				skipCloseSelector={skipCloseSelector}
				actions={
					<GalleryActions
						actionClass={actionClass}
						actionStyle={galleryActionStyle}
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
				<VerticalGallery
					items={items}
					thumbnail={thumbnail}
				/>
			</GalleryDialog>
		</GalleryProvider>
	);
};

export default ExpandableGallery;
