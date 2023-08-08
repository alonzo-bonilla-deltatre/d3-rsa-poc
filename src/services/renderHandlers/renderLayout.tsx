/* instanbul ignore file */
import { ComponentProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { Metadata, StructureItem, Variable } from '@/models/types/pageStructure';
import logger from '@/utilities/logger';

import renderFooter from '@/components/layouts/Footer/FooterWrapper';
import renderDynamicGrid from '@/components/layouts/DynamicGrid/DynamicGridWrapper';
import renderHeader from '@/components/layouts/Header/HeaderWrapper';
import renderHeaderTransparent from '@/components/layouts/HeaderTransparent/HeaderTransparentWrapper';
import renderSection from '@/components/layouts/Section/SectionWrapper';

const layoutList: Record<any, (props: ComponentProps) => React.ReactElement> = {
  Section: renderSection,
  Columns66: renderDynamicGrid('6-6'),
  Columns93: renderDynamicGrid('9-3'),
  Columns39: renderDynamicGrid('3-9'),
  Columns3333: renderDynamicGrid('3-3-3-3'),
  Columns444: renderDynamicGrid('4-4-4'),
  Columns363: renderDynamicGrid('3-6-3'),
  Header: renderHeader,
  HeaderTransparent: renderHeaderTransparent,
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
