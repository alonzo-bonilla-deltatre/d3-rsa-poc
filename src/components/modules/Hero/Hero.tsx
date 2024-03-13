import { HeroSwiper } from '@/components/modules/Hero/HeroSwiper';
import { ComponentProps, EditorialModuleProps } from '@/models/types/components';
import { getSelection } from '@/services/forgeDistributionService';
import { getFilteredItems } from '@/helpers/forgeDistributionEntityHelper';
import { getNumberProperty } from '@/helpers/pageComponentPropertyHelper';
import { moduleIsNotValid } from '@/helpers/moduleHelper';

const Hero = async ({ data }: { data: ComponentProps }) => {
  const { selectionSlug, skip, limit } = data.properties as EditorialModuleProps;

  if (moduleIsNotValid(data, ['selectionSlug'])) return null;

  const maxItemLimit = 6;
  let itemsLimit = getNumberProperty(limit, maxItemLimit);
  itemsLimit = itemsLimit <= maxItemLimit ? itemsLimit : maxItemLimit;

  const selection = await getSelection(selectionSlug, {
    hasLinkRules: true,
    skip: skip,
    limit: itemsLimit,
  });
  const items = selection?.items;

  if (!items?.length) return null;

  return <HeroSwiper slides={items} />;
};
export default Hero;
