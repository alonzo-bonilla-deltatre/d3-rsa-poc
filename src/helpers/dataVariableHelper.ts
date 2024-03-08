import { Variable } from '@/models/types/pageStructure';

/**
 * Get variable's value from Components' props
 * @param variables the  Variable[] array
 * @param variableToLook the variable to look for
 * @returns the variable, if found, or empty string
 */
export const getDataVariable = (variables: Variable[] | undefined, variableToLook: string): string =>
  variables?.find((variable: Variable) => variable.key === variableToLook)?.keyValue?.value ?? '';

/**
 * Get variable's value from Components' props
 * @param variables the  Variable[] array
 * @param variableToLook the variable to look for, default value 'appView'
 * @returns the variable boolean value, if found true, or false if is empty string or not boolean value
 */
export const getAppViewVariable = (
  variables: Variable[] | undefined,
  variableToLook: string = 'appView'
): boolean | undefined => getBooleanVariable(variables, variableToLook);

/**
 * Get variable's value from Components' props
 * @param variables the  Variable[] array
 * @param variableToLook the variable to look for
 * @returns the variable boolean value, if found true, or false if is empty string or not boolean value
 */
export const getBooleanVariable = (variables: Variable[] | undefined, variableToLook: string): boolean | undefined => {
  if (!variables?.some((variable: Variable) => variable.key === variableToLook)) {
    return undefined;
  }
  return (
    variables?.find((variable: Variable) => variable.key === variableToLook)?.keyValue?.value?.toLowerCase() === 'true'
  );
};
/**
 * Get variable's value from Components' props
 * @param key the key of the Variable object
 * @param value the value of the Variable object
 * @param valueType the valueType of the Variable object
 * @param type the type of the Variable object
 * @returns the variable object with the key and value passed as params
 */
export const createDataVariable = (key: string, value: string, valueType?: string, type?: string): Variable => {
  return {
    key: key,
    keyValue: { value, valueType: valueType ?? '' },
    type: type ?? '',
  };
};

/**
 * Get boolean value from a string input
 * @param input the input to be converted
 * @returns true only if input is a string contains "true" value, false otherwise
 */
export function convertStringToBoolean(input: string): boolean {
  return input?.toLowerCase() === 'true';
}
