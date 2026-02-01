import type { FC } from 'react';

import { Box, type SxProps, type Theme, Tooltip } from '@mui/material';

export interface AutoplayToggleProps {
	autoplay: boolean;
	size?: number;
	bgColor?: string;
	hoverColor?: string;
	iconColor?: string;
	circleStrokeWidth?: number;
	styles?: SxProps<Theme>;
	onToggle: () => void;
}

const AutoplayToggle: FC<AutoplayToggleProps> = props => {
	const {
		autoplay,
		onToggle,
		styles,
		size = 36,
		bgColor = 'rgba(33,43,54,0.9)',
		hoverColor = '#3d1a9e',
		iconColor = '#fff',
		circleStrokeWidth = 2,
	} = props;

	const getTitle = () => (autoplay ? 'Stop autoplay' : 'Start autoplay');

	return (
		<Tooltip title={getTitle()}>
			<Box
				onClick={onToggle}
				sx={{
					width: size,
					height: size,
					display: 'inline-flex',
					alignItems: 'center',
					justifyContent: 'center',
					bgcolor: bgColor,
					borderRadius: 0,
					cursor: 'pointer',
					transition: 'background-color 0.2s ease',
					'&:hover': { bgcolor: hoverColor },
					...styles,
				}}
			>
				<svg
					viewBox='0 0 36 36'
					width='100%'
					height='100%'
					fill='none'
				>
					<circle
						cx='18'
						cy='18'
						r='11'
						stroke={iconColor}
						strokeWidth={circleStrokeWidth}
					/>
					{autoplay ? (
						<>
							<line
								x1='14'
								y1='11'
								x2='14'
								y2='25'
								stroke={iconColor}
								strokeWidth='2'
								strokeLinecap='round'
							/>
							<line
								x1='22'
								y1='11'
								x2='22'
								y2='25'
								stroke={iconColor}
								strokeWidth='2'
								strokeLinecap='round'
							/>
						</>
					) : (
						<polygon
							points='15,12 15,24 25,18'
							fill={iconColor}
						/>
					)}
				</svg>
			</Box>
		</Tooltip>
	);
};

export default AutoplayToggle;
