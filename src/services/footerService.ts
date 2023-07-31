import { getDataVariable } from '@/helpers/dataVariableHelper';
import { Variable } from '@/models/types/pageStructure';
import { getPageStructure } from '@/services/pageService';

export const getFooterStructure = async (variables: Variable[] | undefined, previewToken: string | undefined) => {
  const footerSource: string = getDataVariable(variables, 'inc_footer') ?? '';

  if (footerSource === null || !footerSource?.length) {
    return null;
  }

  const footerStructure = await getPageStructure(footerSource, previewToken);
  return footerStructure?.data ?? null;
};
