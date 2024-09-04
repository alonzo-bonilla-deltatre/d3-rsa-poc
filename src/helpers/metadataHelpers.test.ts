import { sampleStory as storyEntityMock } from '@/__mocks__/entities/story';
import {
  getTagTitleOrLabel,
  overrideAlbumMetadata,
  overrideDefaultMetadata,
  overrideLiveBloggingMetadata,
  overrideStoryMetadata,
  overrideVideoMetadata,
} from '@/helpers/metadataHelper';
import { getSrcWithTransformation } from '@/utilities/cloudinaryTransformationsUtility';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { sampleAlbum } from '@/__mocks__/entities/sampleAlbum';
import { sampleBlog, samplePost } from '@/__mocks__/entities/sampleLiveblogging';

jest.mock('@/utilities/cloudinaryTransformationsUtility', () => {
  const originalModule = jest.requireActual('@/utilities/cloudinaryTransformationsUtility');

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
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // ARRANGE
  const parentMetadata: Metadata = {
    title: 'Homepage',
    description: 'Demo site',
  };
  const storyEntity = Object.assign({}, storyEntityMock);

  const imageUrl =
    'https://res.cloudinary.com/forgephotos/image/private/w_250,h_250,c_thumb,g_auto,q_auto,f_jpg/v1678118218/forgego-sandbox/lhmqewjgfmjddly5ii3s';

  it('should exist', () => {
    // ASSERT
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

  it('should return enriched metadata with tags empty if request tags is has wrong object', () => {
    // ARRANGE
    const storyEntityWithoutTags = Object.assign({ ...storyEntity, tags: [{ id: 'id' }] });

    // ACT
    const result = overrideDefaultMetadata(parentMetadata, storyEntityWithoutTags);

    // ASSERT
    // OpenGraphArticle is not exported so we replicate its definition
    const og = result?.openGraph as OpenGraph & {
      type: 'article';
      tags?: null | string | Array<string>;
    };
    expect(og.tags).toEqual('');
  });

  it('should return enriched metadata with description if request has description in fields.description', () => {
    // ARRANGE
    const storyEntityWithoutTags = Object.assign({
      ...storyEntity,
      headline: undefined,
      description: undefined,
      fields: { description: 'description' },
    });

    // ACT
    const result = overrideDefaultMetadata(parentMetadata, storyEntityWithoutTags);

    // ASSERT
    expect(result.description).toEqual('description');
  });
});

describe('overrideAlbumMetadata', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // ARRANGE
  const parentMetadata: Metadata = {
    title: 'Homepage',
    description: 'Demo site',
  };
  const entity = Object.assign({}, sampleAlbum);

  it('should exist', () => {
    // ASSERT
    expect(overrideAlbumMetadata).not.toBeNull();
  });

  it('should return enriched metadata of an Album', () => {
    // ARRANGE

    // ACT
    const result = overrideAlbumMetadata(parentMetadata, sampleAlbum);

    // ASSERT
    // OpenGraphArticle is not exported so we replicate its definition
    const og = result?.openGraph as OpenGraph & {
      type: 'article';
      publishedTime?: string;
      modifiedTime?: string;
      authors?: null | string | URL | Array<string | URL>;
    };
    expect(result?.title).toBe(entity.title);
    expect(result?.description).toBe(entity.description);
    expect(result?.authors).toBe(undefined);
    expect(og.type).toBe('article');
    expect(result?.twitter?.title).toBe(entity.title);
    expect(result?.twitter?.description).toBe(entity.description);
  });
});

describe('overrideStoryMetadata', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // ARRANGE
  const parentMetadata: Metadata = {
    title: 'Homepage',
    description: 'Demo site',
  };
  const storyEntity = Object.assign({}, storyEntityMock);

  it('should exist', () => {
    // ASSERT
    expect(overrideStoryMetadata).not.toBeNull();
  });

  it('should return enriched metadata of a Story', () => {
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
    expect(og.type).toBe('article');
    expect(og.publishedTime).toBe(storyEntity.contentDate);
    expect(og.modifiedTime).toBe(storyEntity.lastUpdatedDate);
    expect(result?.twitter?.title).toBe(storyEntity.title);
    expect(result?.twitter?.description).toBe(storyEntity.headline);
  });
});

describe('overrideVideoMetadata', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // ARRANGE
  const parentMetadata: Metadata = {
    title: 'Homepage',
    description: 'Demo site',
  };
  const entity = Object.assign({}, sampleAlbum);

  it('should exist', () => {
    expect(overrideVideoMetadata).not.toBeNull();
  });

  it('should return enriched metadata of an Album', () => {
    // ARRANGE

    // ACT
    const result = overrideVideoMetadata(parentMetadata, sampleAlbum);

    // ASSERT
    // OpenGraphArticle is not exported so we replicate its definition
    const og = result?.openGraph as OpenGraph & {
      type: 'video.other';
      publishedTime?: string;
      modifiedTime?: string;
      authors?: null | string | URL | Array<string | URL>;
    };
    expect(result?.title).toBe(entity.title);
    expect(result?.description).toBe(entity.description);
    expect(result?.authors).toBe(undefined);
    expect(og.type).toBe('video.other');
    expect(result?.twitter?.title).toBe(entity.title);
    expect(result?.twitter?.description).toBe(entity.description);
  });
});

describe('overrideLiveBloggingMetadata', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // ARRANGE
  const parentMetadata: Metadata = {
    title: 'Homepage',
    description: 'Demo site',
  };
  const bolg = Object.assign({}, sampleBlog);

  it('should exist', () => {
    // ASSERT
    expect(overrideLiveBloggingMetadata).not.toBeNull();
  });

  it('should return enriched metadata of an LiveBlog', () => {
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
      expect(og.tags).toBe('tag1');
    }
    expect(result?.twitter?.title).toBe(bolg.title);
    expect(result?.twitter?.description).toBe('');
  });

  const baseMetadata: Metadata = {
    title: 'Base Title',
    description: 'Base Description',
    openGraph: {},
    twitter: {},
  };

  it('returns base metadata when blog is null', () => {
    const result = overrideLiveBloggingMetadata(baseMetadata, null);
    expect(result).toEqual(baseMetadata);
  });

  it('overrides metadata with blog entity fields', () => {
    const result = overrideLiveBloggingMetadata(baseMetadata, sampleBlog);
    expect(result.title).toEqual(sampleBlog.title);

    // OpenGraphArticle is not exported so we replicate its definition
    const og = result?.openGraph as OpenGraph & {
      type: string;
      publishedTime?: string;
      modifiedTime?: string;
      authors?: null | string | URL | Array<string | URL>;
    };
    expect(og.type).toEqual('article');
    expect(og.publishedTime).toEqual(sampleBlog.datePublished);
    expect(og.modifiedTime).toEqual(sampleBlog.lastUpdateDate);
  });

  it('overrides metadata with post entity fields when provided', () => {
    const result = overrideLiveBloggingMetadata(baseMetadata, sampleBlog, samplePost);
    expect(result.title).toEqual(samplePost.headline);

    // OpenGraphArticle is not exported so we replicate its definition
    const og = result?.openGraph as OpenGraph & {
      type: string;
      publishedTime?: string;
      modifiedTime?: string;
      authors?: null | string | URL | Array<string | URL>;
    };
    expect(og.publishedTime).toEqual(sampleBlog.datePublished);
    expect(og.modifiedTime).toEqual(sampleBlog.lastUpdateDate);
  });

  it('uses blog contentDate when post timestamp is not available', () => {
    const modifiedPostEntity = { ...samplePost, timestamp: '' };
    const result = overrideLiveBloggingMetadata(baseMetadata, sampleBlog, modifiedPostEntity);

    // OpenGraphArticle is not exported so we replicate its definition
    const og = result?.openGraph as OpenGraph & {
      type: string;
      publishedTime?: string;
      modifiedTime?: string;
      authors?: null | string | URL | Array<string | URL>;
    };
    expect(og.publishedTime).toEqual(sampleBlog.datePublished);
  });

  it('uses blog lastUpdatedDate when post timestamp is not available', () => {
    const modifiedPostEntity = { ...samplePost, timestamp: '' };
    const result = overrideLiveBloggingMetadata(baseMetadata, sampleBlog, modifiedPostEntity);

    // OpenGraphArticle is not exported so we replicate its definition
    const og = result?.openGraph as OpenGraph & {
      type: string;
      publishedTime?: string;
      modifiedTime?: string;
      authors?: null | string | URL | Array<string | URL>;
    };
    expect(og.modifiedTime).toEqual(sampleBlog.lastUpdateDate);
  });
});

describe('getTagTitleOrLabel', () => {
  it('returns title when tag has title property', () => {
    const tag = { title: 'News', slug: 'news' };
    expect(getTagTitleOrLabel(tag as any)).toEqual('News');
  });

  it('returns label when tag has label property', () => {
    const tag = { label: 'Breaking', slug: 'breaking' };
    expect(getTagTitleOrLabel(tag as any)).toEqual('Breaking');
  });

  it('returns label when tag has label property but undefined', () => {
    const tag = { label: undefined };
    expect(getTagTitleOrLabel(tag as any)).toEqual('');
  });

  it('returns slug when tag has neither title nor label property', () => {
    const tag = { slug: 'general' }; // Simulating a minimal tag object
    expect(getTagTitleOrLabel(tag as any)).toEqual('general');
  });

  it('returns empty string when tag has no title, label, or slug property', () => {
    const tag = {}; // Simulating an empty tag object
    expect(getTagTitleOrLabel(tag as any)).toEqual('');
  });
});
