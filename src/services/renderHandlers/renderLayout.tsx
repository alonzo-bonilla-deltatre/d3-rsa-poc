import { ComponentProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { StructureItem } from '@/models/types/pageStructure';
import logger from '@/utilities/logger';
/* */
import renderSection from '@/components/layouts/Section';
import renderTwoColumns from '@/components/layouts/TwoColumns';

const layoutList: Record<any, (props: ComponentProps) => React.ReactElement> = {
  Section: renderSection,
  PocTwoColumns: renderTwoColumns,

  // products-demo layouts
  TwoColumns: renderTwoColumns,
};

export const renderLayout = (item: StructureItem): React.ReactElement => {
  const render = layoutList[item.key.id];
  if (render) {
    return render({ ...item } as ComponentProps);
  }
  logger.log(`Cannot render layout ${item.key.id}`, LoggerLevel.error);
  return <div />;
};
