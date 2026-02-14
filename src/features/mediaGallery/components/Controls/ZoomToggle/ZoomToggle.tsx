import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ZoomIn, ZoomOut } from '@mui/icons-material';
import { IconButton, type IconButtonProps, Tooltip } from '@mui/material';

import clsx from 'clsx';

import { galleryClasses } from '@/features/mediaGallery/constants/galleryClasses';
import { useGalleryContext } from '@/features/mediaGallery/hooks';

const ZoomToggle: FC<IconButtonProps> = props => {
	const { t } = useTranslation();
	const { zoomed, canZoom, toggleZoom } = useGalleryContext();

	const keyPrefix = 'productMedia.zoom.tooltip';
	const title = zoomed ? t(`${keyPrefix}.out`) : t(`${keyPrefix}.in`);

	return (
		<Tooltip title={title}>
			<IconButton
				{...props}
				className={clsx(props.className, zoomed && galleryClasses.active)}
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
