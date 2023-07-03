import { getSrcWithTransformation } from '@/utilities/cloudinaryTransformations';
import { describe, expect, test } from '@jest/globals';

describe('getSrcWithTransformation', (): void => {
  const photoUrl = 'https://res.cloudinary.com/d3/image/upload/{formatInstructions}/dev/e2wmqxju9vnrl6po1jim';
  const transformation = 't_thumb';

  test('should return empty string if src is empty', (): void => {
    // ACT
    const result = getSrcWithTransformation('', transformation);

    // ASSERT
    expect(result).toEqual('');
  });

  test('should remove formatInstructions', (): void => {
    // ACT
    const result = getSrcWithTransformation(photoUrl, transformation);

    // ASSERT
    expect(result).toEqual('https://res.cloudinary.com/d3/image/upload/t_thumb/dev/e2wmqxju9vnrl6po1jim');
  });
});
