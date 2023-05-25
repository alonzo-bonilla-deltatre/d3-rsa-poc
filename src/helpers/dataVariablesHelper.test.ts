import { Variable } from '@/models/types/pageStructure';
import { getDataVariable } from './dataVariableHelper';

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
