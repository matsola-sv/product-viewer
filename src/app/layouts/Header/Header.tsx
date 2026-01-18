import type { FC } from 'react';

import Logo from '@/app/components/Logo';
import { AppBar, Toolbar } from '@mui/material';

import type { ResponsiveValues } from '@/shared/ui/types';

export interface HeaderProps {
	height?: ResponsiveValues<number | string>;
}

const Header: FC<HeaderProps> = ({ height }) => {
	return (
		<AppBar
			position='fixed'
			color='primary'
			sx={{ height: height }}
		>
			<Toolbar
				sx={{
					height: '100%',
					justifyContent: 'space-between',
					px: 2,
				}}
			>
				{/* Left part */}
				<Logo />
			</Toolbar>
		</AppBar>
	);
};

export default Header;
