import { ComponentProps, EditorialListModuleProps, HeaderTitleProps } from '@/models/types/components';
import { getEntityList } from '@/services/forgeDistributionService';
import { getBooleanProperty, getNumberProperty } from '@/helpers/pageComponentPropertyHelper';
import { FeaturedEventListSwiper } from '@/components/modules/FeaturedEventList/FeaturedEventListSwiper';
import FeaturedEventListHeader from '@/components/modules/FeaturedEventList/FeaturedEventListHeader';
import { DistributionEntity } from '@/models/types/forge';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';

const EventList = async ({ data }: { data: ComponentProps }) => {
  const { skip, limit, selectionSlug, isFullWidth } = data.properties as EditorialListModuleProps;
  const { headerTitle, headerTitleHeadingLevel, hideHeaderTitle } = data.properties as HeaderTitleProps;

  if (moduleIsNotValid(data, ['selectionSlug'])) return null;

  const defaultItemLimit = 5;
  const items = (await getEntityList(selectionSlug, null, {
    hasThumbnailPlaceholder: true,
    hasLinkRules: true,
    skip: getNumberProperty(skip, 0),
    limit: getNumberProperty(limit, defaultItemLimit),
    variables: data.variables,
  })) as DistributionEntity[] | null;

  if (!items?.length) return null;

  return (
    <ModuleContainer
      isFullWidth={getBooleanProperty(isFullWidth)}
      className="relative mx-auto max-w-[2048px]"
    >
      <FeaturedEventListHeader
        headerTitle={headerTitle}
        headerTitleHeadingLevel={headerTitleHeadingLevel}
        hideHeaderTitle={getBooleanProperty(hideHeaderTitle)}
      ></FeaturedEventListHeader>
      <div className="absolute left-1/2 top-0 hidden -translate-x-1/2 transform font-heading text-[930px] uppercase leading-[868px] text-grey-500 opacity-20 lg:block">
        {headerTitle}
      </div>
      <FeaturedEventListSwiper slides={items} />
    </ModuleContainer>
  );
};
export default EventList;
