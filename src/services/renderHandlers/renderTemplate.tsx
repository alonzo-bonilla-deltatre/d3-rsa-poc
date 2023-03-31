import { ComponentProps } from "@/models/types/components";
import { LoggerLevel } from "@/models/types/logger";
import { StructureItem } from "@/models/types/pageStructure";
import logger from "@/utilities/logger";
/* */
import renderDefaultTemplate from "@/components/templates/DefaultTemplate";
import renderNoTemplate from "@/components/templates/NoTemplate";

const templateList: Record<any, (props: ComponentProps) => React.ReactElement> =
  {
    Default: renderDefaultTemplate,
    "No Template": renderNoTemplate
  };

export const renderTemplate = (item: StructureItem): React.ReactElement => {
  const render = templateList[item.key.id];
  if (render) {
    return render({ ...item } as ComponentProps);
  }
  logger.log(`Cannot render template ${item.key.id}`, LoggerLevel.error);
  return <div/>;
};
