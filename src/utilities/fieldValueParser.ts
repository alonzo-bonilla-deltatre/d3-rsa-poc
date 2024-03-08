import { getDataVariable } from '@/helpers/dataVariableHelper';
import { Variable } from '@/models/types/pageStructure';

/**
 * Parses a string from the PageBuilder/VSM field that contains template strings (${value}).
 *
 * This function takes a string and an array of variables as input. If the string is provided,
 * it replaces each template string in the string with the corresponding variable value and returns the updated string.
 * If the string is not provided, it returns an empty string.
 * If the variables array is not provided or is empty, it returns the string as is.
 * If a template string does not have a corresponding variable, it is not replaced.
 *
 * @param {string | undefined} value - The string to parse.
 * @param {Variable[] | undefined} variables - The variables to use for replacing the template strings.
 * @returns {string} The string with the placeholders replaced with the variable values, or the original string.
 */
export const parseFieldValue = (value: string | undefined, variables: Variable[] | undefined): string => {
  if (!value) {
    return '';
  }
  if (!variables?.length) {
    return value;
  }
  return value.replace(/\$\{\s*([a-zA-Z_-][a-zA-Z0-9_-]*)\s*}/g, (match, key) => {
    const matchingData = getDataVariable(variables, key);
    return matchingData ? matchingData : match;
  });
};
