import { describe, expect, test } from '@jest/globals';
import { formatDate, getDay, getMonth, getYear } from '@/utilities/dateFormatter';

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
