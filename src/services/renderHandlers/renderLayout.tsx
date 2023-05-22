/* instanbul ignore file */
import { ComponentProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { Metadata, StructureItem, Variable } from '@/models/types/pageStructure';
import logger from '@/utilities/logger';

import renderSection from '@/components/layouts/Section';
import renderTwoColumns from '@/components/layouts/TwoColumns/TwoColumnsWrapper';
import renderHeader from '@/components/layouts/Header/HeaderWrapper';
import renderFooter from '@/components/layouts/Footer/FooterWrapper';

const layoutList: Record<any, (props: ComponentProps) => React.ReactElement> = {
  Section: renderSection,
  TwoColumns: renderTwoColumns,
  Header: renderHeader,
  Footer: renderFooter,
};

export const renderLayout = (
  item: StructureItem,
  variables?: Variable[] | null,
  metadata?: Metadata[] | null,
  previewToken?: string | null
): React.ReactElement => {
  const render = layoutList[item.key.id];
  if (render) {
    return render({ ...item, variables, metadata, previewToken } as ComponentProps);
  }
  logger.log(`Cannot render layout ${item.key.id}`, LoggerLevel.error);
  return <div />;
};
