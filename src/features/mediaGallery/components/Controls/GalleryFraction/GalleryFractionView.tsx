import type { FC, ReactNode } from 'react';

import { Typography } from '@mui/material';

interface GalleryFractionViewProps {
	current: number;
	total: number;
	separator?: ReactNode;
}

const GalleryFractionView: FC<GalleryFractionViewProps> = props => {
	const { current, total, separator = '/' } = props;

	return (
		<Typography
			sx={[
				{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					lineHeight: 1,
					whiteSpace: 'nowrap',
				},
			]}
		>
			{current} {separator} {total}
		</Typography>
	);
};

export default GalleryFractionView;
