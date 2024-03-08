import { changeHistory, checkPathFormats, isExternalLink, setURLSearchParams } from '@/helpers/urlHelper';

describe('getDataVariable function', () => {
  it('should return the pagePath with initial slash', () => {
    const result = checkPathFormats('test/my-page/');
    expect(result).toEqual('/test/my-page/');
  });
});

describe('changeHistory function', () => {
  it('should return the pagePath with initial slash', () => {
    window.history.replaceState = jest.fn();

    changeHistory('test/my-page/');

    expect(window.history.replaceState).toBeCalledWith(null, '', 'test/my-page/');
  });
});

describe('setURLSearchParams function', () => {
  it('should return the searchUrlParams correctly', () => {
    const queryStringParams = {
      skip: '',
      limit: '1',
      param: '3',
    };
    const result = setURLSearchParams(queryStringParams);
    expect(result).toEqual('limit=1&param=3');
  });
  it('should return the searchUrlParams correctly', () => {
    const queryStringParams = {};
    const result = setURLSearchParams(queryStringParams);
    expect(result).toEqual('');
  });
});

describe('isExternalLink function', () => {
  const url = 'https://www.url.com/news/first-news';

  it('should return true if url starts with http && url does not include base url', () => {
    const baseUrl = 'https://www.another-url.com';

    const result = isExternalLink(url, baseUrl);

    expect(result).toBeTruthy();
  });
  it('should return false if the url include the base url', () => {
    const baseUrl = 'https://www.url.com';

    const result = isExternalLink(url, baseUrl);

    expect(result).toBeFalsy();
  });

  it('should return false if there is no base url', () => {
    const result = isExternalLink(url);

    expect(result).toBeFalsy();
  });

  it('should return false if url does not start with http', () => {
    const result = isExternalLink('/news');

    expect(result).toBeFalsy();
  });
});
