import type { FC } from 'react';

import { Stack, type StackProps } from '@mui/material';

const ControlsGroup: FC<StackProps> = ({ children, ...rest }) => (
	<Stack
		direction='row'
		spacing={1}
		alignItems='center'
		{...rest}
	>
		{children}
	</Stack>
);

export default ControlsGroup;
