import { Children, type FC, type ReactNode } from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';

import { AutoplayToggle } from '@/features/mediaGallery/components/Controls';
import { useGalleryContext } from '@/features/mediaGallery/hooks';

import type { GalleryActionProps } from '../actions.types';

import AutoplayProgress from '../AutoplayProgress';

interface GalleryActionsProps {
	actionClass?: string;
	left?: ReactNode;
	right?: ReactNode;
	height?: number;
	actionStyle?: GalleryActionProps;
	style?: SxProps<Theme>;
}

/**	Can need for styling or react on action elements */
const wrapActionElement = (child: ReactNode, className: string) => {
	if (!child) return null;

	return (
		<Box
			className={className}
			sx={{ display: 'inline-flex' }}
		>
			{child}
		</Box>
	);
};

const wrapActionChildren = (children: ReactNode, className: string) => {
	if (!children) return null;

	return Children.map(children, child => wrapActionElement(child, className));
};

const GalleryActions: FC<GalleryActionsProps> = props => {
	const { left, right, style, height = 50, actionClass = 'g-action' } = props;
	const { autoplay, toggleAutoplay } = useGalleryContext();

	return (
		<Box
			sx={{
				position: 'relative',
				width: '100%',
				height,
				bgcolor: '#eee',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				...style,
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2 }}>
				{wrapActionChildren(left, actionClass)}

				{wrapActionElement(
					<AutoplayToggle
						autoplay={autoplay}
						onToggle={toggleAutoplay}
						{...props.actionStyle}
					/>,
					actionClass,
				)}

				{autoplay &&
					wrapActionElement(
						<AutoplayProgress {...props.actionStyle} />,
						actionClass,
					)}
			</Box>

			{right && (
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2 }}>
					{wrapActionChildren(right, actionClass)}
				</Box>
			)}
		</Box>
	);
};

export default GalleryActions;
