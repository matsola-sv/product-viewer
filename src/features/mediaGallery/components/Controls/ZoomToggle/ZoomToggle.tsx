import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ZoomIn, ZoomOut } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import { useGalleryContext } from '@/features/mediaGallery/hooks';

export interface ZoomToggleProps {
	className?: string;
}

const ZoomToggle: FC<ZoomToggleProps> = ({ className }) => {
	const { t } = useTranslation();
	const { zoomed, canZoom, toggleZoom } = useGalleryContext();

	const keyPrefix = 'productMedia.zoom.tooltip';
	const title = zoomed ? t(`${keyPrefix}.out`) : t(`${keyPrefix}.in`);

	return (
		<Tooltip title={title}>
			<IconButton
				className={className}
				disabled={!canZoom}
				aria-label={title}
				onClick={toggleZoom}
			>
				{zoomed ? <ZoomOut /> : <ZoomIn />}
			</IconButton>
		</Tooltip>
	);
};

export default ZoomToggle;
