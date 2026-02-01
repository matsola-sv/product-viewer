import { type RefObject, forwardRef } from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';

interface AutoplayProgressProps {
	progressRef: RefObject<HTMLElement | null>;
	progressLabelRef: RefObject<HTMLElement | null>;
	size?: number;
	bgColor?: string;
	hoverColor?: string;
	circleColor?: string;
	textColor?: string;
	styles?: SxProps<Theme>;
}

const AutoplayProgress = forwardRef<HTMLDivElement, AutoplayProgressProps>((props, ref) => {
	const {
		progressRef,
		progressLabelRef,
		size = 36,
		bgColor = 'rgba(33,43,54,0.9)',
		hoverColor = '#3d1a9e',
		circleColor = '#fff',
		textColor = '#fff',
		styles,
	} = props;

	const strokeWidth = 2;
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
				fontWeight: 'bold',
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
					stroke: circleColor,
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
					fontSize: size * 0.4, // 40% of the button size
					color: textColor,
					lineHeight: 1,
				}}
			/>
		</Box>
	);
});

export default AutoplayProgress;
