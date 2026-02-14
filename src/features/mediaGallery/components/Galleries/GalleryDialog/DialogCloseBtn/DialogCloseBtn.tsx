import type { FC } from 'react';

import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface DialogCloseBtnProps {
	onClose: () => void;
}

const DialogCloseBtn: FC<DialogCloseBtnProps> = ({ onClose }) => (
	<IconButton onClick={onClose}>
		<Close />
	</IconButton>
);

export default DialogCloseBtn;
