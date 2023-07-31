import { Variable } from '@/models/types/pageStructure';
import { getAppViewVariable, getBooleanVariable, getDataVariable } from './dataVariableHelper';

describe('getDataVariable function', () => {
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
    const variableToLook = 'variable1';
    const result = getDataVariable(variables, variableToLook);
    expect(result).toEqual('value1');
  });

  it('should return an empty string if the specified variable is not found', () => {
    const variableToLook = 'variable3';
    const result = getDataVariable(variables, variableToLook);
    expect(result).toEqual('');
  });

  it('should return an empty string if variables is undefined', () => {
    const variableToLook = 'variable1';
    const undefinedVariables: Variable[] | undefined = undefined;
    const result = getDataVariable(undefinedVariables, variableToLook);
    expect(result).toEqual('');
  });
});

describe('getAppViewVariable function', () => {
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
    const variableToLook = '';
    const undefinedVariables: Variable[] | undefined = undefined;
    const result = getAppViewVariable(undefinedVariables, variableToLook);
    expect(result).toEqual(undefined);
  });

  it('should return true if variables is set true', () => {
    const variableToLook = 'true-variable';
    const result = getAppViewVariable(variables, variableToLook);
    expect(result).toEqual(true);
  });

  it('should return false if variables is set false', () => {
    const variableToLook = 'false-variable';
    const result = getAppViewVariable(variables, variableToLook);
    expect(result).toEqual(false);
  });

  it('should return true of the default variable if is set to true and variableToLook is not set', () => {
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
    const result = getAppViewVariable(customVariables);
    expect(result).toEqual(true);
  });

  it('should return undefined of the default variable if is set to true and variableToLook is empty', () => {
    const variableToLook = '';
    const result = getAppViewVariable(variables, variableToLook);
    expect(result).toEqual(undefined);
  });

  it('should return true of the default variable if is set to true', () => {
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
    const result = getAppViewVariable(customVariables, variableToLook);
    expect(result).toEqual(true);
  });

  it('should return false of the default variable if is set to false', () => {
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
    const result = getAppViewVariable(customVariables, variableToLook);
    expect(result).toEqual(false);
  });

  it('should return false of the default variable if is set but is not a boolean value', () => {
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
    const result = getAppViewVariable(customVariables, variableToLook);
    expect(result).toEqual(false);
  });
});

describe('getBooleanVariable function', () => {
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
    const variableToLook = '';
    const undefinedVariables: Variable[] | undefined = undefined;
    const result = getBooleanVariable(undefinedVariables, variableToLook);
    expect(result).toEqual(undefined);
  });

  it('should return true if variables is set true', () => {
    const variableToLook = 'true-variable';
    const result = getBooleanVariable(variables, variableToLook);
    expect(result).toEqual(true);
  });

  it('should return false if variables is set false', () => {
    const variableToLook = 'false-variable';
    const result = getBooleanVariable(variables, variableToLook);
    expect(result).toEqual(false);
  });

  it('should return false of the specific variable if is set but is not a boolean value', () => {
    const variableToLook = 'xxx-variable';
    const result = getBooleanVariable(variables, variableToLook);
    expect(result).toEqual(false);
  });

  it('should return undefined of the default variable if is set but is not a boolean value', () => {
    const variableToLook = 'undefined';
    const result = getBooleanVariable(variables, variableToLook);
    expect(result).toEqual(undefined);
  });
});
