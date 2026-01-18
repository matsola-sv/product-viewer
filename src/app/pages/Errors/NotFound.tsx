import type { FC } from 'react';

import EmptyState from '@/shared/ui/EmptyState';
import { Box } from '@mui/material';

const NotFoundPage: FC = () => {
	const message = 'Page you are looking for does not exists';
	return (
		<Box sx={{ height: '100%' }}>
			<EmptyState message={message} />
		</Box>
	);
};
export default NotFoundPage;
