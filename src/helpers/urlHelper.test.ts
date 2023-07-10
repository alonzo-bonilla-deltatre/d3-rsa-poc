import { checkPathFormats } from './urlHelper';

describe('getDataVariable function', () => {
  it('should return the pagePath with initial slash', () => {
    const result = checkPathFormats('test/my-page/');
    expect(result).toEqual('/test/my-page/');
  });
});
