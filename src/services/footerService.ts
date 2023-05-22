import { Variable } from '@/models/types/pageStructure';
import { getPageStructure } from '@/services/pageService';

export const getFooterStructure = async (variables: Variable[] | undefined, previewToken: string) => {
  const footerVariableName = 'inc_footer';
  const footerSource: string =
    (variables?.find((variable: Variable) => variable.key === footerVariableName)?.keyValue?.value as string) ?? '';

  if (footerSource === null || !footerSource?.length) {
    return null;
  }

  const footerStructure = await getPageStructure(footerSource, previewToken);
  return footerStructure?.data ?? null;
};
