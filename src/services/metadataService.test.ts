import { getMetadata, getMetadataGroup, setPageMetadata } from '@/services/metadataService';
import { Author } from 'next/dist/lib/metadata/types/metadata-types';
import { getPageStructure } from './pageService';
import { setFrontendAllSiteConfiguration } from '@/services/configurationService';
import {
  ForgeLanguagesMetadataKey,
  ForgeMetadataCategoryType,
  ForgeSEOMetadataKey,
  ForgeSocialsMetadataKey,
} from '@/models/types/forge';

jest.mock('./pageService', () => ({
  getPageStructure: jest.fn(),
}));

describe('setPageMetadata function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('returns null if metadata list is null', async () => {
    const metadata = await setPageMetadata(null);

    expect(metadata).toBeNull();
  });
  it('should return the correct metadata content when title & desc data is missing', async () => {
    // ARRANGE
    const pageStructure = {
      data: {
        metadata: [],
      },
    };
    (getPageStructure as jest.Mock).mockResolvedValueOnce(pageStructure);

    // ACT
    const result = await setPageMetadata(pageStructure.data.metadata);

    // ASSERT
    expect(result?.title).toBe('');
    expect(result?.description).toBe('');
  });
  it('should return the correct metadata content when some data is missing', async () => {
    // ARRANGE
    const pageStructure = {
      data: {
        metadata: [
          {
            category: ForgeMetadataCategoryType.seo,
            key: ForgeSEOMetadataKey.title,
            value: 'My title',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.seo,
            key: ForgeSEOMetadataKey.description,
            value: 'My description',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.languages,
            key: ForgeLanguagesMetadataKey.en_gb_culture,
            value: 'en-GB',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.languages,
            key: ForgeLanguagesMetadataKey.en_gb_url,
            value: 'https://mywebsite-url',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.languages,
            key: ForgeLanguagesMetadataKey.en_gb_voc_tag,
            value: 'lang-en-gb',
            type: 'string',
          },
        ],
      },
    };
    (getPageStructure as jest.Mock).mockResolvedValueOnce(pageStructure);
    setFrontendAllSiteConfiguration(pageStructure.data.metadata);

    // ACT
    const result = await setPageMetadata(pageStructure.data.metadata);

    // ASSERT
    expect(result?.title).toBe('My title');
    expect(result?.description).toBe('My description');
    expect(result?.authors).toBeNull();
    expect(result?.twitter?.title).toBe('My title');
    expect(result?.twitter?.description).toBe('My description');
    expect(result?.twitter?.site).toBe('');
    expect(result?.twitter?.creator).toBe('');
    expect(result?.twitter?.images).toBe('');
    expect(result?.openGraph?.title).toBe('My title');
    expect(result?.openGraph?.description).toBe('My description');
    expect(result?.openGraph?.siteName).toBe('');
    expect(result?.openGraph?.images).toBe('');
    expect(result?.openGraph?.locale).toBe(process.env.CULTURE);
    expect(result?.robots).toBe('noodp');
    expect(result?.other).toBeUndefined();
  });
  it('should return the correct metadata content when all data has populated', async () => {
    // ARRANGE
    const pageStructure = {
      data: {
        metadata: [
          {
            category: ForgeMetadataCategoryType.seo,
            key: ForgeSEOMetadataKey.title,
            value: 'My title',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.seo,
            key: ForgeSEOMetadataKey.description,
            value: 'My description',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.seo,
            key: ForgeSEOMetadataKey.site_name,
            value: 'site-name',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.seo,
            key: ForgeSEOMetadataKey.robots,
            value: 'robots text',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.seo,
            key: ForgeSEOMetadataKey.image,
            value: 'https://myimage-url',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.socials,
            key: ForgeSocialsMetadataKey.twitter_id,
            value: 'Twitter Id',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.socials,
            key: ForgeSocialsMetadataKey.fb_app_id,
            value: '123456',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.socials,
            key: ForgeSocialsMetadataKey.fb_pages,
            value: 'fbpages',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.languages,
            key: ForgeLanguagesMetadataKey.en_gb_culture,
            value: 'en-GB',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.languages,
            key: ForgeLanguagesMetadataKey.en_gb_url,
            value: 'https://mywebsite-url',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.languages,
            key: ForgeLanguagesMetadataKey.en_gb_voc_tag,
            value: 'lang-en-gb',
            type: 'string',
          },
        ],
      },
    };
    (getPageStructure as jest.Mock).mockResolvedValueOnce(pageStructure);
    setFrontendAllSiteConfiguration(pageStructure.data.metadata);

    // ACT
    const result = await setPageMetadata(pageStructure.data.metadata);

    // ASSERT
    expect(result?.title).toBe('My title');
    expect(result?.description).toBe('My description');
    expect(result?.authors).toBeDefined();
    expect(result?.authors).toMatchObject<Author>({ url: 'https://mywebsite-url', name: 'site-name' });
    expect(result?.twitter?.title).toBe('My title');
    expect(result?.twitter?.description).toBe('My description');
    expect(result?.twitter?.site).toBe('Twitter Id');
    expect(result?.twitter?.creator).toBe('Twitter Id');
    expect(result?.twitter?.images).toBe('https://myimage-url');
    expect(result?.openGraph?.title).toBe('My title');
    expect(result?.openGraph?.description).toBe('My description');
    expect(result?.openGraph?.siteName).toBe('site-name');
    expect(result?.openGraph?.images).toBe('https://myimage-url');
    expect(result?.openGraph?.locale).toBe('en-GB');
    expect(result?.robots).toBe('robots text');
  });
});

describe('getMetadataGroup function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns empty array if metadata is null', async (): Promise<void> => {
    // ACT
    const metadata = getMetadataGroup(null, ForgeMetadataCategoryType.seo);

    // ASSERT
    expect(metadata).toStrictEqual([]);
  });

  it('should return the correct metadata group for a specific category', async () => {
    // ARRANGE
    const pageStructure = {
      data: {
        metadata: [
          {
            category: ForgeMetadataCategoryType.seo,
            key: ForgeSEOMetadataKey.title,
            value: 'My title',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.seo,
            key: ForgeSEOMetadataKey.description,
            value: 'My description',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.seo,
            key: ForgeSEOMetadataKey.site_name,
            value: 'site-name',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.seo,
            key: ForgeSEOMetadataKey.robots,
            value: 'robots text',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.seo,
            key: ForgeSEOMetadataKey.image,
            value: 'https://myimage-url',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.socials,
            key: ForgeSocialsMetadataKey.twitter_id,
            value: 'Twitter Id',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.socials,
            key: ForgeSocialsMetadataKey.fb_app_id,
            value: '123456',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.socials,
            key: ForgeSocialsMetadataKey.fb_pages,
            value: 'fbpages',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.languages,
            key: ForgeLanguagesMetadataKey.en_gb_culture,
            value: 'en-GB',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.languages,
            key: ForgeLanguagesMetadataKey.en_gb_url,
            value: 'https://mywebsite-url',
            type: 'string',
          },
          {
            category: ForgeMetadataCategoryType.languages,
            key: ForgeLanguagesMetadataKey.en_gb_voc_tag,
            value: 'lang-en-gb',
            type: 'string',
          },
        ],
      },
    };

    // ACT
    const metadata = getMetadataGroup(pageStructure.data.metadata, ForgeMetadataCategoryType.languages);

    // ASSERT
    expect(metadata).toHaveLength(3);
  });
});

describe('getMetadataGroup function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the correct metadata content with category and key', async () => {
    // ARRANGE
    const pageStructure = {
      data: {
        metadata: [
          {
            category: ForgeMetadataCategoryType.seo,
            key: ForgeSEOMetadataKey.title,
            value: 'My title',
            type: 'string',
          },
        ],
      },
    };
    (getPageStructure as jest.Mock).mockResolvedValueOnce(pageStructure);

    // ACT
    const result = getMetadata(pageStructure.data.metadata, ForgeMetadataCategoryType.seo, ForgeSEOMetadataKey.title);
    // ASSERT
    expect(result?.value).toBe('My title');
  });

  it('should return undefined when the metadata category/key is missing', async () => {
    // ARRANGE
    const pageStructure = {
      data: {
        metadata: [
          {
            category: ForgeMetadataCategoryType.seo,
            key: ForgeSEOMetadataKey.title,
            value: 'My title',
            type: 'string',
          },
        ],
      },
    };
    (getPageStructure as jest.Mock).mockResolvedValueOnce(pageStructure);

    // ACT
    const result = getMetadata(
      pageStructure.data.metadata,
      ForgeMetadataCategoryType.seo,
      ForgeSEOMetadataKey.description
    );
    // ASSERT
    expect(result?.value).toBeUndefined();
  });

  it('should return null when the metadata is null', async () => {
    // ARRANGE
    const pageStructure = {
      data: {
        metadata: null,
      },
    };
    (getPageStructure as jest.Mock).mockResolvedValueOnce(pageStructure);

    // ACT
    const result = getMetadata(
      pageStructure.data.metadata,
      ForgeMetadataCategoryType.seo,
      ForgeSEOMetadataKey.description
    );
    // ASSERT
    expect(result).toBe(null);
  });
});
