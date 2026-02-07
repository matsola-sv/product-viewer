# TODO: Gallery state orchestration (zoom ↔ autoPlay)

## Problem
Zoom and autoPlay are mutually exclusive modes,  
but currently they can be active at the same time,  
because state changes come from different sources  
(image click, zoom button, gestures, external controls).

### Additional context
- Slide switching while zoomed was previously disabled (`allowTouchMove = false`) to avoid swipe conflicts.  
- **Currently, swipe blocking is turned off temporarily**, because Swiper handles zoom correctly during slide changes.  
- **In the future**, if a problem with zoom and swipe switching arises, this will need to be addressed.  
- This is why mutual-exclusion rules between zoom and autoPlay are not implemented for now.

## Solution
- Keep swipe unblocked for now.  
- Let Swiper handle zoom and autoPlay naturally.  
- Business logic in `useGallery` remains simple: manage active slide, zoom state, and autoPlay state.  
- `useSwiper` remains a pure adapter reacting only to props.

## Example: Blocking swipe when zoomed in `useSwiper.ts`

```ts
// Block/unblock swipes when zooming 
useEffect(() => {
  if (!swiperInstance || !enableZoom) return;

  // Disable swiping if zoom is active
  swiperInstance.allowTouchMove = !zoomed;
  swiperInstance.allowSlideNext = !zoomed;
  swiperInstance.allowSlidePrev = !zoomed;
}, [swiperInstance, zoomed, enableZoom]);
