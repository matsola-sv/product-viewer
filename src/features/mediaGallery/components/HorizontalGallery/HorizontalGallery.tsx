import { useState } from 'react';

import { Box } from '@mui/material';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { GalleryProps } from '../gallery.types';

import { useAutoplay } from '../../hooks/useAutoplay';
import { stopSlideVideo } from '../../utils/galleryVideo';
import GallerySlide from '../GallerySlide';
import GalleryThumbnail from '../GalleryThumbnail';
import { hoverNavStyles, noSelect, stateStyles } from '../gallery.styles';

const HorizontalGallery = (props: GalleryProps) => {
	const {
		items,
		autoplay = false,
		autoplayOptions,
		loop = false,
		thumbnail = { width: 96, height: 74 },
	} = props;

	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
	const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

	const { autoplayValue } = useAutoplay({
		swiper: swiperInstance,
		autoplay,
		autoplayOptions,
	});

	return (
		<Box
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				bgcolor: '#b9b5b5;',
				...noSelect,
			}}
		>
			<Box
				sx={{
					flex: 1,
					minHeight: 0,
					bgcolor: '#cecccc', // for transparent images
					...hoverNavStyles,
				}}
			>
				<Swiper
					onSwiper={setSwiperInstance}
					modules={[Navigation, Thumbs, Autoplay]}
					navigation
					thumbs={{ swiper: thumbsSwiper }}
					autoplay={autoplayValue}
					loop={loop}
					slidesPerView={1}
					style={{ height: '100%' }}
					onSlideChange={stopSlideVideo}
				>
					{items.map(item => (
						<SwiperSlide key={item.id}>
							<GallerySlide item={item} />
						</SwiperSlide>
					))}
				</Swiper>
			</Box>

			{/* Thumbnails */}
			<Box
				sx={{
					bgcolor: '#b9b5b5', // for transparent images
					...hoverNavStyles,
					...stateStyles,
				}}
			>
				<Swiper
					modules={[Navigation, Thumbs]}
					onSwiper={setThumbsSwiper}
					slidesPerView='auto'
					spaceBetween={8}
					navigation
					centerInsufficientSlides
				>
					{items.map(item => (
						<SwiperSlide
							key={item.id}
							style={{
								width: thumbnail.width,
								height: thumbnail.height,
							}}
						>
							<GalleryThumbnail item={item} />
						</SwiperSlide>
					))}
				</Swiper>
			</Box>
		</Box>
	);
};
export default HorizontalGallery;
