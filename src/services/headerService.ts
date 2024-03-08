import { getDataVariable } from '@/helpers/dataVariableHelper';
import { Variable } from '@/models/types/pageStructure';
import { getPageStructure } from '@/services/pageService';

/**
 * Function to get the structure of the header.
 * It retrieves the `inc_header` data variable from the provided `variables`.
 * If `inc_header` is not found or is empty, `null` is returned.
 * Otherwise, it retrieves the page structure for the `inc_header` source and returns the `data` property of the structure.
 * If the page structure cannot be retrieved, `null` is returned.
 *
 * @param {Variable[] | undefined} variables - The variables to use.
 * @param {string | undefined} previewToken - The preview token to use.
 * @returns {Promise<any | null>} - The header structure or `null` if it cannot be retrieved.
 */
export const getHeaderStructure = async (variables: Variable[] | undefined, previewToken: string | undefined) => {
  const incHeader = getDataVariable(variables, 'inc_header');

  if (!incHeader) {
    return null;
  }

  const headerStructure = await getPageStructure(incHeader, previewToken);
  return headerStructure?.data ?? null;
};
