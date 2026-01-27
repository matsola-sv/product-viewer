type ClickEvent = React.MouseEvent<HTMLDivElement>;

/**
 * Checks if an element is interactive via:
 * - standard interactive HTML tags
 * - data-interactive attribute
 * - custom selector ('.btn-prev, .btn-next', '.gallery:not(.disabled)')
 */
export const isInteractiveElement = (el: Element, customSelector?: string): boolean => {
	const interactiveTags = [
		'BUTTON',
		'A',
		'IMG',
		'VIDEO',
		'INPUT',
		'TEXTAREA',
		'SELECT',
		'SVG',
	];

	if (interactiveTags.includes(el.tagName)) {
		return true;
	}

	if (el.hasAttribute('data-interactive')) {
		return true;
	}

	// Check custom selector if provided
	if (customSelector && el.matches(customSelector)) {
		return true;
	}
	return false;
};

/**
 * Checks if a click occurred on an interactive element (or its child).
 * - custom selector ('.btn-prev, .btn-next', '.gallery:not(.disabled)')
 */
export const isInteractiveClick = (event: ClickEvent, customSelector?: string): boolean => {
	const target = event.target as Element;

	// Traverse up to find if we clicked on an interactive element
	let node: Element | null = target;

	while (node && node !== event.currentTarget) {
		if (isInteractiveElement(node, customSelector)) {
			return true;
		}
		node = node.parentElement;
	}
	return false;
};
