import { useState } from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';

import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, EffectFade, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useGallery, useGalleryContext, useSwiper } from '@/features/mediaGallery/hooks';

import type { GalleryProps } from '../../gallery.types';

import { AUTOPLAY_OPTIONS } from '../../../constants/gallery';

import GallerySlide from '../../Slides/GallerySlide';
import GalleryThumbnail from '../../Slides/GalleryThumbnail';
import { hoverNavStyles, noSelect, stateStyles } from '../../gallery.styles';

const galleryWrapperStyle: SxProps<Theme> = {
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	gap: '10px',
	...noSelect,
};

const HorizontalGallery = (props: GalleryProps) => {
	const {
		items,
		thumbnail = { width: 96, height: 74 },
		style,
		onClick,
		onSlideChange,
		onAutoplayTimeLeft,
	} = props;

	const { activeIndex, loop, autoplay } = useGalleryContext();
	const gallery = useGallery({ onClick, onSlideChange, onAutoplayTimeLeft });
	const swiperAdapter = useSwiper({
		activeIndex,
		autoplay,
		loop,
		onSlideChange: gallery.handleSlideChange,
		onClick: gallery.handleClick,
		onAutoplayTimeLeft: gallery.handleAutoplayProgress,
	});

	// Thumbnails swiper
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

	return (
		<Box sx={{ ...galleryWrapperStyle, ...style }}>
			<Box sx={{ flex: 1, minHeight: 0, position: 'relative', ...hoverNavStyles }}>
				<Swiper
					initialSlide={activeIndex}
					onSwiper={swiperAdapter.setSwiperInstance}
					modules={[Navigation, Thumbs, Autoplay, EffectFade]}
					navigation
					thumbs={{ swiper: thumbsSwiper }}
					autoplay={AUTOPLAY_OPTIONS}
					loop={loop}
					slidesPerView={1}
					effect='fade'
					onClick={swiperAdapter.clickHandler}
					onSlideChange={swiperAdapter.slideChangeHandler}
					onAutoplayTimeLeft={swiperAdapter.autoplayTimeLeftHandler}
					style={{ height: '100%' }}
				>
					{items.map(item => (
						<SwiperSlide key={item.id}>
							<GallerySlide item={item} />
						</SwiperSlide>
					))}
				</Swiper>
			</Box>

			{/* Thumbnails */}
			<Box sx={{ ...stateStyles, ...hoverNavStyles, bgcolor: '#b9b5b5' }}>
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
							style={{ width: thumbnail.width, height: thumbnail.height }}
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
