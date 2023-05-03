import { describe, expect, test } from '@jest/globals';
import { getContainerClassName, getImageTransformation, getInfoClassName } from '@/components/common/Card/Card.helpers';
import { transformations } from '@/utilities/cloudinaryTransformations';

describe('getImageTransformation', (): void => {

  test('should return default transformation if name is empty', (): void => {
    // ACT
    const result = getImageTransformation('');

    // ASSERT
    expect(result).toEqual(transformations.thumbnailGridItem);
  });

  test('should return portrait transformation if name is portrait', (): void => {
    // ACT
    const result = getImageTransformation('fullimage-portrait');

    // ASSERT
    expect(result).toEqual(transformations.mosaicPortraitThumbnail);
  });

  test('should return default class name if name is empty', (): void => {
    // ACT
    const result = getContainerClassName('');

    // ASSERT
    expect(result).toEqual('');
  });
  test('should return grid class name if name is fullimage', (): void => {
    // ACT
    const result = getContainerClassName('fullimage');

    // ASSERT
    expect(result).toEqual('grid');
  });

  test('should return default info class name if name is empty', (): void => {
    // ACT
    const result = getInfoClassName('');

    // ASSERT
    expect(result).toEqual('py-5 w-4/6');
  });
  test('should return custom info class name if name is fullimage', (): void => {
    // ACT
    const result = getInfoClassName('fullimage');

    // ASSERT
    expect(result).toContain('p-5 col-start-1');
  });
});
