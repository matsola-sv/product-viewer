import type { FC } from 'react';

import { Box } from '@mui/material';

import { AutoplayProgress, AutoplayToggle } from '@/features/mediaGallery/components/Controls';
import { useGalleryContext } from '@/features/mediaGallery/hooks';

interface AutoplayControlsProps {
	radius?: number;
	className?: string;
}

const AutoplayControls: FC<AutoplayControlsProps> = ({ radius, className }) => {
	const { autoplay, toggleAutoplay } = useGalleryContext();

	return (
		<Box
			className={className}
			sx={{
				display: 'inline-flex',
				alignItems: 'center',
				gap: 1,
				position: 'relative',
			}}
		>
			<AutoplayToggle
				autoplay={autoplay}
				onToggle={toggleAutoplay}
				className='active'
			/>

			{autoplay && (
				<AutoplayProgress
					radius={radius}
					className='active'
				/>
			)}
		</Box>
	);
};

export default AutoplayControls;
