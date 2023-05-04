import { describe, expect, test } from "@jest/globals";
import { formatDate } from "@/utilities/dateFormatter";

describe("formatDate", (): void => {

  test("should return null if date is empty", (): void => {
    // ACT
    const result = formatDate('');

    // ASSERT
    expect(result).toEqual(null);
  });

  test("should return a specific format date if format is set", (): void => {
    // ACT
    const result = formatDate("2023-04-28T14:24:24Z", "YYYY, MM/DD");

    // ASSERT
    expect(result).toEqual("2023, 04/28");
  });

  test("should return a default format date if format isn't set", (): void => {
    // ACT
    const result = formatDate("2023-04-28T14:24:24.6838721Z");

    // ASSERT
    expect(result).toEqual("2023/04/28 14:24:24");
  });
});