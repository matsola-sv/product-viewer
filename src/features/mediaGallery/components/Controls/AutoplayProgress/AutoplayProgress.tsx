import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

import clsx from 'clsx';

import { galleryClasses } from '@/features/mediaGallery/constants/galleryClasses';
import { useAutoplayTimeLeft } from '@/features/mediaGallery/hooks';

interface AutoplayProgressProps {
	radius?: number; // Radius [1-50] of the progress circle
	className?: string;
}

const AutoplayProgress: FC<AutoplayProgressProps> = ({ radius = 44, className }) => {
	const { t } = useTranslation();
	const { seconds, progress } = useAutoplayTimeLeft();

	// Calculate circle circumference and stroke offset based on progress
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference * progress;

	const secondLabel = t('productMedia.autoPlay.progress.seconds');
	const displaySeconds = seconds > 0 && `${seconds}${secondLabel}`;

	return (
		<Box
			className={clsx(className, galleryClasses.autoprog)}
			sx={[
				{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					position: 'relative',
					overflow: 'visible',
					transition: 'background-color 0.2s ease',
				},
				{
					width: { xs: 50, sm: 55, md: 60 },
					height: { xs: 30, sm: 35, md: 40 },
				},
			]}
		>
			{/* Circle progress */}
			<Box
				component='svg'
				viewBox='0 0 100 100'
				sx={[
					{
						position: 'absolute',
						inset: 0,
						width: '100%',
						height: '100%',
						fill: 'none',
						transform: 'rotate(-90deg)',
						shapeRendering: 'geometricPrecision',
						'& circle': {
							strokeDashoffset,
							strokeDasharray: circumference,
						},
					},
					{
						stroke: '#130303',
						strokeWidth: { xs: 3.6, sm: 4.5, md: 5.2 },
					},
				]}
			>
				<circle
					cx={50}
					cy={50}
					r={radius}
				/>
			</Box>

			{/* Progress label */}
			<Box
				component='span'
				sx={[
					{
						position: 'relative',
						zIndex: 1,
						lineHeight: 1,
					},
				]}
			>
				{displaySeconds}
			</Box>
		</Box>
	);
};

export default AutoplayProgress;
