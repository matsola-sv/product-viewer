import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Tooltip } from '@mui/material';

import type { GalleryActionProps } from '../actions.types';

import { CirclePlayPauseIcon } from '@/shared/ui/components/Icons';

export interface AutoplayToggleProps extends GalleryActionProps {
	autoplay: boolean;
	onToggle: () => void;
}

const AutoplayToggle: FC<AutoplayToggleProps> = props => {
	const {
		autoplay,
		onToggle,
		styles,
		size = 36,
		bgColor,
		hoverColor,
		strokeColor,
		strokeWidth = 2,
	} = props;

	const { t } = useTranslation();
	const keyPrefix = 'productMedia.autoPlayToggle.tooltip';
	const getTitle = () => (autoplay ? t(`${keyPrefix}.off`) : t(`${keyPrefix}.on`));

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
				<CirclePlayPauseIcon
					size={size}
					strokeColor={strokeColor}
					strokeWidth={strokeWidth}
					paused={autoplay}
				/>
			</Box>
		</Tooltip>
	);
};

export default AutoplayToggle;
