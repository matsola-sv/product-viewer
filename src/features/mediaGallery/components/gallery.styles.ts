export const noSelect = {
	userSelect: 'none',
	outline: 'none',
	'&:focus': { outline: 'none' },
};

export const stateStyles = {
	'& .swiper-slide .thumbnail': {
		opacity: 0.3,
		transform: 'scale(0.98)',
		transition: 'opacity 0.2s ease, transform 0.2s ease',
		border: 'none',
	},

	'& .swiper-slide-thumb-active .thumbnail': {
		opacity: 1,
		transform: 'scale(1)',
		border: '1px solid',
		borderColor: 'rgba(0, 0, 0, 0.12)',
	},
};

export const hoverNavStyles = {
	'& .swiper-button-next, & .swiper-button-prev': {
		opacity: 0,
		transition: 'opacity 0.2s ease',
	},
	'&:hover .swiper-button-next, &:hover .swiper-button-prev': {
		opacity: 1,
	},
};

/** Prevent image cropping */
export const imageStyle = {
	'& img': {
		maxWidth: '100%',
		maxHeight: '100vh',
		objectFit: 'contain',
	},
};
