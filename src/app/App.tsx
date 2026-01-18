import type { FC } from 'react';

import AppRouter from '@/app/router/AppRouter';
import { Box } from '@mui/material';

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
