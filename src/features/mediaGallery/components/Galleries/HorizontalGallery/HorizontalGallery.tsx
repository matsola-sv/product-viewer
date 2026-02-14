import { useState } from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';

import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { autoplayOptions } from '@/features/mediaGallery/constants/gallery';
import { useGallery, useGalleryContext, useSwiper } from '@/features/mediaGallery/hooks';

import type { GalleryProps } from '../../gallery.types';

import GallerySlide from '../../Slides/GallerySlide';
import GalleryThumbnail from '../../Slides/GalleryThumbnail';
import { hoverNavStyles, imageStyle, noSelect, stateStyles } from '../../gallery.styles';

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
		enableZoom = false,
		thumbnail = { width: 96, height: 74 },
		style,
		onClick,
		onSlideChange,
		onAutoplayTimeLeft,
	} = props;

	const { activeIndex, loop, autoplay, zoomed } = useGalleryContext();
	const gallery = useGallery({ enableZoom, onClick, onSlideChange, onAutoplayTimeLeft });
	const swiperAdapter = useSwiper({
		activeIndex,
		autoplay,
		loop,
		enableZoom,
		zoomed,
		onClick: gallery.handleClick,
		onSlideChange: gallery.handleSlideChange,
		onAutoplayTimeLeft: gallery.handleAutoplayProgress,
		onZoomChange: gallery.handleZoomChange,
	});

	// Thumbnails swiper
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

	return (
		<Box sx={{ ...galleryWrapperStyle, ...style }}>
			<Box
				sx={{
					flex: 1,
					minHeight: 0,
					position: 'relative',
					cursor: gallery.cursor,
					...imageStyle,
					...hoverNavStyles,
				}}
			>
				<Swiper
					initialSlide={activeIndex}
					modules={swiperAdapter.swiperModules}
					thumbs={{ swiper: thumbsSwiper }}
					autoplay={autoplayOptions} // Cannot be changed dynamically (Swiper limitation)
					navigation
					loop={loop}
					slidesPerView={1}
					effect={swiperAdapter.swiperEffect}
					zoom={swiperAdapter.zoomConfig}
					onSwiper={swiperAdapter.setSwiperInstance}
					onClick={swiperAdapter.clickHandler}
					onSlideChange={swiperAdapter.slideChangeHandler}
					onAutoplayTimeLeft={swiperAdapter.autoplayTimeLeftHandler}
					style={{ height: '100%' }}
				>
					{items.map(item => (
						<SwiperSlide key={item.id}>
							<GallerySlide
								item={item}
								enableZoom={enableZoom}
							/>
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
