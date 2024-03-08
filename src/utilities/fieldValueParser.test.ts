import { Variable } from '@/models/types/pageStructure';
import { parseFieldValue } from '@/utilities/fieldValueParser';

describe('parseFieldValue', () => {
  it('should return the empty value if variables are undefined', () => {
    // ARRANGE
    const input = undefined;

    // ACT
    const result = parseFieldValue(input, []);

    // ASSERT
    expect(result).toBe('');
  });

  it('should return the original value if variables are empty', () => {
    // ARRANGE
    const input = '${slug} - D3';

    // ACT
    const result = parseFieldValue(input, []);

    // ASSERT
    expect(result).toBe(input);
  });

  it('should return the original value if pattern does not match', () => {
    // ARRANGE
    const variables: Variable[] = [
      {
        key: 'year',
        type: 'keyValue',
        keyValue: {
          value: '2023',
          valueType: 'string',
        },
      },
      {
        key: 'slug',
        type: 'keyValue',
        keyValue: {
          value: '49ers',
          valueType: 'string',
        },
      },
    ];
    // Wrong pattern
    const input = '$(slug) - D3';

    // ACT
    const result = parseFieldValue(input, variables);

    // ASSERT
    expect(result).toBe(input);
  });

  it('should return the original value if variables does not match', () => {
    // ARRANGE
    const variables: Variable[] = [
      {
        key: 'year',
        type: 'keyValue',
        keyValue: {
          value: '2023',
          valueType: 'string',
        },
      },
      {
        key: 'slug',
        type: 'keyValue',
        keyValue: {
          value: '49ers',
          valueType: 'string',
        },
      },
    ];
    // Wrong pattern
    const input = '${club} - D3';

    // ACT
    const result = parseFieldValue(input, variables);

    // ASSERT
    expect(result).toBe(input);
  });

  it('should parse the value if pattern matches', () => {
    // ARRANGE
    const variables: Variable[] = [
      {
        key: 'year',
        type: 'keyValue',
        keyValue: {
          value: '2023',
          valueType: 'string',
        },
      },
      {
        key: 'slug',
        type: 'keyValue',
        keyValue: {
          value: '49ers',
          valueType: 'string',
        },
      },
    ];
    // ASSERT
    expect(parseFieldValue('${slug} - ${year}', variables)).toBe('49ers - 2023');
    expect(parseFieldValue('/club/${slug}/news/${year}', variables)).toBe('/club/49ers/news/2023');
  });

  it('should parse the value if pattern matches even with bad spaces', () => {
    // ARRANGE
    const variables: Variable[] = [
      {
        key: 'year',
        type: 'keyValue',
        keyValue: {
          value: '2023',
          valueType: 'string',
        },
      },
      {
        key: 'slug',
        type: 'keyValue',
        keyValue: {
          value: '49ers',
          valueType: 'string',
        },
      },
    ];

    const firstInput = '${ slug} - ${ year}';
    const secondInput = '${ slug } - ${ year }';
    const thirdInput = '${slug } - ${year }';
    const expectedResult = '49ers - 2023';

    // ACT
    expect(parseFieldValue(firstInput, variables)).toBe(expectedResult);
    expect(parseFieldValue(secondInput, variables)).toBe(expectedResult);
    expect(parseFieldValue(thirdInput, variables)).toBe(expectedResult);
  });
});
