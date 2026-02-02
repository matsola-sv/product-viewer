import type { FC } from 'react';

interface CirclePlayPauseIconProps {
	size?: number;
	strokeColor?: string;
	strokeWidth?: number;
	bgColor?: string;
	hoverColor?: string;
	paused?: boolean;
}

const CirclePlayPauseIcon: FC<CirclePlayPauseIconProps> = props => {
	const {
		size = 36,
		strokeColor = '#000',
		strokeWidth = 2,
		bgColor = 'transparent',
		paused = false,
	} = props;

	const center = size / 2;
	const iconSize = size * 0.5;
	const halfIcon = iconSize / 2;

	return (
		<svg
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			fill='none'
		>
			{/* Circle background */}
			<circle
				cx={center}
				cy={center}
				r={center - strokeWidth - 1}
				fill={bgColor}
				stroke={strokeColor}
				strokeWidth={strokeWidth}
			/>

			{paused ? (
				<>
					<line
						x1={center - iconSize / 4}
						y1={center - iconSize / 2}
						x2={center - iconSize / 4}
						y2={center + iconSize / 2}
						stroke={strokeColor}
						strokeWidth={strokeWidth}
						strokeLinecap='round'
					/>
					<line
						x1={center + iconSize / 4}
						y1={center - iconSize / 2}
						x2={center + iconSize / 4}
						y2={center + iconSize / 2}
						stroke={strokeColor}
						strokeWidth={strokeWidth}
						strokeLinecap='round'
					/>
				</>
			) : (
				<polygon
					points={`
						${center - halfIcon / 2},${center - halfIcon} 
						${center - halfIcon / 2},${center + halfIcon} 
						${center + halfIcon},${center}
					`}
					fill={strokeColor}
				/>
			)}
		</svg>
	);
};

export default CirclePlayPauseIcon;
