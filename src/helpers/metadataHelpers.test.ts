import { sampleStory as storyEntityMock } from '@/__mocks__/entities/story';
import {
  overrideAlbumMetadata,
  overrideDefaultMetadata,
  overrideLiveBloggingMetadata,
  overrideStoryMetadata,
  overrideVideoMetadata,
} from '@/helpers/metadataHelper';
import { getSrcWithTransformation } from '@/utilities/cloudinaryTransformations';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { sampleAlbum } from '@/__mocks__/entities/sampleAlbum';
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
      tags?: null | string | Array<string>;
    };
    expect(result?.title).toBe(storyEntity.title);
    expect(result?.description).toBe(storyEntity.headline);
    expect(result?.authors).toBe(undefined);
    expect(og.type).toBe('article');
    expect(og.images).toEqual([{ url: imageUrl }]);
    expect(og.tags).toEqual(storyEntity.tags?.map((t) => t.title)?.join(','));
    expect(result?.twitter?.title).toBe(storyEntity.title);
    expect(result?.twitter?.description).toBe(storyEntity.headline);
    expect(result?.twitter?.images).toBe(imageUrl);
  });

  it('should return enriched metadata with description empty if request headline is not set', () => {
    // ARRANGE
    const storyEntityWithoutThumbnail = Object.assign({ ...storyEntity, headline: undefined });

    // ACT
    const result = overrideDefaultMetadata(parentMetadata, storyEntityWithoutThumbnail);

    // ASSERT
    expect(result?.description).toBe('');
    expect(result?.twitter?.description).toBe('');
  });

  it('should return enriched metadata with thumbnail empty if request thumbnail is equals null', () => {
    // ARRANGE
    (getSrcWithTransformation as jest.Mock).mockReturnValue('');
    const storyEntityWithoutThumbnail = Object.assign({ ...storyEntity, thumbnail: null });

    // ACT
    const result = overrideDefaultMetadata(parentMetadata, storyEntityWithoutThumbnail);

    // ASSERT
    // OpenGraphArticle is not exported so we replicate its definition
    const og = result?.openGraph as OpenGraph & {
      type: 'article';
      tags?: null | string | Array<string>;
    };
    expect(og.images).toEqual([{ url: '' }]);
    expect(result?.twitter?.images).toBe('');
  });

  it('should return enriched metadata with tags empty if request tags is equals undefined', () => {
    // ARRANGE
    const storyEntityWithoutTags = Object.assign({ ...storyEntity, tags: null });

    // ACT
    const result = overrideDefaultMetadata(parentMetadata, storyEntityWithoutTags);

    // ASSERT
    // OpenGraphArticle is not exported so we replicate its definition
    const og = result?.openGraph as OpenGraph & {
      type: 'article';
      tags?: null | string | Array<string>;
    };
    expect(og.tags).toEqual(undefined);
  });
});
describe('overrideAlbumMetadata', () => {
  const parentMetadata: Metadata = {
    title: 'Homepage',
    description: 'Demo site',
  };
  const entity = Object.assign({}, sampleAlbum);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should exist', () => {
    expect(overrideAlbumMetadata).not.toBeNull();
  });

  it('should return enriched metadata of an Album', () => {
    // ARRANGE

    // ACT
    const result = overrideAlbumMetadata(parentMetadata, entity);

    // ASSERT
    // OpenGraphArticle is not exported so we replicate its definition
    const og = result?.openGraph as OpenGraph & {
      type: 'article';
      publishedTime?: string;
      modifiedTime?: string;
      authors?: null | string | URL | Array<string | URL>;
    };
    expect(result?.title).toBe(entity.title);
    expect(result?.description).toBe(entity.headline);
    expect(result?.authors).toBe(undefined);
    expect(og.type).toBe('article');
    expect(result?.twitter?.title).toBe(entity.title);
    expect(result?.twitter?.description).toBe(entity.headline);
  });
});
describe('overrideStoryMetadata', () => {
  const parentMetadata: Metadata = {
    title: 'Homepage',
    description: 'Demo site',
  };
  const storyEntity = Object.assign({}, storyEntityMock);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should exist', () => {
    expect(overrideStoryMetadata).not.toBeNull();
  });

  it('should return enriched metadata of a Story', () => {
    // ARRANGE

    // ACT
    const result = overrideStoryMetadata(parentMetadata, storyEntity);

    // ASSERT
    // OpenGraphArticle is not exported so we replicate its definition
    const og = result?.openGraph as OpenGraph & {
      type: 'article';
      publishedTime?: string;
      modifiedTime?: string;
      authors?: null | string | URL | Array<string | URL>;
    };
    expect(result?.title).toBe(storyEntity.title);
    expect(result?.description).toBe(storyEntity.headline);
    expect(result?.authors).toBe(undefined);
    expect(og.type).toBe('article');
    expect(og.publishedTime).toBe(storyEntity.contentDate);
    expect(og.modifiedTime).toBe(storyEntity.lastUpdatedDate);
    expect(og.authors).toBe(storyEntity.createdBy);
    expect(result?.twitter?.title).toBe(storyEntity.title);
    expect(result?.twitter?.description).toBe(storyEntity.headline);
  });
});
describe('overrideVideoMetadata', () => {
  const parentMetadata: Metadata = {
    title: 'Homepage',
    description: 'Demo site',
  };
  const entity = Object.assign({}, sampleAlbum);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should exist', () => {
    expect(overrideVideoMetadata).not.toBeNull();
  });

  it('should return enriched metadata of an Album', () => {
    // ARRANGE

    // ACT
    const result = overrideVideoMetadata(parentMetadata, entity);

    // ASSERT
    // OpenGraphArticle is not exported so we replicate its definition
    const og = result?.openGraph as OpenGraph & {
      type: 'video.other';
      publishedTime?: string;
      modifiedTime?: string;
      authors?: null | string | URL | Array<string | URL>;
    };
    expect(result?.title).toBe(entity.title);
    expect(result?.description).toBe(entity.headline);
    expect(result?.authors).toBe(undefined);
    expect(og.type).toBe('video.other');
    expect(result?.twitter?.title).toBe(entity.title);
    expect(result?.twitter?.description).toBe(entity.headline);
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

  it('should return enriched metadata of an LiveBlog', () => {
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
    expect(og.title).toBe(bolg.title);
    expect(og.description).toBe(bolg.description);
    if ('tags' in og) {
      expect(og.tags).toEqual(sampleBlog.tags?.map((t) => t.label)?.join(','));
    }
    expect(result?.twitter?.title).toBe(bolg.title);
    expect(result?.twitter?.description).toBe(bolg.description);
  });

  it('should return enriched metadata of an LiveBlog with empty value', () => {
    // ARRANGE

    // ACT
    const result = overrideLiveBloggingMetadata(parentMetadata, {
      ...sampleBlog,
      description: undefined,
      tags: [{ slug: 'tag1', id: 'tag1', extradata: {} }],
    });

    // ASSERT
    // OpenGraphArticle is not exported so we replicate its definition
    const og = result?.openGraph as OpenGraph & {
      type: 'article';
      publishedTime?: string;
      modifiedTime?: string;
      authors?: null | string | URL | Array<string | URL>;
    };
    expect(result?.title).toBe(bolg.title);
    expect(result?.description).toBe('');
    expect(og.type).toBe('article');
    expect(og.description).toBe('');
    if ('tags' in og) {
      expect(og.tags).toBe('');
    }
    expect(result?.twitter?.title).toBe(bolg.title);
    expect(result?.twitter?.description).toBe('');
  });
});
