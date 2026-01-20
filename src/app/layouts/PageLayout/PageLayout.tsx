import { type FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import Header from '@/app/layouts/Header';

import useLayoutMetrics from '@/app/hooks/useLayoutMetrics';

/**
 * Responsive layout with a fixed (per breakpoint) header and full-height content area.
 */
const PageLayout: FC = () => {
	const metrics = useLayoutMetrics({
		header: true,
		footer: false,
	});
	const pageContentSx = {
		flexGrow: 1,
		bgcolor: '#f5f5f5',
		...metrics.bodySx,
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
			}}
		>
			<Header height={metrics.heights.header} />

			{/* Main page content */}
			<Box
				component='main'
				sx={pageContentSx}
			>
				<Outlet />
			</Box>
		</Box>
	);
};

export default PageLayout;
