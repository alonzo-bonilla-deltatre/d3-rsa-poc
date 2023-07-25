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
export const getAppViewVariable = (variables: Variable[] | undefined, variableToLook: string = 'appView'): boolean =>
  getBooleanVariable(variables, variableToLook);

/**
 * Get variable's value from Components' props
 * @param variables the  Variable[] array
 * @param variableToLook the variable to look for
 * @returns the variable boolean value, if found true, or false if is empty string or not boolean value
 */
export const getBooleanVariable = (variables: Variable[] | undefined, variableToLook: string): boolean =>
  variables?.find((variable: Variable) => variable.key === variableToLook)?.keyValue?.value?.toLowerCase() === 'true';
