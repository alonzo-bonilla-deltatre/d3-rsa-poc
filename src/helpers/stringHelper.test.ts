import { transformTranslationKey } from '@/helpers/stringHelper';

describe('transformTranslationKey function', () => {
  it('should replace empty spaces with -', () => {
    // ACT
    const result = transformTranslationKey('translation key');
    // ASSERT
    expect(result).toEqual('translation-key');
  });
  it('should transform the string in lowercase', () => {
    // ACT
    const result = transformTranslationKey('Translation Key');
    // ASSERT
    expect(result).toEqual('translation-key');
  });
});
