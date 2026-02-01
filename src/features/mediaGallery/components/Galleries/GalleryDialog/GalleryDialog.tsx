import type { ReactNode } from 'react';

import { Close } from '@mui/icons-material';
import { Box, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';

import { isInteractiveClick } from '@/shared/dom/interactive';

export interface GalleryDialogProps {
	open: boolean;
	caption?: ReactNode;
	actions?: ReactNode;
	children: ReactNode;
	onClose: () => void;

	// Custom CSS selector for elements that should not close the dialog
	// (e.g. '.btn-prev, .btn-next', '.gallery:not(.disabled)')
	skipCloseSelector?: string;
}

const captionStyle = {
	borderTop: '1px solid rgba(255,255,255,0.12)',
	padding: 2,
};

const actionsStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	paddingRight: 1,
	paddingLeft: 2,
};

const GalleryDialog = (props: GalleryDialogProps) => {
	const { open, caption, actions, children, onClose, skipCloseSelector } = props;

	/** Close when click is not on an interactive element */
	const handleEmptyClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (isInteractiveClick(event, skipCloseSelector)) {
			return;
		}
		onClose();
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullScreen
		>
			<DialogTitle
				sx={actionsStyle}
				onClick={handleEmptyClick}
			>
				<Box>{actions}</Box>
				<IconButton onClick={onClose}>
					<Close />
				</IconButton>
			</DialogTitle>

			<DialogContent
				onClick={handleEmptyClick}
				sx={{
					flex: 1,
					padding: 0,
				}}
			>
				{children}
			</DialogContent>

			{caption && (
				<DialogTitle
					sx={captionStyle}
					onClick={handleEmptyClick}
				>
					{caption}
				</DialogTitle>
			)}
		</Dialog>
	);
};

export default GalleryDialog;
