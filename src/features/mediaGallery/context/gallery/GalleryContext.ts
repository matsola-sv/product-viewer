import { createContext } from 'react';

export interface GalleryContextValue {
	total: number; // Total number of items
	activeIndex: number;
	loop: boolean;
	autoplay: boolean;
	zoomed: boolean; // Zoom status
	canZoom: boolean; // Zoom availability for the active slide
	setActiveIndex: (index: number) => void;
	toggleAutoplay: () => void;
	toggleZoom: () => void;
}

export const GalleryContext = createContext<GalleryContextValue | null>(null);
