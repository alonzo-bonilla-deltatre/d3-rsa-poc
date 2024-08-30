import manifest, { generateStaticParams } from '@/app/manifest';
import { LoggerLevel } from '@/models/types/logger';
import { getManifestJson } from '@/services/manifestService';
import logger from '@/utilities/loggerUtility';

jest.mock('@/services/manifestService');
jest.mock('@/utilities/loggerUtility');

describe('manifest', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return manifest content when getManifestJson returns data', async () => {
    // ARRANGE
    const mockManifestContent = {
      name: 'test',
    };
    (getManifestJson as jest.Mock).mockResolvedValue(mockManifestContent);

    // ACT
    const result = await manifest();

    // ASSERT
    expect(result).toEqual(mockManifestContent);
    expect(logger.log).not.toHaveBeenCalled();
  });

  it('should return null and log an error when getManifestJson returns null', async () => {
    // ARRANGE
    (getManifestJson as jest.Mock).mockResolvedValue(null);

    // ACT
    const result = await manifest();

    // ASSERT
    expect(result).toBeNull();
    expect(logger.log).toHaveBeenCalledWith('No manifest data found!', LoggerLevel.error);
  });
});

describe('manifest generateStaticParams', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return empty array', async () => {
    // ACT
    const result = await generateStaticParams();

    // ASSERT
    expect(result).toEqual([]);
  });
});
