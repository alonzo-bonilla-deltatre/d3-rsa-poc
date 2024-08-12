import { Metadata as NextMetadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { Variable } from '@/models/types/pageStructure';
import { handleStorySeoMetadata } from '@/services/moduleSeoMetadataHandlers/storySeoMetadataHandler';
import { getEntity } from '@/services/forgeDistributionService';
import { overrideStoryMetadata } from '@/helpers/metadataHelper';

jest.mock('@/services/forgeDistributionService');
jest.mock('@/helpers/metadataHelper');

describe('handleStorySeoMetadata', () => {
  // ARRANGE
  const seoData: NextMetadata = { title: 'Default Title' };
  const variables: Variable[] = [];

  it('returns original seoData when slug is missing', async () => {
    // ARRANGE
    const properties = {};
    // ACT
    const result = await handleStorySeoMetadata(seoData, properties, variables);
    // ASSERT
    expect(result).toEqual(seoData);
  });

  it('returns enriched seoData when story is found', async () => {
    // ARRANGE
    const properties = { slug: 'story-slug' };
    const story = { id: 'story-id', title: 'Story Title' };
    (getEntity as jest.Mock).mockResolvedValue(story);
    (overrideStoryMetadata as jest.Mock).mockImplementation((seoData, story) => ({ ...seoData, title: story.title }));
    // ACT
    const result = await handleStorySeoMetadata(seoData, properties, variables);
    // ASSERT
    expect(result).toEqual({ ...seoData, title: 'Story Title' });
  });

  it('returns original seoData when story is not found', async () => {
    // ARRANGE
    const properties = { slug: 'story-slug' };
    (getEntity as jest.Mock).mockResolvedValue(null);
    // ACT
    const result = await handleStorySeoMetadata(seoData, properties, variables);
    // ASSERT
    expect(result).toEqual(seoData);
  });
});
