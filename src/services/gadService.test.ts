import axios from 'axios';
import { getAssetsByTag } from '@/services/gadService';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import { sampleAsset } from '@/__mocks__/components/sampleGadAsset';

const tag = 'tag';

jest.mock('axios');
jest.mock('@/utilities/logger');

describe('getAssetsByTag', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
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
