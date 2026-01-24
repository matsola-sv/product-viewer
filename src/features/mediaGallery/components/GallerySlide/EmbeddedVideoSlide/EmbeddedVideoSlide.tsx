import type { FC } from 'react';

import { Box } from '@mui/material';

import type { VideoItem } from '@/features/mediaGallery/models/media.types';
import { addYouTubeApi } from '@/features/mediaGallery/utils/video';

export interface EmbeddedVideoSlideProps {
	item: VideoItem;
}

const EmbeddedVideoSlide: FC<EmbeddedVideoSlideProps> = ({ item }) => {
	const videoSrc = addYouTubeApi(item.src);

	return (
		<Box
			component='iframe'
			src={videoSrc}
			title='video'
			allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
			allowFullScreen
			sx={{
				position: 'absolute',
				inset: 0,
				width: '100%',
				height: '100%',
				//border: 0,
			}}
		/>
	);
};

export default EmbeddedVideoSlide;
