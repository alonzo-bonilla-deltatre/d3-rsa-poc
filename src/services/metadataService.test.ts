import { getMetadata, setPageMetadata } from '@/services/metadataService';
import { getPageStructure } from './pageService';

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
  it('returns null if metadata list is null', (): void => {
    const metadata = setPageMetadata(null);

    expect(metadata).toBeNull();
  });
  it('should return the correct metadata content when title & desc data is missing', () => {
    // ARRANGE
    const pageStructure = {
      data: {
        metadata: [],
      },
    };
    (getPageStructure as jest.Mock).mockResolvedValueOnce(pageStructure);

    // ACT
    const result = setPageMetadata(pageStructure.data.metadata);

    // ASSERT
    expect(result?.title).toBe('');
    expect(result?.description).toBe('');
  });
  it('should return the correct metadata content when some data is missing', () => {
    // ARRANGE
    const pageStructure = {
      data: {
        metadata: [
          {
            category: 'seo',
            key: 'title',
            value: 'My title',
            type: 'string',
          },
          {
            category: 'seo',
            key: 'description',
            value: 'My description',
            type: 'string',
          },
        ],
      },
    };
    (getPageStructure as jest.Mock).mockResolvedValueOnce(pageStructure);

    // ACT
    const result = setPageMetadata(pageStructure.data.metadata);

    // ASSERT
    expect(result?.title).toBe('My title');
    expect(result?.description).toBe('My description');
    expect(result?.authors).toBeNull();
    expect(result?.twitter?.title).toBe('My title');
    expect(result?.twitter?.description).toBe('My description');
    expect(result?.twitter?.site).toBe('');
    expect(result?.twitter?.creator).toBe('');
    expect(result?.twitter?.images).toBe('');
    expect(result?.openGraph?.url).toBe('');
    expect(result?.openGraph?.title).toBe('My title');
    expect(result?.openGraph?.description).toBe('My description');
    expect(result?.openGraph?.siteName).toBe('');
    expect(result?.openGraph?.images).toBe('');
    expect(result?.openGraph?.locale).toBe(process.env.CULTURE);
    expect(result?.openGraph?.url).toBe('');
    expect(result?.metadataBase).toBeNull();
    expect(result?.robots).toBe('noodp');
    expect(result?.other).toBeUndefined();
    expect(result?.alternates?.canonical).toBe('');
    // @ts-ignore
    expect('en-GB' in result?.alternates?.languages).toBeTruthy();
  });
  it('should return the correct metadata content when all data has populated', async () => {
    // ARRANGE
    const pageStructure = {
      data: {
        metadata: [
          {
            category: 'seo',
            key: 'title',
            value: 'My title',
            type: 'string',
          },
          {
            category: 'seo',
            key: 'description',
            value: 'My description',
            type: 'string',
          },
          {
            category: 'seo',
            key: 'sitename',
            value: 'site-name',
            type: 'string',
          },
          {
            category: 'seo',
            key: 'robots',
            value: 'robots text',
            type: 'string',
          },
          {
            category: 'seo',
            key: 'image',
            value: 'https://myimage-url',
            type: 'string',
          },
          {
            category: 'config',
            key: 'vanityUrl',
            value: 'https://mywebsite-url',
            type: 'string',
          },
          {
            category: 'socials',
            key: 'twitterid',
            value: 'Twitter Id',
            type: 'string',
          },
          {
            category: 'socials',
            key: 'fbappid',
            value: '123456',
            type: 'string',
          },
          {
            category: 'socials',
            key: 'fbpages',
            value: 'fbpages',
            type: 'string',
          },
        ],
      },
    };
    (getPageStructure as jest.Mock).mockResolvedValueOnce(pageStructure);

    // ACT
    const result = await setPageMetadata(pageStructure.data.metadata);

    // ASSERT
    expect(result?.title).toBe('My title');
    expect(result?.description).toBe('My description');
    expect(result?.authors.url).toBe('https://mywebsite-url');
    expect(result?.authors.name).toBe('site-name');
    expect(result?.twitter?.title).toBe('My title');
    expect(result?.twitter?.description).toBe('My description');
    expect(result?.twitter?.card).toBe('summary_large_image');
    expect(result?.twitter?.site).toBe('Twitter Id');
    expect(result?.twitter?.creator).toBe('Twitter Id');
    expect(result?.twitter?.images).toBe('https://myimage-url');
    expect(result?.openGraph.type).toBe('website');
    expect(result?.openGraph.title).toBe('My title');
    expect(result?.openGraph.description).toBe('My description');
    expect(result?.openGraph.siteName).toBe('site-name');
    expect(result?.openGraph.images).toBe('https://myimage-url');
    expect(result?.openGraph.locale).toBe(process.env.CULTURE);
    expect(result?.openGraph.url).toBe('https://mywebsite-url');
    expect(result?.robots).toBe('robots text');
    expect(result?.metadataBase).toStrictEqual(new URL('https://mywebsite-url/'));
    expect(result?.other['fb:pages']).toBe('fbpages');
    expect(result?.alternates.canonical).toBe('https://mywebsite-url');
  });
});

describe('getMetadata function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns null if metadata is null', async (): Promise<void> => {
    const metadata = getMetadata(null, '', '');

    expect(metadata).toBeNull();
  });

  it('should return the correct metadata content with category and key', async () => {
    // ARRANGE
    const pageStructure = {
      data: {
        metadata: [
          {
            category: 'seo',
            key: 'title',
            value: 'My title',
            type: 'string',
          },
        ],
      },
    };
    (getPageStructure as jest.Mock).mockResolvedValueOnce(pageStructure);

    // ACT
    const result = getMetadata(pageStructure.data.metadata, 'seo', 'title');
    // ASSERT
    expect(result?.value).toBe('My title');
  });

  it('should return undefined when the metadata category/key is missing', async () => {
    // ARRANGE
    const pageStructure = {
      data: {
        metadata: [
          {
            category: 'seo',
            key: 'title',
            value: 'My title',
            type: 'string',
          },
        ],
      },
    };
    (getPageStructure as jest.Mock).mockResolvedValueOnce(pageStructure);

    // ACT
    const result = getMetadata(pageStructure.data.metadata, 'seo', 'description');
    // ASSERT
    expect(result?.value).toBeUndefined();
  });
});
