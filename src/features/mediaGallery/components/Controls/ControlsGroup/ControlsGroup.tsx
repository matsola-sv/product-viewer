import type { FC } from 'react';

import { Stack, type StackProps } from '@mui/material';

import clsx from 'clsx';

import { galleryClasses } from '@/features/mediaGallery/constants/galleryClasses';

const ControlsGroup: FC<StackProps> = ({ children, className, ...rest }) => (
	<Stack
		direction='row'
		spacing={1}
		alignItems='center'
		className={clsx(galleryClasses.ctrlGroup, className)}
		{...rest}
	>
		{children}
	</Stack>
);

export default ControlsGroup;
