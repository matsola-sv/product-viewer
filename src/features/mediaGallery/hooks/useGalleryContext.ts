import { useContext } from 'react';

import { GalleryContext } from '../context/gallery/GalleryContext';

export const useGalleryContext = () => {
	const context = useContext(GalleryContext);

	if (!context) {
		throw new Error('useGalleryContext must be used inside GalleryProvider');
	}

	return context;
};
