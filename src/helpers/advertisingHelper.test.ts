import logger from '@/utilities/logger';
import { getAdSizesFromString } from './advertisingHelper';
import { LoggerLevel } from '@/models/types/logger';
import { describe, expect, it } from '@jest/globals';

jest.mock('@/utilities/logger');

describe('getAdSizesFromString', () => {
  // @ts-ignore
  const mockLogger = logger.log as jest.Mock;

  it('should return an array of two numbers when provided with a valid size string', () => {
    // ARRANGE
    const validSizeString = '320x70';

    // ACT
    const result = getAdSizesFromString(validSizeString);

    // ASSERT
    expect(result).toEqual([320, 70]);
  });

  it('should return undefined and log an error when provided with an invalid size string', () => {
    // ARRANGE
    const invalidSizeString = 'invalidSize';

    // ACT
    const result = getAdSizesFromString(invalidSizeString);

    // ASSERT
    expect(result).toBeNull();
    expect(mockLogger).toHaveBeenCalledWith(
      'Advertising error: cannot render module without correct size: must have this format 320x70',
      LoggerLevel.error
    );
  });
  it('should return undefined and log an error when provided with undefined', () => {
    // ACT
    const result = getAdSizesFromString(undefined as unknown as string);

    // ASSERT
    expect(result).toBeNull();
    expect(mockLogger).toHaveBeenCalledWith(
      'Advertising error: cannot render module without correct size: must have this format 320x70',
      LoggerLevel.error
    );
  });
});
