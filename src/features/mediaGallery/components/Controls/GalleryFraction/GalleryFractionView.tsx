import type { FC, ReactNode } from 'react';

import { ButtonBase, Typography } from '@mui/material';

import type { GalleryActionProps } from '../actions.types';

interface GalleryFractionViewProps extends GalleryActionProps {
	current: number;
	total: number;
	separator?: ReactNode;
}

const GalleryFractionView: FC<GalleryFractionViewProps> = props => {
	const {
		current,
		total,
		separator = '/',
		size = 36,
		color,
		bgColor,
		hoverColor,
		fontSize,
		fontWeight,
		styles,
	} = props;

	return (
		<ButtonBase
			disableRipple
			sx={{
				height: size,
				minWidth: size * 1.5, // More space for text
				px: 1.5,
				bgcolor: bgColor,
				borderRadius: 0,
				cursor: 'default',
				pointerEvents: 'none',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				transition: 'background-color 0.2s ease',
				'&:hover': { bgcolor: hoverColor },
				...styles,
			}}
		>
			<Typography
				sx={{
					color: color,
					fontSize: fontSize,
					fontWeight: fontWeight,
					lineHeight: 1,
					whiteSpace: 'nowrap',
				}}
			>
				{current} {separator} {total}
			</Typography>
		</ButtonBase>
	);
};

export default GalleryFractionView;
