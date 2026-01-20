import type { FC } from 'react';

import { Box } from '@mui/material';

import AppRouter from '@/app/router/AppRouter';

const App: FC = () => {
	return (
		<Box
			className='App'
			sx={{ textAlign: 'center' }}
		>
			<AppRouter />
		</Box>
	);
};
export default App;
