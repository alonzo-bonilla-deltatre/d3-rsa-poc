import { Variable } from '@/models/types/pageStructure';

/**
 * Get variable's value from Components' props
 * @param variables the  Variable[] array
 * @param variableToLook the variable to look for
 * @returns the variable, if found, or empty string
 */
export const getDataVariable = (variables: Variable[] | undefined, variableToLook: string): string =>
  variables?.find((variable: Variable) => variable.key === variableToLook)?.keyValue?.value ?? '';
