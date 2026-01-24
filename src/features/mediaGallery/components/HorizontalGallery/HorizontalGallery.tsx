import { useState } from 'react';

import { Box } from '@mui/material';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, EffectFade, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { GalleryProps } from '../gallery.types';

import { AUTOPLAY_OPTIONS } from '../../constants/gallery';

import { useAutoplayControl } from '../../hooks/useAutoplayControl';
import { useAutoplayProgress } from '../../hooks/useAutoplayProgress';

import { stopSlideVideo } from '../../utils/galleryVideo';

import AutoplayProgress from '../AutoplayProgress';
import AutoplayToggle from '../AutoplayToggle';
import GallerySlide from '../GallerySlide';
import GalleryThumbnail from '../GalleryThumbnail';
import { hoverNavStyles, noSelect, stateStyles } from '../gallery.styles';

const HorizontalGallery = (props: GalleryProps) => {
	const {
		items,
		autoplay = false,
		loop = false,
		thumbnail = { width: 96, height: 74 },
		onAutoplayChange,
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
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				bgcolor: '#b9b5b5',
				gap: '10px',
				...noSelect,
			}}
		>
			<Box
				sx={{
					flex: 1,
					minHeight: 0,
					position: 'relative', // keeps autoplay button within bounds
					bgcolor: '#cecccc', // for transparent images
					...hoverNavStyles,
				}}
			>
				<Swiper
					onSwiper={setSwiperInstance}
					modules={[Navigation, Thumbs, Autoplay, EffectFade]}
					navigation
					thumbs={{ swiper: thumbsSwiper }}
					autoplay={AUTOPLAY_OPTIONS} // Cannot be changed dynamically (Swiper limitation)
					loop={loop}
					slidesPerView={1}
					effect='fade'
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

				<AutoplayToggle
					autoplay={autoplay}
					onToggle={() => onAutoplayChange?.(!autoplay)}
				/>
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
