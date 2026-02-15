import type { IconButtonProps } from '@mui/material';

export interface FullscreenStateMap<T> {
	enter: T;
	exit: T;
}

export interface FullscreenToggleProps extends IconButtonProps {
	/** Hide button when fullscreen is unsupported. Defaults to disabled if false. */
	hideIfUnsupported?: boolean;

	/**
	 * FullscreenStateMap<string>{ enter: 'Enter', exit: 'Exit' }
	 * FullscreenStateMap<Element>{  enter: <FaExpand />, exit: <FaCompress /> }
	 */
	labels?: FullscreenStateMap<string>;
}
