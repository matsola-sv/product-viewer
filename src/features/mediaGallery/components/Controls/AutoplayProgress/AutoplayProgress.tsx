import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

import { useAutoplayTimeLeft } from '@/features/mediaGallery/hooks';

import type { GalleryActionProps } from '../actions.types';

const AutoplayProgress: FC<GalleryActionProps> = props => {
	const {
		size = 36,
		fontSize,
		color,
		bgColor,
		hoverColor,
		strokeColor,
		strokeWidth = 2,
		fontWeight,
		styles,
	} = props;

	const { t } = useTranslation();
	const { seconds, progress } = useAutoplayTimeLeft();

	const radius = size / 2 - strokeWidth - 1;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference * progress;

	const secondLabel = t('productMedia.autoPlay.progress.seconds');
	const displaySeconds = seconds > 0 && `${seconds}${secondLabel}`;

	return (
		<Box
			sx={{
				width: size,
				height: size,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: bgColor,
				borderRadius: 0,
				overflow: 'visible',
				fontWeight: fontWeight,
				transition: 'background-color 0.2s ease',
				'&:hover': { bgcolor: hoverColor },
				position: 'relative',
				...styles,
			}}
		>
			{/* Circle progress */}
			<Box
				component='svg'
				viewBox={`0 0 ${size} ${size}`}
				sx={{
					position: 'absolute',
					inset: 0,
					width: '100%',
					height: '100%',
					fill: 'none',
					stroke: strokeColor,
					strokeWidth: strokeWidth,
					transform: 'rotate(-90deg)',
					shapeRendering: 'geometricPrecision',
					'& circle': {
						strokeDasharray: circumference,
						strokeDashoffset: strokeDashoffset,
					},
				}}
			>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
				/>
			</Box>

			{/* Progress label */}
			<Box
				component='span'
				sx={{
					position: 'relative',
					zIndex: 1,
					fontSize: fontSize,
					color: color,
					lineHeight: 1,
				}}
			>
				{displaySeconds}
			</Box>
		</Box>
	);
};

export default AutoplayProgress;
