import { describe, expect, test } from '@jest/globals';
import { isDateMinorThanNow, isDateGreaterThanNow } from '@/utilities/dateComparer';

describe('isDateMinorThanNow', (): void => {
  test('should return false if dateString is empty', (): void => {
    // ACT
    const result = isDateMinorThanNow('');

    // ASSERT
    expect(result).toEqual(false);
  });

  test('should return false if dateString is greater of date now utc', (): void => {
    let greaterDateTimeUtcNow = new Date();
    greaterDateTimeUtcNow.setFullYear(greaterDateTimeUtcNow.getFullYear() + 1);

    // ACT
    const result = isDateMinorThanNow(greaterDateTimeUtcNow.toUTCString());

    // ASSERT
    expect(result).toEqual(false);
  });

  test('should return true if dateString is minor than utc now', (): void => {
    let minorDateTimeUtcNow = new Date();
    minorDateTimeUtcNow.setFullYear(minorDateTimeUtcNow.getFullYear() - 1);

    // ACT
    const result = isDateMinorThanNow(minorDateTimeUtcNow.toUTCString());

    // ASSERT
    expect(result).toEqual(true);
  });
});

describe('isDateGreaterThanNow', (): void => {
  test('should return false if dateString is empty', (): void => {
    // ACT
    const result = isDateGreaterThanNow('');

    // ASSERT
    expect(result).toEqual(false);
  });

  test('should return false if dateString is minor of date now utc', (): void => {
    let greaterDateTimeUtcNow = new Date();
    greaterDateTimeUtcNow.setFullYear(greaterDateTimeUtcNow.getFullYear() - 1);

    // ACT
    const result = isDateGreaterThanNow(greaterDateTimeUtcNow.toUTCString());

    // ASSERT
    expect(result).toEqual(false);
  });

  test('should return true if dateString is greater than utc now', (): void => {
    let minorDateTimeUtcNow = new Date();
    minorDateTimeUtcNow.setFullYear(minorDateTimeUtcNow.getFullYear() + 1);

    // ACT
    const result = isDateGreaterThanNow(minorDateTimeUtcNow.toUTCString());

    // ASSERT
    expect(result).toEqual(true);
  });
});
