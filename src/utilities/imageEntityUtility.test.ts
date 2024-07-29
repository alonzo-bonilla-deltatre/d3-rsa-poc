import { getImageTemplateUrl } from '@/utilities/imageEntityUtility';

describe('getImageTemplateUrl', (): void => {
  const entityImage = {
    thumbnail: { templateUrl: 'http://example.com/thumbnail.jpg' },
    image: { templateUrl: 'http://example.com/image.jpg' },
    coverImage: { templateUrl: 'http://example.com/cover.jpg' },
  };

  it('returns thumbnail templateUrl if present', (): void => {
    const result = getImageTemplateUrl(entityImage as any);
    expect(result).toEqual('http://example.com/thumbnail.jpg');
  });

  it('returns image templateUrl if thumbnail templateUrl is not present', (): void => {
    const entity = { ...(entityImage as any), thumbnail: { templateUrl: '' } };
    const result = getImageTemplateUrl(entity);
    expect(result).toEqual('http://example.com/image.jpg');
  });

  it('returns coverImage templateUrl if thumbnail and image templateUrls are not present', (): void => {
    const entity = { ...(entityImage as any), thumbnail: { templateUrl: '' }, image: { templateUrl: '' } };
    const result = getImageTemplateUrl(entity);
    expect(result).toEqual('http://example.com/cover.jpg');
  });

  it('returns empty string if no templateUrls are present', (): void => {
    const entity = {
      ...(entityImage as any),
      thumbnail: { templateUrl: '' },
      image: { templateUrl: '' },
      coverImage: { templateUrl: '' },
    };
    const result = getImageTemplateUrl(entity);
    expect(result).toEqual('');
  });

  it('returns empty string if entity is null', (): void => {
    const result = getImageTemplateUrl(null as any);
    expect(result).toEqual('');
  });

  it('returns empty string if entity is undefined', (): void => {
    const result = getImageTemplateUrl(undefined as any);
    expect(result).toEqual('');
  });

  it('works with LiveBloggingBlogEntity', (): void => {
    const result = getImageTemplateUrl(entityImage as any);
    expect(result).toEqual('http://example.com/thumbnail.jpg');
  });
});
