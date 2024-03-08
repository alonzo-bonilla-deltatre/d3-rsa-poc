import { transformTranslationKey } from '@/helpers/stringHelper';

describe('transformTranslationKey function', () => {
  it('should replace empty spaces with -', () => {
    const result = transformTranslationKey('translation key');
    expect(result).toEqual('translation-key');
  });
  it('should transform the string in lowercase', () => {
    const result = transformTranslationKey('Translation Key');
    expect(result).toEqual('translation-key');
  });
});
