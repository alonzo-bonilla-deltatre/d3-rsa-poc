import ModuleTitle from '@/components/common/ModuleTitle';
import { HeroSwiper } from '@/components/modules/Hero/HeroSwiper';
import { ComponentProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getSelection } from '@/services/forgeDistributionService';
import logger from '@/utilities/logger';
import { getFilteredItems } from '@/helpers/forgeDistributionEntityHelper';

type ModuleProps = {
  moduleTitle?: string;
  headingLevel?: string;
  displayModuleTitle?: string;
  hideDate?: string;
  selectionSlug?: string;
  limit?: string;
};

const Hero = async ({ ...data }: ComponentProps) => {
  const { moduleTitle, headingLevel, displayModuleTitle, hideDate, selectionSlug, limit } =
    data.properties as ModuleProps;
  const defaultItemLimit = 5;
  let itemLimit = parseInt(limit ?? '');
  if (itemLimit <= 0) {
    itemLimit = defaultItemLimit;
  }

  if (!selectionSlug) {
    logger.log('Cannot render CustomPromo module with empty slug', LoggerLevel.warning);
    return <div />;
  }

  const selection = await getSelection(selectionSlug);
  const items = selection?.items;

  return items && items.length > 0 ? (
    <>
      <ModuleTitle
        canRender={displayModuleTitle?.toString() === 'true'}
        heading={headingLevel}
        text={moduleTitle}
      ></ModuleTitle>
      <HeroSwiper
        slides={getFilteredItems(items, Number(itemLimit))}
        hideDate={hideDate?.toString() === 'true'}
      />
    </>
  ) : (
    <div />
  );
};
export default Hero;
