import { getDataVariable } from '@/helpers/dataVariableHelper';
import { Variable } from '@/models/types/pageStructure';
import { getPageStructure } from '@/services/pageService';

/**
 * Function to get the structure of the footer.
 * It retrieves the `inc_footer` data variable from the provided `variables`.
 * If `inc_footer` is not found or is empty, `null` is returned.
 * Otherwise, it retrieves the page structure for the `inc_footer` source and returns the `data` property of the structure.
 * If the page structure cannot be retrieved, `null` is returned.
 *
 * @param {Variable[] | undefined} variables - The variables to use.
 * @param {string | undefined} previewToken - The preview token to use.
 * @returns {Promise<any | null>} - The footer structure or `null` if it cannot be retrieved.
 */
export const getFooterStructure = async (variables: Variable[] | undefined, previewToken: string | undefined) => {
  const incFooter = getDataVariable(variables, 'inc_footer');

  if (!incFooter) {
    return null;
  }

  const footerStructure = await getPageStructure(incFooter, previewToken);
  return footerStructure?.data ?? null;
};
