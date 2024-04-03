import { describe, expect, test } from '@jest/globals';
import { isDateMinorThanNow, isDateGreaterThanNow, formatDate, getDay, getMonth, getYear } from '@/helpers/dateHelper';

describe('isDateMinorThanNow', (): void => {
  test('should return false if dateString is empty', (): void => {
    // ACT
    const result = isDateMinorThanNow('');

    // ASSERT
    expect(result).toEqual(false);
  });

  test('should return false if dateString is greater of date now utc', (): void => {
    // ARRANGE
    let greaterDateTimeUtcNow = new Date();
    greaterDateTimeUtcNow.setFullYear(greaterDateTimeUtcNow.getFullYear() + 1);

    // ACT
    const result = isDateMinorThanNow(greaterDateTimeUtcNow.toUTCString());

    // ASSERT
    expect(result).toEqual(false);
  });

  test('should return true if dateString is minor than utc now', (): void => {
    // ARRANGE
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
    // ARRANGE
    let greaterDateTimeUtcNow = new Date();
    greaterDateTimeUtcNow.setFullYear(greaterDateTimeUtcNow.getFullYear() - 1);

    // ACT
    const result = isDateGreaterThanNow(greaterDateTimeUtcNow.toUTCString());

    // ASSERT
    expect(result).toEqual(false);
  });

  test('should return true if dateString is greater than utc now', (): void => {
    // ARRANGE
    let minorDateTimeUtcNow = new Date();
    minorDateTimeUtcNow.setFullYear(minorDateTimeUtcNow.getFullYear() + 1);

    // ACT
    const result = isDateGreaterThanNow(minorDateTimeUtcNow.toUTCString());

    // ASSERT
    expect(result).toEqual(true);
  });
});

describe('formatDate', (): void => {
  test('should return null if date is empty', (): void => {
    // ACT
    const result = formatDate('');

    // ASSERT
    expect(result).toEqual(null);
  });

  test('should return a specific format date if format is set', (): void => {
    // ACT
    const result = formatDate('2023-04-28T14:24:24Z', 'YYYY, MM/DD');

    // ASSERT
    expect(result).toEqual('2023, 04/28');
  });

  test("should return a default format date if format isn't set", (): void => {
    // ACT
    const result = formatDate('2023-04-28T14:24:24.6838721Z');

    // ASSERT
    expect(result).toEqual('2023/04/28 14:24:24');
  });
});

describe('getDay', (): void => {
  test('should return null if date is empty', (): void => {
    // ACT
    const result = getDay('');

    // ASSERT
    expect(result).toEqual(null);
  });

  test('should return a specific format date if format is set', (): void => {
    // ACT
    const result = getDay('2023-04-28T14:24:24Z', 'DD');

    // ASSERT
    expect(result).toEqual('28');
  });

  test("should return a default format date if format isn't set", (): void => {
    // ACT
    const result = getDay('2023-04-28T14:24:24.6838721Z');

    // ASSERT
    expect(result).toEqual('28');
  });
});

describe('getMonth', (): void => {
  test('should return null if date is empty', (): void => {
    // ACT
    const result = getMonth('');

    // ASSERT
    expect(result).toEqual(null);
  });

  test('should return a specific format date if format is set', (): void => {
    // ACT
    const result = getMonth('2023-04-28T14:24:24Z', 'MM');

    // ASSERT
    expect(result).toEqual('04');
  });

  test("should return a default format date if format isn't set", (): void => {
    // ACT
    const result = getMonth('2023-04-28T14:24:24.6838721Z');

    // ASSERT
    expect(result).toEqual('Apr');
  });
});

describe('getYear', (): void => {
  test('should return null if date is empty', (): void => {
    // ACT
    const result = getYear('');

    // ASSERT
    expect(result).toEqual(null);
  });

  test('should return a specific format date if format is set', (): void => {
    // ACT
    const result = getYear('2023-04-28T14:24:24Z', 'YYYY');

    // ASSERT
    expect(result).toEqual('2023');
  });

  test("should return a default format date if format isn't set", (): void => {
    // ACT
    const result = getYear('2023-04-28T14:24:24.6838721Z');

    // ASSERT
    expect(result).toEqual('2023');
  });
});
