import { Metadata } from '@/models/types/pageStructure';
import { renderThemingVariables } from './theming';

describe('renderThemingVariables', () => {
  it('should render theming variables CSS string', () => {
    // ARRANGE
    const items = [
      { category: 'theming', key: 'color-primary', value: '#ff0000', type: 'string' },
      { category: 'theming', key: 'color-secondary', value: '#00ff00', type: 'string' },
      { category: 'other', key: 'some-key', value: 'some-value', type: 'string' },
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
      { category: 'other', key: 'some-key', value: 'some-value', type: 'string' },
      { category: 'another-category', key: 'another-key', value: 'another-value', type: 'string' },
    ];

    const expectedCSS = `:root{  }`;

    // ACT
    const result = renderThemingVariables(items);

    // ASSERT
    expect(result).toBe(expectedCSS);
  });
});
