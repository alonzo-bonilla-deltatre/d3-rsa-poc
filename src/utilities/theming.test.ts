import { Metadata } from '@/models/types/pageStructure';
import { renderThemingVariables } from '@/utilities/theming';
import { ForgeMetadataCategoryType, ForgeSEOMetadataKey, ForgeThemingMetadataKey } from '@/models/types/forge';

describe('renderThemingVariables', () => {
  it('should render theming variables CSS string', () => {
    // ARRANGE
    const items = [
      {
        category: ForgeMetadataCategoryType.theming,
        key: ForgeThemingMetadataKey.colorPrimary,
        value: '#ff0000',
        type: 'string',
      },
      {
        category: ForgeMetadataCategoryType.theming,
        key: ForgeThemingMetadataKey.colorSecondary,
        value: '#00ff00',
        type: 'string',
      },
      { category: ForgeMetadataCategoryType.seo, key: ForgeSEOMetadataKey.title, value: 'some-value', type: 'string' },
    ];

    const expectedCSS = `:root{ --poc-theme-color-primary: #ff0000; --poc-theme-color-secondary: #00ff00; }`;

    // ACT
    const result = renderThemingVariables(items);

    // ASSERT
    expect(result).toBe(expectedCSS);
  });

  it('should handle empty items array', () => {
    // ARRANGE
    const items: Metadata[] = [];

    const expectedCSS = `:root{  }`;

    // ACT
    const result = renderThemingVariables(items);

    // ASSERT
    expect(result).toBe(expectedCSS);
  });

  it('should handle items array with non-theming items', () => {
    // ARRANGE
    const items = [
      { category: ForgeMetadataCategoryType.seo, key: ForgeSEOMetadataKey.title, value: 'some-value', type: 'string' },
      {
        category: ForgeMetadataCategoryType.seo,
        key: ForgeSEOMetadataKey.description,
        value: 'another-value',
        type: 'string',
      },
    ];

    const expectedCSS = `:root{  }`;

    // ACT
    const result = renderThemingVariables(items);

    // ASSERT
    expect(result).toBe(expectedCSS);
  });
});
