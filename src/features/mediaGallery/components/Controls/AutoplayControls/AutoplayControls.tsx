import type { FC } from 'react';

import { AutoplayProgress, AutoplayToggle } from '@/features/mediaGallery/components/Controls';
import { useGalleryContext } from '@/features/mediaGallery/hooks';

interface AutoplayControlsProps {
	radius?: number;
}

const AutoplayControls: FC<AutoplayControlsProps> = ({ radius }) => {
	const { autoplay, toggleAutoplay } = useGalleryContext();

	return (
		<>
			<AutoplayToggle
				autoplay={autoplay}
				onToggle={toggleAutoplay}
			/>
			{autoplay && <AutoplayProgress radius={radius} />}
		</>
	);
};

export default AutoplayControls;
