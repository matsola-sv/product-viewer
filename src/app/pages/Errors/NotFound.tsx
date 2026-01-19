import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import EmptyState from '@/shared/ui/EmptyState';
import { Box } from '@mui/material';

const NotFoundPage: FC = () => {
	const { t } = useTranslation();

	return (
		<Box sx={{ height: '100%' }}>
			<EmptyState message={t('app.pages.errors.notFound.message')} />
		</Box>
	);
};
export default NotFoundPage;
