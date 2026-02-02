import type { SxProps, Theme } from '@mui/material';

interface BaseActionStyle {
	size?: number;
	bgColor?: string;
	hoverColor?: string;
	styles?: SxProps<Theme>;
}

interface TextStyle {
	color?: string;
	fontSize?: number;
	fontWeight?: number;
}

interface IconStyle {
	strokeColor?: string; // icon / svg stroke
	strokeWidth?: number;
}

export type GalleryActionProps = BaseActionStyle & Partial<TextStyle> & Partial<IconStyle>;
