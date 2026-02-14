import { useState } from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';

import type { Swiper as SwiperType } from 'swiper';
import { Mousewheel, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { autoplayOptions } from '@/features/mediaGallery/constants/gallery';
import { useGallery, useGalleryContext, useSwiper } from '@/features/mediaGallery/hooks';

import type { GalleryProps } from '../../gallery.types';

import GallerySlide from '../../Slides/GallerySlide';
import GalleryThumbnail from '../../Slides/GalleryThumbnail';
import { hoverNavStyles, imageStyle, noSelect, stateStyles } from '../../gallery.styles';

/** Center thumbnails vertically when slidesPerView="auto" */
const verticalThumbsLayout = {
	'& .swiper-wrapper': {
		justifyContent: 'center',
	},
};

const galleryWrapperStyle: SxProps<Theme> = {
	width: '100%',
	height: '100%',
	display: 'flex',
	overflow: 'hidden',
	gap: '10px',
	...noSelect,
};

const VerticalGallery = (props: GalleryProps) => {
	const {
		items,
		enableZoom = false,
		style,
		thumbnail = { width: 96, height: 64 },
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
					effect={swiperAdapter.swiperEffect}
					zoom={swiperAdapter.zoomConfig}
					onSwiper={swiperAdapter.setSwiperInstance} // Pass Swiper instance (needed for vertical thumbs timing)
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
		</Box>
	);
};

export default VerticalGallery;
