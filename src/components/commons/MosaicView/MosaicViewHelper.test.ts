import { generateMosaicLayout } from '@/components/commons/MosaicView/MosaicViewHelper';
import { desktopBasePattern, mobileBasePattern } from './patterns';

describe('generateMosaicLayout function', () => {
  it('should generate correct grid layout for desktop', () => {
    // ARRANGE
    const imageCount = 10;
    const isMobile = false;

    // ACT
    const result = generateMosaicLayout(imageCount, isMobile);

    // ASSERT
    expect(result[0].col).toBe(desktopBasePattern[0].col);
    expect(result[0].row).toBe('row-start-1 row-span-1');
    expect(result[9].col).toBe(desktopBasePattern[9].col);
  });

  it('should generate correct grid layout for mobile', () => {
    // ARRANGE
    const imageCount = 10;
    const isMobile = true;

    // ACT
    const result = generateMosaicLayout(imageCount, isMobile);

    // ASSERT
    expect(result[0].col).toBe(mobileBasePattern[0].col);
    expect(result[0].row).toBe('row-start-1 row-span-1');
    expect(result[9].col).toBe(mobileBasePattern[9].col);
  });
});
