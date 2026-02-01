import type { ImageItem, MediaItem } from '../models/media';

/**
 * Type guard: tells TypeScript that when this returns true,
 * the item is definitely an ImageItem (so we can safely access image-only fields).
 */
export const isImage = (item: MediaItem): item is ImageItem => {
	return item.type === 'image';
};
