import { describe, expect, test } from '@jest/globals';
import { getTagClasses, getTagTextClasses } from '@/components/commons/Tag/TagHelpers';
import { TagType } from '@/models/types/components/commons/tag';

describe('getTagClasses', (): void => {
  // ARRANGE
  const tagClassName = 'd3-ty-tag-large uppercase inline-flex mr-4 last:mr-0';

  test('should return the correct css className for TagType.PrimaryFilled', (): void => {
    // ACT
    const result = getTagClasses(TagType.PrimaryFilled);

    // ASSERT
    expect(result).toEqual(tagClassName + ' text-white bg-accent p-2 -skew-x-12');
  });
  test('should return the correct css className for TagType.OutlineBig', (): void => {
    // ACT
    const result = getTagClasses(TagType.OutlineBig);

    // ASSERT
    expect(result).toEqual(tagClassName + ' text-greyscale-grey p-4 -skew-x-12 border-primary-border-light border');
  });
  test('should return the correct css className for TagType.Outline', (): void => {
    // ACT
    const result = getTagClasses(TagType.Outline);

    // ASSERT
    expect(result).toEqual(tagClassName + ' text-greyscale-grey p-2 -skew-x-12 border-primary-border-light border');
  });
  test('should return the correct css className for TagType.Primary', (): void => {
    // ACT
    const result = getTagClasses(TagType.Primary);

    // ASSERT
    expect(result).toEqual(tagClassName + ' text-accent p-2');
  });
  test('should return the correct css className for TagType.Secondary', (): void => {
    // ACT
    const result = getTagClasses(TagType.Secondary);

    // ASSERT
    expect(result).toEqual(tagClassName + ' text-greyscale-pale p-2');
  });
  test('should return the correct css className for TagType.Format', (): void => {
    // ACT
    const result = getTagClasses(TagType.Format);

    // ASSERT
    expect(result).toEqual(tagClassName + ' text-gold p-2');
  });
  test('should return the correct css className for TagType.Date', (): void => {
    // ACT
    const result = getTagClasses(TagType.Date);

    // ASSERT
    expect(result).toEqual(tagClassName + ' text-grey-900 p-2');
  });
  test('should return the correct css className for TagType.Location', (): void => {
    // ACT
    const result = getTagClasses(TagType.Location);

    // ASSERT
    expect(result).toEqual(tagClassName + ' text-black p-2');
  });
  test('should return the correct css className for default', (): void => {
    // ACT
    const result = getTagClasses();

    // ASSERT
    expect(result).toEqual(tagClassName + ' text-white bg-accent p-2 -skew-x-12');
  });
});

describe('getTagTextClasses', (): void => {
  test('should return the correct css className for TagType.PrimaryFilled', (): void => {
    // ACT
    const result = getTagTextClasses(TagType.PrimaryFilled);

    // ASSERT
    expect(result).toEqual('skew-x-12');
  });
  test('should return the correct css className for TagType.OutlineBig', (): void => {
    // ACT
    const result = getTagTextClasses(TagType.OutlineBig);

    // ASSERT
    expect(result).toEqual('skew-x-12');
  });
  test('should return the correct css className for TagType.Outline', (): void => {
    // ACT
    const result = getTagTextClasses(TagType.Outline);

    // ASSERT
    expect(result).toEqual('skew-x-12');
  });
  test('should return the correct css className for TagType.Primary', (): void => {
    // ACT
    const result = getTagTextClasses(TagType.Primary);

    // ASSERT
    expect(result).toEqual('');
  });
  test('should return the correct css className for TagType.Secondary', (): void => {
    // ACT
    const result = getTagTextClasses(TagType.Secondary);

    // ASSERT
    expect(result).toEqual('');
  });
  test('should return the correct css className for TagType.Format', (): void => {
    // ACT
    const result = getTagTextClasses(TagType.Format);

    // ASSERT
    expect(result).toEqual('');
  });
  test('should return the correct css className for TagType.Date', (): void => {
    // ACT
    const result = getTagTextClasses(TagType.Date);

    // ASSERT
    expect(result).toEqual('');
  });
  test('should return the correct css className for TagType.Location', (): void => {
    // ACT
    const result = getTagTextClasses(TagType.Location);

    // ASSERT
    expect(result).toEqual('');
  });
  test('should return the correct css className for default', (): void => {
    // ACT
    const result = getTagTextClasses();

    // ASSERT
    expect(result).toEqual('skew-x-12');
  });
});
