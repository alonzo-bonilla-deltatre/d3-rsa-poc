import { getDescriptionField } from '@/utilities/descriptionFieldUtility';
import { DistributionEntity } from '@/models/types/forge';
import { sampleStory } from '@/__mocks__/entities/story';
import { sampleAlbum } from '@/__mocks__/entities/sampleAlbum';
import { sampleBlog } from '@/__mocks__/entities/sampleLiveblogging';

describe('getDescriptionField', () => {
  it('returns description when description is present in DistributionEntity', () => {
    expect(getDescriptionField(sampleAlbum)).toBe(sampleAlbum.description);
  });

  it('returns description when description is present in LiveBloggingBlogEntity', () => {
    expect(getDescriptionField(sampleBlog)).toBe(sampleBlog.description);
  });

  it('returns headline when description is not present but headline is', () => {
    expect(getDescriptionField(sampleStory)).toBe(sampleStory.headline);
  });

  it('returns description from fields when description and headline are not present but fields.description is', () => {
    const entity: DistributionEntity = {
      ...sampleStory,
      headline: undefined,
      fields: { description: 'test fields description' },
    };
    expect(getDescriptionField(entity)).toBe('test fields description');
  });

  it('returns empty string when description, headline and fields.description are not present', () => {
    const entity: DistributionEntity = { ...sampleStory, headline: undefined };
    expect(getDescriptionField(entity)).toBe('');
  });

  it('returns empty string when entity is null', () => {
    expect(getDescriptionField(null as any)).toBe('');
  });
});
