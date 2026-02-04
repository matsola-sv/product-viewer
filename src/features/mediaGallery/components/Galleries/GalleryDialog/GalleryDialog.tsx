import type { ReactNode } from 'react';

import { Close } from '@mui/icons-material';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	type SxProps,
	type Theme,
} from '@mui/material';

import { isInteractiveClick } from '@/shared/dom/interactive';

export interface GalleryDialogProps {
	open: boolean;
	children: ReactNode;
	caption?: ReactNode;
	actions?: ReactNode;
	actionsSx?: SxProps<Theme>;
	contentSx?: SxProps<Theme>;
	captionSx?: SxProps<Theme>;
	onClose: () => void;

	// Custom CSS selector for elements that should not close the dialog
	// (e.g. '.btn-prev, .btn-next', '.gallery:not(.disabled)')
	skipCloseSelector?: string;
}

const captionStyle: SxProps<Theme> = {
	borderTop: '1px solid rgba(255,255,255,0.12)',
	padding: 2,
};

const contentSx: SxProps<Theme> = {
	padding: 0,
	display: 'flex',
	justifyContent: 'center',

	/** Fix horizontal gallery thumbnails in dialog
	 * - flexDirection: 'column' + height: '100%' ensures correct layout
	 * - alignItems: 'center' is intentionally omitted, it breaks the layout
	 */
	flexDirection: 'column',
	height: '100%',

	/**  Center and scale images in the dialog without cropping */
	'& img': {
		maxWidth: '100%',
		maxHeight: '100vh',
		objectFit: 'contain',
	},
};

const actionsStyle: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	paddingRight: 1,
	paddingLeft: 2,
};

const GalleryDialog = (props: GalleryDialogProps) => {
	const { open, caption, actions, children, skipCloseSelector, onClose } = props;

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
				sx={{ ...actionsStyle, ...props.actionsSx }}
				onClick={handleEmptyClick}
			>
				{actions}
				<IconButton onClick={onClose}>
					<Close />
				</IconButton>
			</DialogTitle>

			<DialogContent
				onClick={handleEmptyClick}
				sx={{ ...contentSx, ...props.contentSx }}
			>
				{children}
			</DialogContent>

			{caption && (
				<DialogTitle
					sx={{ ...captionStyle, ...props.captionSx }}
					onClick={handleEmptyClick}
				>
					{caption}
				</DialogTitle>
			)}
		</Dialog>
	);
};

export default GalleryDialog;
