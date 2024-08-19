import { HeroSwiperView } from '@/components/modules/HeroSwiper/HeroSwiperView';
import { ComponentProps, EditorialListModuleProps } from '@/models/types/components';
import { getSelection } from '@/services/forgeDistributionService';
import { getNumberProperty } from '@/helpers/pageComponentPropertyHelper';
import { moduleIsNotValid } from '@/helpers/moduleHelper';

const HeroSwiper = async ({ data }: { data: ComponentProps }) => {
  const { selectionSlug, skip, limit } = data.properties as EditorialListModuleProps;

  if (moduleIsNotValid(data, ['selectionSlug'])) return null;

  const maxItemLimit = 6;
  let itemsLimit = getNumberProperty(limit, maxItemLimit);
  itemsLimit = itemsLimit <= maxItemLimit ? itemsLimit : maxItemLimit;

  const selection = await getSelection(selectionSlug, {
    hasLinkRules: true,
    skip: getNumberProperty(skip, 0),
    limit: itemsLimit,
  });
  const items = selection?.items;

  if (!items?.length) return null;

  return <HeroSwiperView slides={items} />;
};
export default HeroSwiper;
