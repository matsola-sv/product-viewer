import { Children, type FC, type ReactNode, useEffect } from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';

import { AutoplayProgress, AutoplayToggle } from '@/features/mediaGallery/components/Controls';
import { useAutoplayProgress, useGalleryContext } from '@/features/mediaGallery/hooks';

interface GalleryActionsProps {
	actionClass?: string;
	left?: ReactNode;
	right?: ReactNode;
	height?: number;
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

	const { autoplay, toggleAutoplay, autoplayProgress } = useGalleryContext();
	const { progressCircle, progressContent, updateProgress } = useAutoplayProgress();

	/** Sync context state and UI progress */
	useEffect(() => {
		if (!autoplay || !autoplayProgress) {
			return;
		}
		updateProgress(autoplayProgress.time, autoplayProgress.progress);
	}, [autoplay, autoplayProgress, updateProgress]);

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
					/>,
					actionClass,
				)}

				{autoplay &&
					wrapActionElement(
						<AutoplayProgress
							progressRef={progressCircle}
							progressLabelRef={progressContent}
						/>,
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
