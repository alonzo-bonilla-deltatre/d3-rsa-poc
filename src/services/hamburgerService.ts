import { Variable } from '@/models/types/pageStructure';
import { getPageStructure } from '@/services/pageService';
import { getDataVariable } from '@/helpers/dataVariableHelper';

export const getHamburgerStructure = async (variables: Variable[] | undefined, previewToken: string | undefined) => {
  const headerSource = getDataVariable(variables, 'inc_hamburger');

  if (headerSource === null || !headerSource?.length) {
    return null;
  }

  const headerStructure = await getPageStructure(headerSource, previewToken);
  return headerStructure?.data ?? null;
};
