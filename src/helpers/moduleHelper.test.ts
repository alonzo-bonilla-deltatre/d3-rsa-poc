import { ComponentProps } from '@/models/types/components';
import { moduleIsNotValid } from './moduleHelper';

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
    const result = moduleIsNotValid(data);
    expect(result).toBe(false);
  });
  it('should return true when is hidden', () => {
    const result = moduleIsNotValid(dataHiddenModule);
    expect(result).toBe(true);
  });
  it('should return true when has empty mandatory fields ', () => {
    const result = moduleIsNotValid(data, ['test']);
    expect(result).toBe(true);
  });
  it('should return false when has mandatory fields filled', () => {
    const result = moduleIsNotValid(data, ['slug']);
    expect(result).toBe(false);
  });
});
