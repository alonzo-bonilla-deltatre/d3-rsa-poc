import { enrichEntitiesWithThumbnailPlaceholder } from './liveBloggingBlogEntityHelper';
import { Variable } from '@/models/types/pageStructure';
import { sampleBlog } from '@/__mocks__/entities/sampleLiveblogging';

describe('enrichEntitiesWithThumbnailPlaceholder', () => {
  // ARRANGE
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
    // ACT
    const enrichedItems = enrichEntitiesWithThumbnailPlaceholder(
      [{ ...sampleBlog, coverImage: undefined }],
      mockVariables
    );
    // ASSERT
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
    // ARRANGE
    const existingImage = {
      title: 'no_image_available',
      templateUrl: 'https://example.com/placeholder.png',
      format: '',
      slug: 'no_image_available',
    };
    // ACT
    const enrichedItems = enrichEntitiesWithThumbnailPlaceholder(
      [{ ...sampleBlog, coverImage: existingImage }],
      mockVariables
    );
    // ASSERT
    expect(enrichedItems[0].coverImage).toEqual(existingImage);
  });

  it('returns empty array when provided with null items', () => {
    // ACT
    const enrichedItems = enrichEntitiesWithThumbnailPlaceholder(null, mockVariables);
    // ASSERT
    expect(enrichedItems).toEqual([]);
  });

  it('uses default placeholder when variables are undefined', () => {
    // ACT
    const enrichedItems = enrichEntitiesWithThumbnailPlaceholder([{ ...sampleBlog, coverImage: undefined }]);
    // ASSERT
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
