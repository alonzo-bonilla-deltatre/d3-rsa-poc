import { getSrcFromMarkup } from '@/helpers/storyPartsHelper';

describe('getSrcFromMarkup function', () => {
  it('should return src if src is defined', () => {
    // ARRANGE
    const html =
      '<iframe width="480" height="270" src="https://www.youtube.com/embed/PIerxfLKQl8?feature=oembed" frameborder="0" ';
    // ACT
    const result = getSrcFromMarkup(html);
    // ASSERT
    expect(result).toEqual('https://www.youtube.com/embed/PIerxfLKQl8?feature=oembed');
  });

  it('should return empty string if src is not defined', () => {
    // ACT
    const result = getSrcFromMarkup('simple string');
    // ASSERT
    expect(result).toEqual('');
  });
  it('should return empty string if html is undefined', () => {
    // ACT
    const result = getSrcFromMarkup('');
    // ASSERT
    expect(result).toEqual('');
  });
});
