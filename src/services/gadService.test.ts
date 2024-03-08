import axios from 'axios';
import {
  firstAssetOrDefault,
  getAssetsByTag,
  getImageOrPlaceholder,
  getPlaceholderAsset,
  getPlaceholderImage,
  getSingleAssetByTag,
} from '@/services/gadService';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import { sampleAsset } from '@/__mocks__/components/sampleGadAsset';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { IMAGE_PLACEHOLDER } from '@/utilities/consts';
import { ForgeEntityCode } from '@/models/types/forge';

const tag = ForgeEntityCode.tag;

jest.mock('axios');
jest.mock('@/utilities/logger');

describe('gadService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  describe('getAssetsByTag', () => {
    it('should call with empty value and return null', async () => {
      // ASSERT
      (axios.get as jest.Mock).mockResolvedValue({});

      // ACT
      const result = await getAssetsByTag('');

      // ASSERT
      expect(result).toBeNull();
    });

    it('should return null in case of exception for empty url and return null', async () => {
      // ASSERT
      const apiUrl = process.env.GRAPHIC_ASSETS_DASHBOARD_API_BASE_URL;
      process.env.GRAPHIC_ASSETS_DASHBOARD_API_BASE_URL = undefined;

      // ACT
      const result = await getAssetsByTag('test');

      // ASSERT
      expect(result).toBeNull();
      expect(logger.log as jest.Mock).toHaveBeenCalledWith(expect.stringMatching('GAD API Error'), LoggerLevel.error);
      process.env.GRAPHIC_ASSETS_DASHBOARD_API_BASE_URL = apiUrl;
    });

    it('should call the right API URL', async () => {
      // ASSERT
      (axios.get as jest.Mock).mockResolvedValue({});

      // ACT
      await getAssetsByTag(tag);

      // ASSERT
      expect(axios.get as jest.Mock).toHaveBeenCalledWith(
        `${process.env.GRAPHIC_ASSETS_DASHBOARD_API_BASE_URL}/api/assets/tag?tags=${tag}`
      );
    });

    it('should return gad image array with first item if tag is present', async () => {
      // ASSERT
      (axios.get as jest.Mock).mockResolvedValue(sampleAsset);

      // ACT
      const result = await getAssetsByTag(tag);

      // ASSERT
      expect(result?.[0]?.name).not.toBeNull();
      expect(result?.[0]?.publicId).not.toBeNull();
      expect(result?.[0]?.assetUrl).not.toBeNull();
      expect(result?.[0]?.assetOriginalUrl).not.toBeNull();
      expect(result?.[0]?.assetThumbnailUrl).not.toBeNull();
    });

    it('should return null in case of exception', async () => {
      // ASSERT
      (axios.get as jest.Mock).mockRejectedValueOnce({});

      // ACT
      const result = await getAssetsByTag(tag);

      // ASSERT
      expect(result).toBeNull();
    });

    it('should return null in case of exception and log the response data if available', async () => {
      // ASSERT
      const errorMessage = 'Unauthorized';
      (axios.get as jest.Mock).mockRejectedValueOnce({
        status: 401,
        statusText: 'Unauthorized',
        data: {
          error: { message: errorMessage },
        },
      });

      // ACT
      const result = await getAssetsByTag(tag);

      // ASSERT
      expect(result).toBeNull();
      expect(logger.log as jest.Mock).toHaveBeenCalledWith(expect.stringMatching(errorMessage), LoggerLevel.error);
    });
  });

  describe('getSingleAssetByTag', () => {
    const gadAssetsResponse = [
      {
        name: 'Item 1',
        publicId: 'public-id-1',
        resourceType: 'image',
        type: 'asset',
        format: 'jpg',
        tags: ['tag1', 'tag2'],
        assetUrl: 'https://example.com/item1.jpg',
        assetThumbnailUrl: 'https://example.com/item1-thumbnail.jpg',
        assetOriginalUrl: 'https://example.com/item1-original.jpg',
        assetOriginalCdnUrl: 'https://example.com/item1-original-cdn.jpg',
      },
      {
        name: 'Item 2',
        publicId: 'public-id-2',
        resourceType: 'image',
        type: 'asset',
        format: 'png',
        tags: ['tag3', 'tag4'],
        width: 1200,
        height: 900,
        length: 2048,
        assetUrl: 'https://example.com/item2.png',
        assetThumbnailUrl: 'https://example.com/item2-thumbnail.png',
        assetOriginalUrl: 'https://example.com/item2-original.png',
        assetOriginalCdnUrl: 'https://example.com/item2-original-cdn.png',
      },
    ];
    it('should call with default value', async () => {
      // ARRANGE
      (axios.get as jest.Mock).mockResolvedValue({ data: gadAssetsResponse });

      // ACT
      const result = await getSingleAssetByTag();

      // ASSERT
      expect(result).toBe(null);
    });
    it('should return null if tag is empty', async () => {
      // ARRANGE
      (axios.get as jest.Mock).mockResolvedValue({ data: gadAssetsResponse });

      // ACT
      const result = await getSingleAssetByTag('');

      // ASSERT
      expect(result).toBe(null);
    });
    it('should call getAssetsByTag', async () => {
      // ARRANGE
      (axios.get as jest.Mock).mockResolvedValue({ data: gadAssetsResponse });

      // ACT
      const result = await getSingleAssetByTag('tag1');

      // ASSERT
      expect(axios.get as jest.Mock).toHaveBeenCalledWith(
        `${process.env.GRAPHIC_ASSETS_DASHBOARD_API_BASE_URL}/api/assets/tag?tags=tag1`
      );

      // ASSERT
      expect(result?.assetThumbnailUrl).toBe('https://example.com/item1-thumbnail.jpg');
    });
  });

  describe('firstAssetOrDefault', () => {
    it('should return null if assets is null or empty', () => {
      // ACT
      const nullResponse = firstAssetOrDefault(null);
      const emptyResponse = firstAssetOrDefault([]);

      // ASSERT
      expect(nullResponse).toBeNull();
      expect(emptyResponse).toBeNull();
    });

    it('should return the first item if assets are valid', () => {
      // ACT
      const mockResponse: GraphicAssetsDashboardItem[] = [
        {
          name: 'Item 1',
          publicId: 'public-id-1',
          resourceType: 'image',
          type: 'asset',
          format: 'jpg',
          tags: ['tag1', 'tag2'],
          tagsInString: 'tag1, tag2',
          created: '2023-06-30',
          uploaded: '2023-06-30',
          width: 800,
          height: 600,
          length: 1024,
          assetUrl: 'https://example.com/item1.jpg',
          assetThumbnailUrl: 'https://example.com/item1-thumbnail.jpg',
          assetOriginalUrl: 'https://example.com/item1-original.jpg',
          assetOriginalCdnUrl: 'https://example.com/item1-original-cdn.jpg',
          version: 'v1',
          imageMetadata: null,
          context: null,
          imageAnalysis: null,
          path: 'path/to/item1.jpg',
          pathWithFormat: 'path/to/item1.jpg.jpg',
          templatedPath: 'path/to/item1-{format}.jpg',
          templatedPathWithFormat: 'path/to/item1-jpg.jpg',
        },
        {
          name: 'Item 2',
          publicId: 'public-id-2',
          resourceType: 'image',
          type: 'asset',
          format: 'png',
          tags: ['tag3', 'tag4'],
          tagsInString: 'tag3, tag4',
          created: '2023-06-30',
          uploaded: '2023-06-30',
          width: 1200,
          height: 900,
          length: 2048,
          assetUrl: 'https://example.com/item2.png',
          assetThumbnailUrl: 'https://example.com/item2-thumbnail.png',
          assetOriginalUrl: 'https://example.com/item2-original.png',
          assetOriginalCdnUrl: 'https://example.com/item2-original-cdn.png',
          version: 'v1',
          imageMetadata: null,
          context: null,
          imageAnalysis: null,
          path: 'path/to/item2.png',
          pathWithFormat: 'path/to/item2.png.png',
          templatedPath: 'path/to/item2-{format}.png',
          templatedPathWithFormat: 'path/to/item2-png.png',
        },
      ];

      const result = firstAssetOrDefault(mockResponse);

      // ASSERT
      expect(result?.assetThumbnailUrl).toBe('https://example.com/item1-thumbnail.jpg');
    });
  });

  describe('getPlaceholderAsset', () => {
    it('should get the placeholder image with a default IMAGE_PLACEHOLDER tag without parameter', async () => {
      // ARRANGE
      (axios.get as jest.Mock).mockResolvedValue({ data: {} });

      // ACT
      await getPlaceholderAsset();

      // ASSERT
      expect(axios.get as jest.Mock).toHaveBeenCalledWith(
        `${process.env.GRAPHIC_ASSETS_DASHBOARD_API_BASE_URL}/api/assets/tag?tags=${IMAGE_PLACEHOLDER}`
      );
    });
    it('should get the placeholder image with a default IMAGE_PLACEHOLDER tag', async () => {
      // ARRANGE
      (axios.get as jest.Mock).mockResolvedValue({ data: {} });

      // ACT
      await getPlaceholderAsset('');

      // ASSERT
      expect(axios.get as jest.Mock).toHaveBeenCalledWith(
        `${process.env.GRAPHIC_ASSETS_DASHBOARD_API_BASE_URL}/api/assets/tag?tags=${IMAGE_PLACEHOLDER}`
      );
    });

    it('should get the placeholder image with a custom placeholder tag', async () => {
      // ARRANGE
      (axios.get as jest.Mock).mockResolvedValue({ data: {} });

      // ACT
      await getPlaceholderAsset('custom_image_placeholder');

      // ASSERT
      expect(axios.get as jest.Mock).toHaveBeenCalledWith(
        `${process.env.GRAPHIC_ASSETS_DASHBOARD_API_BASE_URL}/api/assets/tag?tags=custom_image_placeholder`
      );
    });
  });

  describe('getImageOrPlaceholder', () => {
    it('should return placeholder image if image has templateUrl', async () => {
      // ARRANGE
      (axios.get as jest.Mock).mockResolvedValue({ data: [] });

      const image = {
        title: 'Image',
        format: 'png',
        slug: 'image',
        templateUrl:
          'https://res.cloudinary.com/d3/image/private/{formatInstructions}/my-project-dev/ubdlo9fibzdlvp8wckxb',
      };

      // ACT
      await getImageOrPlaceholder(image, 'placeholder_tag');

      // ASSERT
      // ASSERT
      expect(axios.get as jest.Mock).toHaveBeenCalledWith(
        `${process.env.GRAPHIC_ASSETS_DASHBOARD_API_BASE_URL}/api/assets/tag?tags=placeholder_tag`
      );
    });

    it('should return placeholder image if image does not have templateUrl', async () => {
      // ARRANGE
      (axios.get as jest.Mock).mockResolvedValue({ data: [] });

      const image = {
        title: 'Image',
        format: 'png',
        slug: 'image',
        templateUrl: '',
      };

      // ACT
      const result = await getImageOrPlaceholder(image, 'placeholder_tag');

      // ASSERT
      expect(axios.get as jest.Mock).not.toBeCalled();
      expect(result).toBe(image);
    });
  });

  describe('getPlaceholderImage', () => {
    it('should return null if getPlaceholderAsset return null', async () => {
      // ARRANGE
      (axios.get as jest.Mock).mockResolvedValue({ data: null });

      // ACT
      const result = await getPlaceholderImage('placeholder_tag');

      // ASSERT
      expect(result).toBeNull();
    });

    it('should try to convert the asset to an ImageAsset', async () => {
      // ARRANGE
      (axios.get as jest.Mock).mockResolvedValue({
        data: [
          {
            name: 'Item 1',
            publicId: 'public-id-1',
            resourceType: 'image',
            type: 'asset',
            format: 'jpg',
            tags: ['tag1', 'tag2'],
            tagsInString: 'tag1, tag2',
            created: '2023-06-30',
            uploaded: '2023-06-30',
            width: 800,
            height: 600,
            length: 1024,
            assetUrl: 'https://example.com/item1.jpg',
            assetThumbnailUrl: 'https://example.com/item1-thumbnail.jpg',
            assetOriginalUrl: 'https://example.com/item1-original.jpg',
            assetOriginalCdnUrl: 'https://example.com/item1-original-cdn.jpg',
            version: 'v1',
            imageMetadata: null,
            context: null,
            imageAnalysis: null,
            path: 'path/to/item1.jpg',
            pathWithFormat: 'path/to/item1.jpg.jpg',
            templatedPath: 'path/to/item1-{format}.jpg',
            templatedPathWithFormat: 'path/to/item1-jpg.jpg',
          },
        ],
      });

      // ACT
      const result = await getPlaceholderImage('placeholder_tag');

      // ASSERT
      expect(result?.title).not.toBeNull();
      expect(result?.templateUrl).not.toBeNull();
      expect(result?.format).not.toBeNull();
    });

    it('should return null if assetUrl is not available in the asset response', async () => {
      // ARRANGE
      (axios.get as jest.Mock).mockResolvedValue({
        data: [
          {
            name: 'Item 1',
            publicId: 'public-id-1',
            resourceType: 'image',
            type: 'asset',
            format: 'jpg',
            tags: ['tag1', 'tag2'],
            tagsInString: 'tag1, tag2',
            created: '2023-06-30',
            uploaded: '2023-06-30',
            width: 800,
            height: 600,
            length: 1024,
          },
        ],
      });

      // ACT
      const result = await getPlaceholderImage('placeholder_tag');

      // ASSERT
      expect(result).toBeNull();
    });
  });
});
