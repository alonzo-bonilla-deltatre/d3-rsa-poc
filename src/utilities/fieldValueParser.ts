import { getDataVariable } from '@/helpers/dataVariableHelper';
import { Variable } from '@/models/types/pageStructure';

/**
 * Parse string from the PageBuilder/VSM field that contain some template strings (${value})
 * @param value the input string
 * @param variables the Variable[] array
 * @returns The input values with the placeholders value replaced with the variables value if found, or the original input value
 */
export const parseFieldValue = (value: string, variables: Variable[]): string => {
  if (!variables?.length) {
    return value;
  }
  return value.replace(/\$\{\s*(.*?)\s*\}/g, (match, key) => {
    const matchingData = getDataVariable(variables, key);
    return matchingData ? matchingData : match;
  });
};
