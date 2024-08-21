import { getPageStructure } from '@/services/pageService';
import { ManifestResponse } from '@/models/types/manifest';
import { PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH } from '@/utilities/constsUtility';
import { getManifestJson } from './manifestService';
import { ForgeMetadataCategoryType, ForgePwaMetadataKey } from '@/models/types/forge';

// Mocking the getPageStructure function
jest.mock('@/services/pageService', () => ({
  getPageStructure: jest.fn(),
}));

describe('getManifestJson', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return null if pageStructure is not available', async () => {
    // ARRANGE
    const basePath = process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH;
    delete process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH;
    (getPageStructure as jest.Mock).mockResolvedValueOnce(null);

    // ACT
    const result = await getManifestJson();

    // ASSERT
    expect(result).toBeNull();
    expect(getPageStructure).toHaveBeenCalledWith(PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH);
    process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH = basePath;
  });

  it('should not add properties to the response if metadata category is not "pwa"', async () => {
    // ARRANGE
    const mockPageStructure = {
      data: {
        metadata: [{ category: ForgeMetadataCategoryType.seo, key: 'siteName', value: 'Mu Website' }],
      },
    };

    (getPageStructure as jest.Mock).mockResolvedValueOnce(mockPageStructure);

    // ACT
    const result = await getManifestJson();

    // ASSERT
    expect(getPageStructure).toHaveBeenCalledWith(process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH);
    expect(result).toBeDefined();
    expect(result?.name).toBe('');
    expect(result?.short_name).toBeUndefined();
    expect(result?.start_url).toBeUndefined();
    expect(result?.display).toBeUndefined();
    expect(result?.background_color).toBeUndefined();
    expect(result?.theme_color).toBeUndefined();
    expect(result?.scope).toBeUndefined();
    expect(result!.related_applications).toEqual([]);
    expect(result!.icons).toEqual([]);
  });

  it('should not add iosApp and androidApp to related_applications if both id and url are missing', async () => {
    // ARRANGE
    const mockPageStructure = {
      data: {
        metadata: [
          { category: ForgeMetadataCategoryType.pwa, key: ForgePwaMetadataKey.ios_store_url, value: undefined },
          { category: ForgeMetadataCategoryType.pwa, key: ForgePwaMetadataKey.ios_app_id, value: undefined },
          {
            category: ForgeMetadataCategoryType.pwa,
            key: ForgePwaMetadataKey.android_play_store_url,
            value: undefined,
          },
          { category: ForgeMetadataCategoryType.pwa, key: ForgePwaMetadataKey.android_play_store_id, value: undefined },
        ],
      },
    };

    (getPageStructure as jest.Mock).mockResolvedValueOnce(mockPageStructure);

    // ACT
    const result = await getManifestJson();

    // ASSERT
    expect(getPageStructure).toHaveBeenCalledWith(process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH);
    expect(result).toBeDefined();
    expect(result!.related_applications).toEqual([]);
  });

  it('should add iosApp to related_applications if either id or url is provided', async () => {
    // ARRANGE
    const mockPageStructure = {
      data: {
        metadata: [
          {
            category: ForgeMetadataCategoryType.pwa,
            key: ForgePwaMetadataKey.ios_store_url,
            value: 'https://itunes.apple.com/app/my-app/id123456789',
          },
          { category: ForgeMetadataCategoryType.pwa, key: ForgePwaMetadataKey.ios_app_id, value: undefined },
        ],
      },
    };

    (getPageStructure as jest.Mock).mockResolvedValueOnce(mockPageStructure);

    // ACT
    const result = await getManifestJson();

    // ASSERT
    expect(getPageStructure).toHaveBeenCalledWith(process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH);
    expect(result).toBeDefined();
    expect(result?.related_applications).toEqual([
      {
        platform: 'itunes',
        url: 'https://itunes.apple.com/app/my-app/id123456789',
      },
    ]);
  });

  it('should add androidApp to related_applications if either id or url is provided', async () => {
    // ARRANGE
    const mockPageStructure = {
      data: {
        metadata: [
          {
            category: ForgeMetadataCategoryType.pwa,
            key: ForgePwaMetadataKey.android_play_store_url,
            value: undefined,
          },
          {
            category: ForgeMetadataCategoryType.pwa,
            key: ForgePwaMetadataKey.android_play_store_id,
            value: 'com.example.app',
          },
        ],
      },
    };

    (getPageStructure as jest.Mock).mockResolvedValueOnce(mockPageStructure);

    // ACT
    const result = await getManifestJson();

    // ASSERT
    expect(getPageStructure).toHaveBeenCalledWith(process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH);
    expect(result).toBeDefined();
    expect(result?.related_applications).toEqual([
      {
        platform: 'play',
        id: 'com.example.app',
      },
    ]);
  });

  it('should not add icon to manifestResponse if item value is not defined', async () => {
    // ARRANGE
    const mockPageStructure = {
      data: {
        metadata: [{ category: ForgeMetadataCategoryType.pwa, key: ForgePwaMetadataKey.icon, value: undefined }],
      },
    };

    (getPageStructure as jest.Mock).mockResolvedValueOnce(mockPageStructure);

    // ACT
    const result = await getManifestJson();

    // ASSERT
    expect(getPageStructure).toHaveBeenCalledWith(process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH);
    expect(result?.icons).toEqual([]);
  });

  it('should return the manifestResponse with valid data', async () => {
    // ARRANGE
    const mockPageStructure = {
      data: {
        metadata: [
          { category: ForgeMetadataCategoryType.pwa, key: ForgePwaMetadataKey.name, value: 'My App' },
          { category: ForgeMetadataCategoryType.pwa, key: ForgePwaMetadataKey.short_name, value: 'My Short App' },
          { category: ForgeMetadataCategoryType.pwa, key: ForgePwaMetadataKey.start_url, value: '/home' },
          { category: ForgeMetadataCategoryType.pwa, key: ForgePwaMetadataKey.display, value: 'standalone' },
          { category: ForgeMetadataCategoryType.pwa, key: ForgePwaMetadataKey.background_color, value: '#ffffff' },
          { category: ForgeMetadataCategoryType.pwa, key: ForgePwaMetadataKey.theme_color, value: '#000000' },
          { category: ForgeMetadataCategoryType.pwa, key: ForgePwaMetadataKey.scope, value: '/' },
          { category: ForgeMetadataCategoryType.pwa, key: ForgePwaMetadataKey.icon, value: '/path/to/icon.svg' },
          {
            category: ForgeMetadataCategoryType.pwa,
            key: ForgePwaMetadataKey.android_play_store_url,
            value: 'https://play.google.com/store/apps/details?id=com.example.app',
          },
          {
            category: ForgeMetadataCategoryType.pwa,
            key: ForgePwaMetadataKey.android_play_store_id,
            value: 'com.example.app',
          },
          {
            category: ForgeMetadataCategoryType.pwa,
            key: ForgePwaMetadataKey.ios_store_url,
            value: 'https://itunes.apple.com/app/my-app/id123456789',
          },
          { category: ForgeMetadataCategoryType.pwa, key: ForgePwaMetadataKey.ios_app_id, value: '123456789' },
        ],
      },
    };

    (getPageStructure as jest.Mock).mockResolvedValueOnce(mockPageStructure);

    const expectedResponse: ManifestResponse = {
      name: 'My App',
      short_name: 'My Short App',
      start_url: '/home',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#000000',
      scope: '/',
      icons: [
        {
          src: '/path/to/icon.svg',
          sizes: '72x72 96x96 128x128 256x256',
          type: 'svg',
        },
      ],
      related_applications: [
        {
          platform: 'itunes',
          url: 'https://itunes.apple.com/app/my-app/id123456789',
          id: '123456789',
        },
        {
          platform: 'play',
          url: 'https://play.google.com/store/apps/details?id=com.example.app',
          id: 'com.example.app',
        },
      ],
    };

    // ACT
    const result = await getManifestJson();

    // ASSERT
    expect(getPageStructure).toHaveBeenCalledWith(process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH);
    expect(result).toEqual(expect.objectContaining(expectedResponse));
  });
});
