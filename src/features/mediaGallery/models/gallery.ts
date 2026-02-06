export interface SlideState {
	index: number;
	slideEl: HTMLElement;
}

export interface SlideStateChange {
	active: SlideState;
	prev?: SlideState;
}

export interface AutoplayTimeLeftState {
	time: number; // ms left
	progress: number; // 0..1
}

export type SlideClickFn = (event: SlideState) => void;
export type SlideChangeFn = (event: SlideStateChange) => void;
export type ZoomChangeFn = (zoomed: boolean) => void;
export type AutoplayTimeLeftFn = (time: number, progress: number) => void;
export type AutoplayResetTimeLeftFn = () => void;
