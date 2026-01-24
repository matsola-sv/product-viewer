import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Pause, Slideshow } from '@mui/icons-material';
import { IconButton, type SxProps, type Theme, Tooltip } from '@mui/material';

export interface AutoplayToggleProps {
	autoplay: boolean;
	styles?: SxProps<Theme>;
	onToggle: () => void;
}

const iconStyles = { fontSize: { xs: 24, sm: 28, md: 32, lg: 36 } };

const AutoplayToggle: FC<AutoplayToggleProps> = ({ autoplay, onToggle, styles }) => {
	const { t } = useTranslation();

	const AutoIcon = autoplay ? Pause : Slideshow;

	const getTitle = () => {
		if (autoplay) {
			return t('productMedia.autoPlayToggle.tooltip.off');
		}
		return t('productMedia.autoPlayToggle.tooltip.on');
	};

	return (
		<Tooltip title={getTitle()}>
			<IconButton
				size='large'
				onClick={onToggle}
				sx={{
					position: 'absolute',
					top: 16,
					right: 16,
					zIndex: 10,
					color: 'var(--swiper-theme-color)', // Swiper theme
					bgcolor: 'rgba(0, 0, 0, 0.9)',
					'&:hover': { bgcolor: 'action.hover' },
					...styles,
				}}
			>
				<AutoIcon sx={iconStyles} />
			</IconButton>
		</Tooltip>
	);
};
export default AutoplayToggle;
