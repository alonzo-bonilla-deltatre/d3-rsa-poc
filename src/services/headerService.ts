import { getDataVariable } from '@/helpers/dataVariableHelper';
import { Variable } from '@/models/types/pageStructure';
import { getPageStructure } from '@/services/pageService';

export const getHeaderStructure = async (variables: Variable[] | undefined, previewToken: string) => {
  const headerSource: string = getDataVariable(variables, 'inc_header') ?? '';

  if (headerSource === null || !headerSource?.length) {
    return null;
  }

  const headerStructure = await getPageStructure(headerSource, previewToken);
  return headerStructure?.data ?? null;
};
