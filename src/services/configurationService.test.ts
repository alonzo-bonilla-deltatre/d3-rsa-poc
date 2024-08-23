import { ForgeLanguagesMetadataKey, ForgeMetadataCategoryType } from '@/models/types/forge';
import { Metadata } from '@/models/types/pageStructure';
import { getMetadataGroup } from '@/services/metadataService';
import {
  getFrontendAllSiteConfiguration,
  getSiteUrl,
  setFrontendAllSiteConfiguration,
} from '@/services/configurationService';
import { getPageStructure } from '@/services/pageService';

jest.mock('@/services/metadataService');
jest.mock('@/services/pageService');

describe('configurationService', () => {
  // ARRANGE
  const metadata: Metadata[] = [
    {
      category: ForgeMetadataCategoryType.languages,
      type: 'string',
      key: ForgeLanguagesMetadataKey.en_gb_culture,
      value: 'en-GB',
    },
    {
      category: ForgeMetadataCategoryType.languages,
      type: 'string',
      key: ForgeLanguagesMetadataKey.en_gb_url,
      value: 'http://example.com/en',
    },
    {
      category: ForgeMetadataCategoryType.languages,
      type: 'string',
      key: ForgeLanguagesMetadataKey.en_gb_voc_tag,
      value: 'English',
    },
    {
      category: ForgeMetadataCategoryType.languages,
      type: 'string',
      key: ForgeLanguagesMetadataKey.fr_fr_culture,
      value: 'fr-FR',
    },
    {
      category: ForgeMetadataCategoryType.languages,
      type: 'string',
      key: ForgeLanguagesMetadataKey.fr_fr_url,
      value: 'http://example.com/fr',
    },
    {
      category: ForgeMetadataCategoryType.languages,
      type: 'string',
      key: ForgeLanguagesMetadataKey.fr_fr_voc_tag,
      value: 'French',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getSiteUrl', () => {
    it('should return the empty URL if the culture is not found', async () => {
      // ARRANGE
      const culture = process.env.CULTURE;
      process.env.CULTURE = 'es-ES';
      (getPageStructure as jest.Mock).mockResolvedValue(null);
      // ACT
      const result = await getSiteUrl();
      // ASSERT
      expect(result).toBe('');
      process.env.CULTURE = culture;
    });

    it('should return the empty URL if the culture is not found and the pb is not set', async () => {
      // ARRANGE
      const basePath = process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH;
      delete process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH;
      const culture = process.env.CULTURE;
      process.env.CULTURE = 'es-ES';
      (getPageStructure as jest.Mock).mockResolvedValue(null);
      // ACT
      const result = await getSiteUrl();
      // ASSERT
      expect(result).toBe('');
      process.env.CULTURE = culture;
      process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH = basePath;
    });

    it('should return the site URL for the current culture', async () => {
      // ARRANGE
      (getPageStructure as jest.Mock).mockResolvedValue({
        data: { metadata },
      });
      (getMetadataGroup as jest.Mock).mockReturnValue(metadata);
      setFrontendAllSiteConfiguration(metadata);
      // ACT
      const result = await getSiteUrl();
      // ASSERT
      expect(result).toBe('http://example.com/en');
    });
  });

  describe('setFrontendAllSiteConfiguration', () => {
    it('should set frontend configuration correctly', () => {
      // ARRANGE
      (getMetadataGroup as jest.Mock).mockReturnValue(metadata);
      // ACT
      const result = setFrontendAllSiteConfiguration(metadata);
      // ASSERT
      expect(result).toEqual([
        { culture: 'en-GB', url: 'http://example.com/en', translation: 'English' },
        { culture: 'fr-FR', url: 'http://example.com/fr', translation: 'French' },
      ]);
    });

    it('should set frontend configuration with empty array value if found the specific metadata without value', () => {
      // ARRANGE
      (getMetadataGroup as jest.Mock).mockReturnValue([
        {
          category: ForgeMetadataCategoryType.languages,
          type: 'string',
          key: ForgeLanguagesMetadataKey.en_gb_culture,
        },
        {
          category: ForgeMetadataCategoryType.languages,
          type: 'string',
          key: ForgeLanguagesMetadataKey.en_gb_url,
        },
        {
          category: ForgeMetadataCategoryType.languages,
          type: 'string',
          key: ForgeLanguagesMetadataKey.en_gb_voc_tag,
        },
      ]);
      // ACT
      const result = setFrontendAllSiteConfiguration(metadata);
      // ASSERT
      expect(result).toEqual([]);
    });

    describe('getFrontendAllSiteConfiguration', () => {
      it('should return the current frontend configuration', () => {
        // ARRANGE
        (getMetadataGroup as jest.Mock).mockReturnValue(metadata);
        setFrontendAllSiteConfiguration(metadata);
        // ACT
        const result = getFrontendAllSiteConfiguration();
        // ASSERT
        expect(result).toEqual({
          allSites: [
            { culture: 'en-GB', url: 'http://example.com/en', translation: 'English' },
            { culture: 'fr-FR', url: 'http://example.com/fr', translation: 'French' },
          ],
        });
      });
    });
  });
});
