/* instanbul ignore file */
import { ComponentProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { Metadata, StructureItem, Variable } from '@/models/types/pageStructure';
import logger from '@/utilities/logger';
/* */
import renderSection from '@/components/layouts/Section';
import renderTwoColumns from '@/components/layouts/TwoColumns';
import renderHeader from '@/components/layouts/Header/HeaderWrapper';

const layoutList: Record<any, (props: ComponentProps) => React.ReactElement> = {
  Section: renderSection,
  PocTwoColumns: renderTwoColumns,

  // products-demo layouts
  TwoColumns: renderTwoColumns,
  Header: renderHeader,
};

export const renderLayout = (
  item: StructureItem,
  variables?: Variable[] | null,
  metadata?: Metadata[] | null
): React.ReactElement => {
  const render = layoutList[item.key.id];
  if (render) {
    return render({ ...item, variables, metadata } as ComponentProps);
  }
  logger.log(`Cannot render layout ${item.key.id}`, LoggerLevel.error);
  return <div />;
};
