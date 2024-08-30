import { ComponentProps } from '@/models/types/components';
import { moduleIsNotValid } from '@/helpers/moduleHelper';

// ARRANGE
const data = {
  properties: {
    slug: 'slug',
  },
  type: 'module',
  slot: 'main',
} as ComponentProps;
const dataHiddenModule = {
  ...data,
  properties: {
    hideModule: true,
  },
} as ComponentProps;

describe('moduleIsNotValid function', () => {
  it('should return false when is not hidden and has no mandatory fields', () => {
    // ACT
    const result = moduleIsNotValid(data);
    // ASSERT
    expect(result).toBe(false);
  });
  it('should return true when is hidden', () => {
    // ACT
    const result = moduleIsNotValid(dataHiddenModule);
    // ASSERT
    expect(result).toBe(true);
  });
  it('should return true when has empty mandatory fields ', () => {
    // ACT
    const result = moduleIsNotValid(data, ['test']);
    // ASSERT
    expect(result).toBe(true);
  });
  it('should return false when has mandatory fields filled', () => {
    // ACT
    const result = moduleIsNotValid(data, ['slug']);
    // ASSERT
    expect(result).toBe(false);
  });
});
