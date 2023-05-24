import { Variable } from '@/models/types/pageStructure';
import { getPageStructure } from '@/services/pageService';

export const getHamburgerStructure = async (variables: Variable[] | undefined, previewToken: string) => {
  const headerVariableName = 'inc_hamburger';
  const headerSource: string =
    (variables?.find((variable: Variable) => variable.key === headerVariableName)?.keyValue?.value as string) ?? '';

  if (headerSource === null || !headerSource?.length) {
    return null;
  }

  const headerStructure = await getPageStructure(headerSource, previewToken);
  return headerStructure?.data ?? null;
};
