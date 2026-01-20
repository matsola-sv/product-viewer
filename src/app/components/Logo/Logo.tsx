import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Box } from '@mui/material';

import * as ROUTES from '@/app/router/routes';

import { getPublicImage } from '@/shared/utils/url';

const Logo: FC = () => {
	const { t } = useTranslation();

	return (
		<Box
			component={Link}
			to={ROUTES.HOME}
			sx={{
				display: 'flex',
				alignItems: 'center',
				textDecoration: 'none',
				color: 'inherit',
			}}
		>
			<Box
				component='img'
				src={getPublicImage('logo-white.svg')}
				alt={t('app.components.logo.alt')}
				sx={{
					height: 32,
					width: 'auto',
					mr: 1,
				}}
			/>
		</Box>
	);
};

export default Logo;
