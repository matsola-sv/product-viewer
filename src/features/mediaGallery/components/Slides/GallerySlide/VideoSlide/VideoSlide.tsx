import type { FC } from 'react';

import { Box } from '@mui/material';

import type { VideoItem } from '@/features/mediaGallery/models/media';

export interface VideoSlideProps {
	item: VideoItem;
}

const VideoSlide: FC<VideoSlideProps> = ({ item }) => (
	<Box
		component='video'
		controls
		poster={item.poster}
		sx={{
			position: 'absolute',
			inset: 0,
			width: '100%',
			height: '100%',
			objectFit: 'cover',
		}}
	>
		<source src={item.src} />
	</Box>
);

export default VideoSlide;
