import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { IconButton, Tooltip } from '@mui/material';

export interface AutoplayToggleProps {
	autoplay: boolean;
	className?: string;
	onToggle: () => void;
}

const AutoplayToggle: FC<AutoplayToggleProps> = ({ autoplay, className, onToggle }) => {
	const { t } = useTranslation();

	const keyPrefix = 'productMedia.autoPlay.toggle.tooltip';
	const title = autoplay ? t(`${keyPrefix}.off`) : t(`${keyPrefix}.on`);

	return (
		<Tooltip title={title}>
			<IconButton
				className={className}
				onClick={onToggle}
			>
				{autoplay ? <PauseIcon /> : <PlayArrowIcon />}
			</IconButton>
		</Tooltip>
	);
};

export default AutoplayToggle;
