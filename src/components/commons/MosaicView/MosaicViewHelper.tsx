import { desktopBasePattern, mobileBasePattern } from './patterns';
import { MosaicPattern } from './types';

export const generateMosaicLayout = (imageCount: number, isMobile: boolean): MosaicPattern => {
  const basePattern = isMobile ? mobileBasePattern : desktopBasePattern;

  let layout = [];
  const baseRows = isMobile ? 16 : 8;
  for (let i = 0; i < imageCount; i++) {
    const patternIndex = i % 20;
    const baseRow = Math.floor(i / 20) * baseRows + 1;
    const pattern = basePattern[patternIndex];

    const item = {
      col: pattern.col,
      row: pattern.row.replace('{row}', baseRow.toString()),
      transformation: pattern.transformation,
    };
    layout.push(item);
  }

  return layout;
};
