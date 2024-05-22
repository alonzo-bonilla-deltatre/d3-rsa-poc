import { changeHistory, checkPathFormats, hasValidUrl, isExternalLink, setURLSearchParams } from '@/helpers/urlHelper';

describe('getDataVariable function', () => {
  it('should return the pagePath with initial slash', () => {
    // ACT
    const result = checkPathFormats('test/my-page/');
    // ASSERT
    expect(result).toEqual('/test/my-page/');
  });
});

describe('changeHistory function', () => {
  it('should return the pagePath with initial slash', () => {
    window.history.replaceState = jest.fn();

    // ACT
    changeHistory('test/my-page/');

    // ASSERT
    expect(window.history.replaceState).toBeCalledWith(null, '', 'test/my-page/');
  });
});

describe('setURLSearchParams function', () => {
  it('should return the searchUrlParams correctly', () => {
    // ARRANGE
    const queryStringParams = {
      skip: '',
      limit: '1',
      param: '3',
    };
    // ACT
    const result = setURLSearchParams(queryStringParams);
    // ASSERT
    expect(result).toEqual('limit=1&param=3');
  });
  it('should return the searchUrlParams correctly', () => {
    // ARRANGE
    const queryStringParams = {};
    // ACT
    const result = setURLSearchParams(queryStringParams);
    // ASSERT
    expect(result).toEqual('');
  });
});

describe('isExternalLink function', () => {
  // ARRANGE
  const url = 'https://www.url.com/news/first-news';

  it('should return true if url starts with http && url does not include base url', () => {
    // ARRANGE
    const baseUrl = 'https://www.another-url.com';

    // ACT
    const result = isExternalLink(url, baseUrl);

    // ASSERT
    expect(result).toBeTruthy();
  });
  it('should return false if the url include the base url', () => {
    // ARRANGE
    const baseUrl = 'https://www.url.com';

    // ACT
    const result = isExternalLink(url, baseUrl);

    // ASSERT
    expect(result).toBeFalsy();
  });

  it('should return false if there is no base url', () => {
    // ACT
    const result = isExternalLink(url);

    // ASSERT
    expect(result).toBeFalsy();
  });

  it('should return false if url does not start with http', () => {
    // ACT
    const result = isExternalLink('/news');

    // ASSERT
    expect(result).toBeFalsy();
  });
});

describe('hasValidUrl function', () => {
  it('should return true for a valid URL', () => {
    // ARRANGE
    const url = 'https://www.valid-url.com';
    // ACT
    const result = hasValidUrl(url);
    // ASSERT
    expect(result).toBeTruthy();
  });

  it('should return false for an undefined URL', () => {
    // ARRANGE
    const url = undefined;
    // ACT
    const result = hasValidUrl(url);
    // ASSERT
    expect(result).toBeFalsy();
  });

  it('should return false for a null URL', () => {
    // ARRANGE
    const url = null as any;
    // ACT
    const result = hasValidUrl(url);
    // ASSERT
    expect(result).toBeFalsy();
  });

  it('should return false for an empty string URL', () => {
    // ARRANGE
    const url = '';
    // ACT
    const result = hasValidUrl(url);
    // ASSERT
    expect(result).toBeFalsy();
  });

  it('should return false for a URL equal to "#nolink"', () => {
    // ARRANGE
    const url = '#nolink';
    // ACT
    const result = hasValidUrl(url);
    // ASSERT
    expect(result).toBeFalsy();
  });
});
