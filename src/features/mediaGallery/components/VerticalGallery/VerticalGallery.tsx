import { useState } from 'react';

import { Box } from '@mui/material';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Mousewheel, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useAutoplayControl } from '../../hooks/useAutoplayControl';
import { useAutoplayProgress } from '../../hooks/useAutoplayProgress';
import { stopSlideVideo } from '../../utils/galleryVideo';
import AutoplayProgress from '../AutoplayProgress';
import type { GalleryProps } from '../gallery.types';

import { AUTOPLAY_OPTIONS } from '../../constants/gallery';
import GallerySlide from '../GallerySlide';
import GalleryThumbnail from '../GalleryThumbnail';
import { hoverNavStyles, noSelect, stateStyles } from '../gallery.styles';

/** Center thumbnails vertically when slidesPerView="auto" */
const verticalThumbsLayout = {
	'& .swiper-wrapper': {
		justifyContent: 'center',
	},
};

const VerticalGallery = (props: GalleryProps) => {
	const {
		items,
		autoplay = false,
		loop = false,
		thumbnail = { width: 96, height: 64 },
	} = props;

	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
	const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
	const { progressCircle, progressContent, onAutoplayTimeLeft } = useAutoplayProgress();

	// Allow autoplay to be toggled dynamically
	useAutoplayControl({
		swiper: swiperInstance,
		autoplay,
	});

	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				display: 'flex',
				overflow: 'hidden',
				gap: '10px',
				...noSelect,
			}}
		>
			{/* Thumbnails */}
			<Box
				sx={{
					width: thumbnail.width,
					height: '100%',
					flexShrink: 0,
					display: 'flex',
					alignItems: 'center',
					overflow: 'hidden',
					bgcolor: '#b9b5b5', // for transparent images
					...stateStyles,
					...verticalThumbsLayout,
				}}
			>
				{/* NOTE: Swiper needs explicit height for nav buttons to appear */}
				<Swiper
					direction='vertical'
					slidesPerView='auto'
					spaceBetween={8}
					loop={loop}
					onSwiper={setThumbsSwiper}
					modules={[Navigation, Mousewheel]}
					mousewheel
					navigation
					watchSlidesProgress
					style={{
						width: '100%',
						height: '100%',
						padding: '24px 0',
					}}
				>
					{items.map(item => (
						<SwiperSlide
							key={item.id}
							style={{ height: thumbnail.height }}
						>
							<GalleryThumbnail item={item} />
						</SwiperSlide>
					))}
				</Swiper>
			</Box>

			<Box
				sx={{
					overflow: 'hidden',
					bgcolor: '#cecccc', // for transparent images
					...hoverNavStyles,
				}}
			>
				<Swiper
					modules={[Thumbs, Autoplay, Navigation]}
					thumbs={{ swiper: thumbsSwiper }}
					autoplay={AUTOPLAY_OPTIONS} // Cannot be changed dynamically (Swiper limitation)
					navigation
					onSwiper={setSwiperInstance}
					onSlideChange={stopSlideVideo}
					onAutoplayTimeLeft={onAutoplayTimeLeft}
					style={{ height: '100%' }}
				>
					{items.map(item => (
						<SwiperSlide key={item.id}>
							<GallerySlide item={item} />
						</SwiperSlide>
					))}

					{autoplay && (
						<AutoplayProgress
							progressRef={progressCircle}
							progressLabelRef={progressContent}
						/>
					)}
				</Swiper>
			</Box>
		</Box>
	);
};

export default VerticalGallery;
