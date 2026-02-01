import { type FC, useState } from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';

import GalleryActions from '@/features/mediaGallery/components/Controls/GalleryActions';
import { GalleryProvider } from '@/features/mediaGallery/context/gallery';
import type { MediaItem } from '@/features/mediaGallery/models/media';

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

const ExpandableGallery: FC<ExpandableGalleryProps> = props => {
	const actionClass = 'g-action';
	const skipCloseSelector = `.swiper-button-prev, .swiper-button-next, .${actionClass}`;
	const { items, thumbnail, style, activeIndex = 0 } = props;

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const openDialog = (): void => {
		setIsDialogOpen(true);
	};

	const closeDialog = (): void => {
		setIsDialogOpen(false);
	};

	return (
		<GalleryProvider
			autoplay={false}
			activeIndex={activeIndex}
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
				<GalleryActions actionClass={actionClass} />

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
				actions={<GalleryActions actionClass={actionClass} />}
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
