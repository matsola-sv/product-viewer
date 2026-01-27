import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

import EmptyState from '@/shared/ui/components/EmptyState';

const NotFoundPage: FC = () => {
	const { t } = useTranslation();

	return (
		<Box sx={{ height: '100%' }}>
			<EmptyState message={t('app.pages.errors.notFound.message')} />
		</Box>
	);
};
export default NotFoundPage;
