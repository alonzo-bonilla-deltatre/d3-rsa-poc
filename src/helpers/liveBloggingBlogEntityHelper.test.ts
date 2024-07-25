import { enrichEntitiesWithThumbnailPlaceholder } from './liveBloggingBlogEntityHelper';
import { Variable } from '@/models/types/pageStructure';
import { sampleBlog } from '@/__mocks__/entities/sampleLiveblogging';

describe('enrichEntitiesWithThumbnailPlaceholder', () => {
  const mockVariables: Variable[] = [
    {
      key: 'image_placeholder',
      type: 'type',
      keyValue: {
        valueType: 'string',
        value: 'https://example.com/placeholder.png',
      },
    },
  ];

  it('adds placeholder to entities without a cover image', () => {
    const enrichedItems = enrichEntitiesWithThumbnailPlaceholder(
      [{ ...sampleBlog, coverImage: undefined }],
      mockVariables
    );
    enrichedItems.forEach((item) => {
      expect(item.coverImage).toEqual({
        title: 'no_image_available',
        templateUrl: 'https://example.com/placeholder.png',
        format: '',
        slug: 'no_image_available',
      });
    });
  });

  it('does not modify entities with an existing cover image', () => {
    const existingImage = {
      title: 'no_image_available',
      templateUrl: 'https://example.com/placeholder.png',
      format: '',
      slug: 'no_image_available',
    };
    const enrichedItems = enrichEntitiesWithThumbnailPlaceholder(
      [{ ...sampleBlog, coverImage: existingImage }],
      mockVariables
    );
    expect(enrichedItems[0].coverImage).toEqual(existingImage);
  });

  it('returns empty array when provided with null items', () => {
    const enrichedItems = enrichEntitiesWithThumbnailPlaceholder(null, mockVariables);
    expect(enrichedItems).toEqual([]);
  });

  it('uses default placeholder when variables are undefined', () => {
    const enrichedItems = enrichEntitiesWithThumbnailPlaceholder([{ ...sampleBlog, coverImage: undefined }]);
    enrichedItems.forEach((item) => {
      expect(item.coverImage).toEqual({
        format: '',
        slug: 'no_image_available',
        templateUrl: '',
        title: 'no_image_available',
      });
    });
  });
});
