import { type RefObject, forwardRef } from 'react';

import { Box } from '@mui/material';

import type { GalleryActionProps } from '../actions.types';

interface AutoplayProgressProps extends GalleryActionProps {
	progressRef: RefObject<HTMLElement | null>;
	progressLabelRef: RefObject<HTMLElement | null>;
}

const AutoplayProgress = forwardRef<HTMLDivElement, AutoplayProgressProps>((props, ref) => {
	const {
		progressRef,
		progressLabelRef,
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

	const radius = size / 2 - strokeWidth - 1;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = `calc(${circumference}px * (1 - var(--autoplay-progress)))`;

	return (
		<Box
			ref={ref}
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
				ref={progressRef}
				sx={{
					position: 'absolute',
					inset: 0,
					width: '100%',
					height: '100%',
					fill: 'none',
					stroke: strokeColor,
					strokeWidth: strokeWidth,
					transform: 'rotate(-90deg)',
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
				ref={progressLabelRef}
				sx={{
					position: 'relative',
					zIndex: 1,
					fontSize: fontSize,
					color: color,
					lineHeight: 1,
				}}
			/>
		</Box>
	);
});

export default AutoplayProgress;
