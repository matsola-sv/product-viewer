export interface SlideState {
	index: number;
	slideEl: HTMLElement;
}

export interface SlideStateChange {
	active: SlideState;
	prev?: SlideState;
}

export interface AutoplayProgressState {
	time: number; // ms left
	progress: number; // 0..1
}

export type AutoplayProgressCallback = (time: number, progress: number) => void;
export type SlideChangeCallback = (event: SlideStateChange) => void;
export type SlideClickCallback = (event: SlideState) => void;
