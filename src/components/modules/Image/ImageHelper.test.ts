import { describe, expect, test } from '@jest/globals';
import { containerCssSize, getImageContainerCssClass, getLinkCssClass } from '@/components/modules/Image/ImageHelper';

describe('getLinkCssClass', () => {
  test('should return default value if alignment is not set', () => {
    // ARRANGE
    const linkCssClass = 'flex flex-col items-start';

    // ACT
    const result = getLinkCssClass();

    // ASSERT
    expect(result).toBe(linkCssClass);
  });

  test('should return left value if alignment is set to left', () => {
    // ARRANGE
    const linkCssClass = 'flex flex-col items-start';

    // ACT
    const result = getLinkCssClass('left');

    // ASSERT
    expect(result).toBe(linkCssClass);
  });

  test('should return center value if alignment is set to center', () => {
    // ARRANGE
    const linkCssClass = 'flex flex-col items-center';

    // ACT
    const result = getLinkCssClass('center');

    // ASSERT
    expect(result).toBe(linkCssClass);
  });

  test('should return right value if alignment is set to right', () => {
    // ARRANGE
    const linkCssClass = 'flex flex-col items-end';

    // ACT
    const result = getLinkCssClass('right');

    // ASSERT
    expect(result).toBe(linkCssClass);
  });
});

describe('getImageContainerCssClass', () => {
  test('should return default value if alignment is not set', () => {
    // ARRANGE
    const linkCssClass = 'flex justify-start';

    // ACT
    const result = getImageContainerCssClass();

    // ASSERT
    expect(result).toBe(linkCssClass);
  });

  test('should return left value if alignment is set to left', () => {
    // ARRANGE
    const linkCssClass = 'flex justify-start';

    // ACT
    const result = getImageContainerCssClass('left');

    // ASSERT
    expect(result).toBe(linkCssClass);
  });

  test('should return center value if alignment is set to center', () => {
    // ARRANGE
    const linkCssClass = 'flex justify-center';

    // ACT
    const result = getImageContainerCssClass('center');

    // ASSERT
    expect(result).toBe(linkCssClass);
  });

  test('should return right value if alignment is set to right', () => {
    // ARRANGE
    const linkCssClass = 'flex justify-end';

    // ACT
    const result = getImageContainerCssClass('right');

    // ASSERT
    expect(result).toBe(linkCssClass);
  });
});

describe('containerCssSize', () => {
  it('returns correct CSS class for square_extraSmall', () => {
    // ASSERT
    expect(containerCssSize.square_extraSmall).toBe('max-w-[208px] max-h-[208px]');
  });

  it('returns correct CSS class for portrait_large', () => {
    // ASSERT
    expect(containerCssSize.portrait_large).toBe('max-w-[840px] max-h-[1120px]');
  });

  it('returns correct CSS class for landscape_medium', () => {
    // ASSERT
    expect(containerCssSize.landscape_medium).toBe('max-w-[624px] max-h-[351px]');
  });

  it('returns correct CSS class for hero_extraLarge', () => {
    // ASSERT
    expect(containerCssSize.hero_extraLarge).toBe('max-w-[1281px] max-h-[549px]');
  });

  it('returns correct CSS class for non-existent key', () => {
    // ASSERT
    expect(containerCssSize['non_existent_key']).toBeUndefined();
  });
});
