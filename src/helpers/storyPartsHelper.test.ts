import { getSrcFromMarkup } from '@/helpers/storyPartsHelper';

const html =
  '<iframe width="480" height="270" src="https://www.youtube.com/embed/PIerxfLKQl8?feature=oembed" frameborder="0" ';

describe('getSrcFromMarkup function', () => {
  it('should return src if src is defined', () => {
    const result = getSrcFromMarkup(html);
    expect(result).toEqual('https://www.youtube.com/embed/PIerxfLKQl8?feature=oembed');
  });

  it('should return empty string if src is not defined', () => {
    const result = getSrcFromMarkup('simple string');
    expect(result).toEqual('');
  });
  it('should return empty string if html is undefined', () => {
    const result = getSrcFromMarkup('');
    expect(result).toEqual('');
  });
});
