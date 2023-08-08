import { sampleStory as storyEntityMock } from '@/__mocks__/entities/story';
import { overrideLiveBloggingMetadata, overrideDefaultMetadata } from './metadataLiveBloggingEntityHelper';
import { getSrcWithTransformation } from '@/utilities/cloudinaryTransformations';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { sampleBlog } from '@/__mocks__/entities/sampleLiveblogging';

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
  const bolg = Object.assign({}, sampleBlog);

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
    const result = overrideDefaultMetadata(parentMetadata, sampleBlog);

    // ASSERT
    // OpenGraphArticle is not exported so we replicate its definition
    const og = result?.openGraph as OpenGraph & {
      type: 'article';
      tags?: null | string | Array<string>;
    };
    expect(result?.title).toBe(bolg.title);
    expect(result?.description).toBe(bolg.description);
    expect(og.type).toBe('article');
    expect(og.images).toEqual([{ url: imageUrl }]);
    expect(og.tags).toEqual(bolg.tags?.map((t) => t.label) ?? null);
    expect(result?.twitter?.title).toBe(bolg.title);
    expect(result?.twitter?.description).toBe(bolg.description);
    expect(result?.twitter?.images).toBe(imageUrl);
  });
});
describe('overrideLiveBloggingMetadata', () => {
  const parentMetadata: Metadata = {
    title: 'Homepage',
    description: 'Demo site',
  };
  const bolg = Object.assign({}, sampleBlog);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should exist', () => {
    expect(overrideLiveBloggingMetadata).not.toBeNull();
  });

  it('should return enriched metadata of an Album', () => {
    // ARRANGE

    // ACT
    const result = overrideLiveBloggingMetadata(parentMetadata, sampleBlog);

    // ASSERT
    // OpenGraphArticle is not exported so we replicate its definition
    const og = result?.openGraph as OpenGraph & {
      type: 'article';
      publishedTime?: string;
      modifiedTime?: string;
      authors?: null | string | URL | Array<string | URL>;
    };
    expect(result?.title).toBe(bolg.title);
    expect(result?.description).toBe(bolg.description);
    expect(og.type).toBe('article');
    expect(result?.twitter?.title).toBe(bolg.title);
    expect(result?.twitter?.description).toBe(bolg.description);
  });
});
