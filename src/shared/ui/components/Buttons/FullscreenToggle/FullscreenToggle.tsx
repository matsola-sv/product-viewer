import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { IconButton, Tooltip } from '@mui/material';

import type { FullscreenToggleProps } from './fullscreen.types';

import { useFullscreen } from '@/shared/ui/hooks/fullscreen';

const FullscreenToggle: FC<FullscreenToggleProps> = props => {
	const { t } = useTranslation();
	const { isFullscreen, toggleFullscreen, isFullscreenSupported } = useFullscreen();

	const {
		sx,
		disabled,
		hideIfUnsupported = false,
		labels = {
			enter: t('shared.ui.fullscreenToggle.labels.enter'),
			exit: t('shared.ui.fullscreenToggle.labels.exit'),
		},
		...rest
	} = props;

	if (hideIfUnsupported && !isFullscreenSupported) {
		return null;
	}

	const label = isFullscreen ? labels.exit : labels.enter;
	const isDisabled = !isFullscreenSupported || disabled;

	return (
		<Tooltip title={label}>
			<IconButton
				aria-label={label}
				onClick={toggleFullscreen}
				{...rest}
				disabled={isDisabled} // Supported priority over disabled
			>
				{isFullscreen ? <FullscreenExitIcon sx={sx} /> : <FullscreenIcon sx={sx} />}
			</IconButton>
		</Tooltip>
	);
};

export default FullscreenToggle;
