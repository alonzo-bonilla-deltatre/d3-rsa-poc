import { sampleStory as storyEntityMock } from '@/__mocks__/entities/story';
import { overrideDefaultMetadata } from './StoryHelpers';
import { getSrcWithTransformation } from '@/utilities/cloudinaryTransformations';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

jest.mock('@/utilities/cloudinaryTransformations', () => {
  const originalModule = jest.requireActual('@/utilities/cloudinaryTransformations');

  return {
    ...originalModule,
    transformations: {
      ...originalModule.transformations,
      thumbnailGridItem: {
        mobile: 't_ratio16_9-size20',
        tablet: 't_ratio16_9-size20',
        desktop: 't_ratio16_9-size40',
        mobileWidth: 416,
        mobileHeight: 234,
      },
    },
    getSrcWithTransformation: jest.fn(),
  };
});

describe('overrideDefaultMetadata', () => {
  const parentMetadata: Metadata = {
    title: 'Homepage',
    description: 'Demo site',
  };
  const storyEntity = Object.assign({}, storyEntityMock);

  const imageUrl =
    'https://res.cloudinary.com/forgephotos/image/private/w_250,h_250,c_thumb,g_auto,q_auto,f_jpg/v1678118218/forgego-sandbox/lhmqewjgfmjddly5ii3s';

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should exist', () => {
    expect(overrideDefaultMetadata).not.toBeNull();
  });

  it('should return enriched metadata', () => {
    // ARRANGE
    (getSrcWithTransformation as jest.Mock).mockReturnValue(imageUrl);

    // ACT
    const result = overrideDefaultMetadata(parentMetadata, storyEntity);

    // ASSERT
    // OpenGraphArticle is not exported so we replicate its definition
    const og = result?.openGraph as OpenGraph & {
      type: 'article';
      publishedTime?: string;
      modifiedTime?: string;
      authors?: null | string | URL | Array<string | URL>;
      tags?: null | string | Array<string>;
    };
    expect(result?.title).toBe(storyEntity.title);
    expect(result?.description).toBe(storyEntity.headline);
    expect(result?.authors).toEqual([{ name: storyEntity.createdBy }]);
    expect(og.type).toBe('article');
    expect(og.images).toEqual([{ url: imageUrl }]);
    expect(og.publishedTime).toBe(storyEntity.contentDate);
    expect(og.modifiedTime).toBe(storyEntity.lastUpdatedDate);
    expect(og.authors).toBe(storyEntity.createdBy);
    expect(og.tags).toEqual(storyEntity.tags?.map((t) => t.title) ?? null);
    expect(result?.twitter?.title).toBe(storyEntity.title);
    expect(result?.twitter?.description).toBe(storyEntity.headline);
    expect(result?.twitter?.images).toBe(imageUrl);
  });
});
