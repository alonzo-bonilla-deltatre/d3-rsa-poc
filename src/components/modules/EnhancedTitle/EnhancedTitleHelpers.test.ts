import { sampleThumbnail } from '@/__mocks__/entities/story';
import {
  getGadAssetBgSize,
  getGadAssetBgSizeClasses,
  getGadAssetBgSizeMobile,
  getGradientClasses,
  getPhotoBgSizeClasses,
  setDefaultBackground,
  setGadAssetBackground,
  setPhotoBackground,
} from './EnhancedTitleHelpers';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { emptyDistributionEntity } from '@/__mocks__/entities/sampleStoryParts';
import { DistributionEntity } from '@/models/types/forge';
import { sampleAsset } from '@/__mocks__/components/sampleGadAsset';

describe('getGradientClasses', (): void => {
  test('should return left classes by default', (): void => {
    // ACT
    const result = getGradientClasses(undefined);
    // ASSERT
    expect(result).toContain('right-1/2');
  });
  test('should return right classes if choosen', (): void => {
    // ACT
    const result = getGradientClasses('right');
    // ASSERT
    expect(result).toContain('bg-gradient-to-l');
  });
});
describe('getGadAssetBgSizeClasses', (): void => {
  test('should return large classes by default', (): void => {
    // ACT
    const result = getGadAssetBgSizeClasses(undefined);
    // ASSERT
    expect(result).toContain('lg:min-h-[300px]');
  });
  test('should return small classes if choosen', (): void => {
    // ACT
    const result = getGadAssetBgSizeClasses('small');
    // ASSERT
    expect(result).toContain('lg:min-h-[150px]');
  });
});
describe('getGadAssetBgSize', (): void => {
  test('should return large classes by default', (): void => {
    // ACT
    const result = getGadAssetBgSize(undefined);
    // ASSERT
    expect(result).toEqual(200);
  });
  test('should return small classes if choosen', (): void => {
    // ACT
    const result = getGadAssetBgSize('small');
    // ASSERT
    expect(result).toEqual(150);
  });
});
describe('getGadAssetBgSizeMobile', (): void => {
  test('should return large classes by default', (): void => {
    // ACT
    const result = getGadAssetBgSizeMobile(undefined);
    // ASSERT
    expect(result).toEqual(120);
  });
  test('should return small classes if choosen', (): void => {
    // ACT
    const result = getGadAssetBgSizeMobile('small');
    // ASSERT
    expect(result).toEqual(100);
  });
});
describe('getPhotoBgSizeClasses', (): void => {
  test('should return large classes by default', (): void => {
    // ACT
    const result = getPhotoBgSizeClasses(undefined);
    // ASSERT
    expect(result).toContain('lg:min-h-[450px]');
  });
  test('should return small classes if choosen', (): void => {
    // ACT
    const result = getPhotoBgSizeClasses('small');
    // ASSERT
    expect(result).toContain('lg:min-h-[210px]');
  });
});
describe('setDefaultBackground', (): void => {
  test('should return DefaultBackground', (): void => {
    // ACT
    const result = setDefaultBackground();
    // ASSERT
    expect(result.imageMobileUrl).toEqual('/assets/article-header-background.svg');
  });
});
describe('setPhotoBackground', (): void => {
  test('should return PhotoBackground', (): void => {
    // ARRANGE
    const imageEntity: DistributionEntity = {
      ...emptyDistributionEntity,
      sampleThumbnail,
    };
    // ACT
    const result = setPhotoBackground(
      imageEntity,
      transformations.enhanced_title_background,
      'additionalClasses',
      false
    );
    // ASSERT
    expect(result.additionalClasses).toEqual('additionalClasses');
    expect(result.clippedBackground).toEqual(true);
  });
});
describe('setGadAssetBackground', (): void => {
  test('should return GadAssetBackground', (): void => {
    // ACT
    const result = setGadAssetBackground(sampleAsset, transformations.enhanced_title_background, 'small');
    // ASSERT
    expect(result.size).toEqual(150);
    expect(result.additionalClasses).toEqual('bg-transparent');
  });
});
