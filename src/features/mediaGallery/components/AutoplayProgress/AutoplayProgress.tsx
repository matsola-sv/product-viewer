import { type RefObject, forwardRef } from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';

interface AutoplayProgressProps {
	progressRef: RefObject<HTMLElement | null>;
	progressLabelRef: RefObject<HTMLElement | null>;
	styles?: SxProps<Theme>;
	size?: number;
}

const AutoplayProgress = forwardRef<HTMLDivElement, AutoplayProgressProps>(
	({ progressRef, progressLabelRef, size = 70, styles }, ref) => {
		const radius = size / 2 - 4; // 4 = strokeWidth
		const circumference = 2 * Math.PI * radius;

		// --autoplay-progress is updated by useAutoplayProgress
		const strokeDashoffset = `calc(${circumference}px * (1 - var(--autoplay-progress)))`;

		return (
			<Box
				ref={ref}
				sx={{
					position: 'absolute',
					right: 16,
					bottom: 16,
					zIndex: 10,
					width: size,
					height: size,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontWeight: 'bold',
					color: 'var(--swiper-theme-color)', // Content color
					...styles,
				}}
			>
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
						stroke: 'rgba(0, 0, 0, 0.9)', // Black circle
						strokeWidth: 4,
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

				<Box
					component='span'
					ref={progressLabelRef}
					sx={{
						position: 'relative',
						zIndex: 1,
						fontSize: size / 3, // Proportional text size
					}}
				/>
			</Box>
		);
	},
);

export default AutoplayProgress;
