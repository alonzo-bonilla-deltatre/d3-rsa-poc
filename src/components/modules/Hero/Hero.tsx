import { HeroSwiper } from '@/components/modules/Hero/HeroSwiper';
import { ComponentProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getSelection } from '@/services/forgeDistributionService';
import logger from '@/utilities/logger';
import { getFilteredItems } from '@/helpers/forgeDistributionEntityHelper';
import { getNumberProperty } from '@/helpers/pageComponentPropertyHelper';

type ModuleProps = {
  selectionSlug?: string;
  skip?: number;
  limit?: number;
};

const Hero = async ({ ...data }: ComponentProps) => {
  const { selectionSlug, skip, limit } = data.properties as ModuleProps;
  const defaultItemLimit = 5;
  if (!selectionSlug) {
    const invalidSlugErrorMessage = 'Cannot render Hero module with empty slug';
    logger.log(invalidSlugErrorMessage, LoggerLevel.warning);
    return <div />;
  }

  const selection = await getSelection(selectionSlug);
  const items = selection?.items;

  return items && items.length > 0 ? (
    <HeroSwiper
      slides={getFilteredItems(items, getNumberProperty(skip, 0), getNumberProperty(limit, defaultItemLimit))}
      hideDate={false}
    />
  ) : (
    <div />
  );
};
export default Hero;
