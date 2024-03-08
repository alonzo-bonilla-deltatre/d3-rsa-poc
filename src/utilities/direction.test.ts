import { getSiteDirection, isRtlSiteDirection } from '@/utilities/direction';
import { describe, expect, it } from '@jest/globals';

describe('getTextDirection', () => {
  it('should return "rtl" when language is ar', () => {
    // ARRANGE
    const language = 'ar';

    // ACT
    const result = getSiteDirection(language);

    // ASSERT
    expect(result).toBe('rtl');
  });
  it('should return "ltr" when language is not ar', () => {
    // ARRANGE
    const language = 'en';

    // ACT
    const result = getSiteDirection(language);

    // ASSERT
    expect(result).toBe('ltr');
  });
});

describe('isRtlSiteDirection', () => {
  it('should return true when language is ar', () => {
    // ARRANGE
    const language = 'ar';

    // ACT
    const result = isRtlSiteDirection(language);

    // ASSERT
    expect(result).toBe(true);
  });
  it('should return false when language is not ar', () => {
    // ARRANGE
    const language = 'en';

    // ACT
    const result = isRtlSiteDirection(language);

    // ASSERT
    expect(result).toBe(false);
  });
});
