// Colors
export const primaryGrey = '#FAFAFA';
export const textGrey = '#262626';

// Media Queries
export const mobilePortrait =
  '(max-device-width : 480px) and (orientation: portrait), (max-device-width : 812px) and  (orientation: landscape)';
// I changed this to 812px from 800 to include the iPhone X dimensions at landscape.
export const mobileLandscape =
  '(max-device-height : 480px) and (orientation: landscape)';
export const tabletPortrait =
  '(min-device-width: 480px) and (max-device-width : 1000px) and (orientation: portrait)';
export const tabletPortraitLarge =
  '(min-device-width: 480px) and (max-device-width : 1024px) and (orientation: portrait)';
export const tabletLandscape =
  '(max-device-height : 800px) and (orientation: landscape)';

// FUNCTIONS
// Flexbox
export const FlexFunc = (direction, justifyC, alignI) => {
  return `
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justifyC};
  align-items: ${alignI};
  `;
};
