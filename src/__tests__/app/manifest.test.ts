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
    const mockManifestContent = {
      name: 'test',
    };
    (getManifestJson as jest.Mock).mockResolvedValue(mockManifestContent);

    const result = await manifest();

    expect(result).toEqual(mockManifestContent);
    expect(logger.log).not.toHaveBeenCalled();
  });

  it('should return null and log an error when getManifestJson returns null', async () => {
    (getManifestJson as jest.Mock).mockResolvedValue(null);

    const result = await manifest();

    expect(result).toBeNull();
    expect(logger.log).toHaveBeenCalledWith('No manifest data found!', LoggerLevel.error);
  });
});

describe('manifest generateStaticParams', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return empty array', async () => {
    const result = await generateStaticParams();

    expect(result).toEqual([]);
  });
});
