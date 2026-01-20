import type { FC } from 'react';

import { Box } from '@mui/material';

import Oak4DProductPage from '@/features/oak4dProduct/components/Oak4dProductPage';

/**
 * Avoid using plain <div> around MUI components — it may break layout or styling. Use <Box height='100%'> or <> instead
 */
const HomePage: FC = () => {
	return (
		<Box height='100%'>
			<Oak4DProductPage />
		</Box>
	);
};
export default HomePage;
