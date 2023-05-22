/* instanbul ignore file */
import { ComponentProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { Metadata, StructureItem, Variable } from '@/models/types/pageStructure';
import logger from '@/utilities/logger';
/* */
import renderDefaultTemplate from '@/components/templates/DefaultTemplate';
import renderNoTemplate from '@/components/templates/NoTemplate';

const templateList: Record<any, (props: ComponentProps) => React.ReactElement> = {
  PocDefault: renderDefaultTemplate,
  'No Template': renderNoTemplate,
  // products-demo templates
  Default: renderDefaultTemplate,
};

export const renderTemplate = (
  item: StructureItem,
  variables?: Variable[] | null,
  metadata?: Metadata[] | null,
  previewToken?: string | null
): React.ReactElement => {
  const render = templateList[item.key.id];
  if (render) {
    return render({ ...item, variables, metadata, previewToken } as ComponentProps);
  }
  logger.log(`Cannot render template ${item.key.id}`, LoggerLevel.error);
  return <div />;
};
