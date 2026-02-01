import type { FC } from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';

import type { MediaItem } from '@/features/mediaGallery/models/media';
import { isImage } from '@/features/mediaGallery/utils/image';

export interface GalleryThumbnailProps {
	item: MediaItem;
	style?: SxProps<Theme>;
}

const slideStyles: SxProps<Theme> = {
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	cursor: 'pointer',
	overflow: 'hidden',
	borderRadius: 1,
};

const GalleryThumbnail: FC<GalleryThumbnailProps> = ({ item, style }) => {
	return (
		<>
			<Box
				className='thumbnail'
				sx={{ ...slideStyles, ...style }}
			>
				<Box
					component='img'
					src={isImage(item) ? item.src : item.thumbnail}
					alt={isImage(item) ? item.alt : 'video thumbnail'}
					sx={{
						width: '100%',
						height: 80,
						objectFit: 'cover',
					}}
				/>
			</Box>
		</>
	);
};

export default GalleryThumbnail;
