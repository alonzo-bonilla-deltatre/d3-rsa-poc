import SectionWithHeader from '@/components/commons/SectionWithHeader/SectionWithHeader';
import MixedGridComponent from '@/components/commons/list/Mixed/Mixed';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { getBooleanProperty, getDarkClass, getNumberProperty } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps, EditorialModuleProps } from '@/models/types/components';
import { PagedResult } from '@/models/types/forge';
import { getEntityList } from '@/services/forgeDistributionService';

const MixedList = async ({ data }: { data: ComponentProps }) => {
  const { isFullWidth, headerTitle, headerTitleHeadingLevel, hideHeaderTitle, skip, limit, selectionSlug, isDark } =
    data.properties as EditorialModuleProps;

  if (moduleIsNotValid(data, ['selectionSlug'])) return null;

  const results = (await getEntityList(selectionSlug, null, {
    hasThumbnailPlaceholder: true,
    hasLinkRules: true,
    skip,
    limit: getNumberProperty(limit, 13),
    variables: data.variables,
    hasReferencesFieldsInList: true,
  })) as PagedResult;
  const items = results?.items;

  if (!items?.length) return null;

  return (
    <SectionWithHeader
      data={{
        headerTitle: headerTitle,
        headerTitleHeadingLevel: headerTitleHeadingLevel,
        hideHeaderTitle: getBooleanProperty(hideHeaderTitle),
        hasFullWidthHeader: isFullWidth,
        hasFullWidthContent: isFullWidth,
        sectionClassName: `d3-mixed-list ${isFullWidth ? '-full-width' : ''} ${getDarkClass(isDark)}`,
        children: <MixedGridComponent items={items} />,
      }}
    />
  );
};

export default MixedList;
