import { ComponentProps } from "@/models/types/components";
import { getFilteredItems, getSelection } from "@/services/dapiService";
import { HeroSwiper } from "@/components/modules/Hero/HeroSwiper";
import ModuleTitle from "@/components/common/ModuleTitle";
import logger from "@/utilities/logger";
import {LoggerLevel} from "@/models/types/logger";

type ModuleProps = {
  moduleTitle: string;
  headingLevel: string;
  displayModuleTitle: string;
  hideDate: string;
  selectionSlug: string;
  limit: string;
};

const Hero = async ({ ...data }: ComponentProps) => {
  const {
    moduleTitle,
    headingLevel,
    displayModuleTitle,
    hideDate,
    selectionSlug,
    limit,
  } = data.properties as ModuleProps;
  const defaultItemLimit = 5;

  if (!selectionSlug) {
    logger.log(
      "Cannot render CustomPromo module with empty slug",
      LoggerLevel.warning
    );
    return <div />;
  }

  const selectionFetch = getSelection(selectionSlug);
  const [selection] = await Promise.all([selectionFetch]);
  const items = selection?.items;

  return items ? (
    <>
      <ModuleTitle
        canRender={/true/.test(displayModuleTitle)}
        heading={headingLevel}
        text={moduleTitle}
      ></ModuleTitle>
      <HeroSwiper
        slides={getFilteredItems(items, Number(limit ?? defaultItemLimit))}
        hideDate={/true/.test(hideDate)}
      />
    </>
  ) : <div />;
};
export default Hero;
