import { getForgeEntity, getForgeEntityList } from '@/app/actions/forge';
import { getEntity, getEntityList } from '@/services/forgeDistributionService';
import { ForgeDapiEntityCode, PagedResult } from '@/models/types/forge';
import { sampleStory } from '@/__mocks__/entities/story';

jest.mock('@/services/forgeDistributionService');

describe('getForgeEntity', () => {
  const slug = 'someSlug';

  it('returns data when getEntity is successful', async () => {
    const mockData = { id: 1, name: 'Entity' };
    (getEntity as jest.Mock).mockResolvedValue(mockData);

    const result = await getForgeEntity(ForgeDapiEntityCode.stories, slug, null);

    expect(result.data).toEqual(mockData);
  });

  it('returns error message when getEntity fails', async () => {
    (getEntity as jest.Mock).mockRejectedValue(new Error('Entity not found'));

    const result = await getForgeEntity(ForgeDapiEntityCode.stories, slug, null);

    expect(result.error).toBe('Entity not found');
  });

  it('returns default error message when getEntity throws a generic error', async () => {
    (getEntity as jest.Mock).mockRejectedValue(new Error());

    const result = await getForgeEntity(ForgeDapiEntityCode.stories, slug, null);

    expect(result.error).toBe('Unable to retrieve data from FORGE. Please try again later.');
  });
});

describe('getForgeEntityList', () => {
  const slug = 'someSlug';

  it('returns data when getEntityList is successful', async () => {
    const mockData: PagedResult = {
      pagination: {
        page: 1,
        maxItems: 1,
      },
      items: [sampleStory],
      meta: { apiVersion: '1.0', generatedAt: '2021-01-01' },
    };
    (getEntityList as jest.Mock).mockResolvedValue(mockData);

    const result = await getForgeEntityList(slug, ForgeDapiEntityCode.stories, null);

    expect(result.data).toEqual(mockData);
  });

  it('returns error message when getEntityList fails', async () => {
    (getEntityList as jest.Mock).mockRejectedValue(new Error('List not found'));

    const result = await getForgeEntityList(slug, ForgeDapiEntityCode.stories, null);

    expect(result.error).toBe('List not found');
  });

  it('returns default error message when getEntityList throws a generic error', async () => {
    (getEntityList as jest.Mock).mockRejectedValue(new Error());

    const result = await getForgeEntityList(slug, ForgeDapiEntityCode.stories, null);

    expect(result.error).toBe('Unable to retrieve data from FORGE. Please try again later.');
  });
});
