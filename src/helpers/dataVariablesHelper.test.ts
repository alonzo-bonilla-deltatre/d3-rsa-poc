import { Variable } from '@/models/types/pageStructure';
import {
  convertStringToBoolean,
  createDataVariable,
  getAppViewVariable,
  getBooleanVariable,
  getDataVariable,
} from '@/helpers/dataVariableHelper';

describe('getDataVariable function', () => {
  // ARRANGE
  const variables: Variable[] = [
    {
      key: 'variable1',
      type: 'type1',
      keyValue: {
        value: 'value1',
        valueType: 'valueType1',
      },
    },
    {
      key: 'variable2',
      type: 'type2',
      keyValue: {
        value: 'value2',
        valueType: 'valueType2',
      },
    },
  ];

  it('should return the value of the specified variable', () => {
    // ARRANGE
    const variableToLook = 'variable1';
    // ACT
    const result = getDataVariable(variables, variableToLook);
    // ASSERT
    expect(result).toEqual('value1');
  });

  it('should return an empty string if the specified variable is not found', () => {
    // ARRANGE
    const variableToLook = 'variable3';
    // ACT
    const result = getDataVariable(variables, variableToLook);
    // ASSERT
    expect(result).toEqual('');
  });

  it('should return an empty string if variables is undefined', () => {
    // ARRANGE
    const variableToLook = 'variable1';
    // ACT
    const result = getDataVariable(undefined, variableToLook);
    // ASSERT
    expect(result).toEqual('');
  });
});

describe('getAppViewVariable function', () => {
  // ARRANGE
  const variables: Variable[] = [
    {
      key: 'true-variable',
      type: 'true-variable',
      keyValue: {
        value: 'true',
        valueType: 'trueType',
      },
    },
    {
      key: 'false-variable',
      type: 'false-variable',
      keyValue: {
        value: 'false',
        valueType: 'falseType',
      },
    },
  ];

  it('should return undefined if variables is undefined', () => {
    // ACT
    const result = getAppViewVariable(undefined, '');
    // ASSERT
    expect(result).toEqual(undefined);
  });

  it('should return true if variables is set true', () => {
    // ARRANGE
    const variableToLook = 'true-variable';
    // ACT
    const result = getAppViewVariable(variables, variableToLook);
    // ASSERT
    expect(result).toEqual(true);
  });

  it('should return false if variables is set false', () => {
    // ARRANGE
    const variableToLook = 'false-variable';
    // ACT
    const result = getAppViewVariable(variables, variableToLook);
    // ASSERT
    expect(result).toEqual(false);
  });

  it('should return true of the default variable if is set to true and variableToLook is not set', () => {
    // ARRANGE
    const customVariables = [
      ...variables,
      {
        key: 'appView',
        type: 'appView',
        keyValue: {
          value: 'true',
          valueType: 'boolean',
        },
      },
    ];
    // ACT
    const result = getAppViewVariable(customVariables);
    // ASSERT
    expect(result).toEqual(true);
  });

  it('should return undefined of the default variable if is set to true and variableToLook is empty', () => {
    // ACT
    const result = getAppViewVariable(variables, '');
    // ASSERT
    expect(result).toEqual(undefined);
  });

  it('should return true of the default variable if is set to true', () => {
    // ARRANGE
    const variableToLook = 'appView';
    const customVariables = [
      ...variables,
      {
        key: 'appView',
        type: 'appView',
        keyValue: {
          value: 'true',
          valueType: 'boolean',
        },
      },
    ];
    // ACT
    const result = getAppViewVariable(customVariables, variableToLook);
    // ASSERT
    expect(result).toEqual(true);
  });

  it('should return false of the default variable if is set to false', () => {
    // ARRANGE
    const variableToLook = 'appView';
    const customVariables = [
      ...variables,
      {
        key: 'appView',
        type: 'appView',
        keyValue: {
          value: 'false',
          valueType: 'boolean',
        },
      },
    ];
    // ACT
    const result = getAppViewVariable(customVariables, variableToLook);
    // ASSERT
    expect(result).toEqual(false);
  });

  it('should return false of the default variable if is set but is not a boolean value', () => {
    // ARRANGE
    const variableToLook = 'appView';
    const customVariables = [
      ...variables,
      {
        key: 'appView',
        type: 'appView',
        keyValue: {
          value: 'xxx',
          valueType: 'boolean',
        },
      },
    ];
    // ACT
    const result = getAppViewVariable(customVariables, variableToLook);
    // ASSERT
    expect(result).toEqual(false);
  });
});

describe('getBooleanVariable function', () => {
  // ARRANGE
  const variables: Variable[] = [
    {
      key: 'true-variable',
      type: 'true-variable',
      keyValue: {
        value: 'true',
        valueType: 'trueType',
      },
    },
    {
      key: 'false-variable',
      type: 'false-variable',
      keyValue: {
        value: 'false',
        valueType: 'falseType',
      },
    },
    {
      key: 'xxx-variable',
      type: 'xxx-variable',
      keyValue: {
        value: 'xxx',
        valueType: 'xxxType',
      },
    },
  ];

  it('should return false if variables is undefined', () => {
    // ACT
    const result = getBooleanVariable(undefined, '');
    // ASSERT
    expect(result).toEqual(undefined);
  });

  it('should return true if variables is set true', () => {
    // ARRANGE
    const variableToLook = 'true-variable';
    // ACT
    const result = getBooleanVariable(variables, variableToLook);
    // ASSERT
    expect(result).toEqual(true);
  });

  it('should return false if variables is set false', () => {
    // ARRANGE
    const variableToLook = 'false-variable';
    // ACT
    const result = getBooleanVariable(variables, variableToLook);
    // ASSERT
    expect(result).toEqual(false);
  });

  it('should return false of the specific variable if is set but is not a boolean value', () => {
    // ARRANGE
    const variableToLook = 'xxx-variable';
    // ACT
    const result = getBooleanVariable(variables, variableToLook);
    // ASSERT
    expect(result).toEqual(false);
  });

  it('should return undefined of the default variable if is set but is not a boolean value', () => {
    // ARRANGE
    const variableToLook = 'undefined';
    // ACT
    const result = getBooleanVariable(variables, variableToLook);
    // ASSERT
    expect(result).toEqual(undefined);
  });
});
describe('createDataVariable function', () => {
  // ARRANGE
  const key = 'key';
  const value = 'value';
  const valueType = 'valueType';
  const type = 'type';

  it('should create a Variable object with the params passed to the function', () => {
    // ACT
    const result = createDataVariable(key, value);
    // ASSERT
    expect(result).toEqual({ key, keyValue: { value, valueType: '' }, type: '' });
  });

  it('should create a Variable object even with the optional params passed to the function', () => {
    // ACT
    const result = createDataVariable(key, value, valueType, type);
    // ASSERT
    expect(result).toEqual({ key, keyValue: { value, valueType }, type });
  });
});

describe('convertStringToBoolean function', () => {
  it('should return false if input is an empty string', () => {
    // ACT
    const result = convertStringToBoolean('');
    // ASSERT
    expect(result).toEqual(false);
  });
  it('should return true if the input is a string with "true" as value', () => {
    // ACT
    const result = convertStringToBoolean('true');
    // ASSERT
    expect(result).toEqual(true);
  });
  it('should return false if the input is a string with "false" as value', () => {
    // ACT
    const result = convertStringToBoolean('false');
    // ASSERT
    expect(result).toEqual(false);
  });
});
