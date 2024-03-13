import { ComponentProps, EditorialModuleProps } from '@/models/types/components';
import { getEntity, getEntityList } from '@/services/forgeDistributionService';
import MixedSquared from '@/components/common/list/Mixed/MixedSquared';
import { getBooleanProperty, getDarkClass, getNumberProperty } from '@/helpers/pageComponentPropertyHelper';
import FeaturedRow from '@/components/common/FeaturedRow/FeaturedRow';
import { getSingleAssetByTag } from '@/services/gadService';
import { ForgeDapiEntityCode, PagedResult } from '@/models/types/forge';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { parseFieldValue } from '@/utilities/fieldValueParser';

const FeaturedMixedList = async ({ data }: { data: ComponentProps }) => {
  const {
    headerTitle,
    headerTitleHeadingLevel,
    hideHeaderTitle,
    skip,
    limit,
    selectionSlug,
    description,
    sponsorBy,
    isDark,
  } = data.properties as EditorialModuleProps;

  if (moduleIsNotValid(data, ['selectionSlug'])) return null;

  const featuredDescription = description
    ? await getEntity(ForgeDapiEntityCode.pageBuilderTextEditors, description, {
        variables: data.variables,
      })
    : null;
  const sponsor = sponsorBy
    ? await getEntity(ForgeDapiEntityCode.partners, sponsorBy, {
        variables: data.variables,
      })
    : null;
  const featuredSponsor = sponsor?.fields?.partnerLogo ? await getSingleAssetByTag(sponsor.fields.partnerLogo) : null;

  const results = (await getEntityList(parseFieldValue(selectionSlug, data.variables), null, {
    hasThumbnailPlaceholder: true,
    hasLinkRules: true,
    skip,
    limit: getNumberProperty(limit, 13),
    variables: data.variables,
    hasReferencesFieldsInList: true,
    hasPagination: true,
  })) as PagedResult;
  const items = results?.items;

  if (!items?.length && !(items?.length > 0)) return null;

  return (
    <FeaturedRow
      data={{
        headerTitle: headerTitle,
        headerTitleHeadingLevel: headerTitleHeadingLevel,
        hideHeaderTitle: getBooleanProperty(hideHeaderTitle),
        featuredDescription: featuredDescription?.fields?.body,
        featuredSponsor: featuredSponsor,
        sectionClassName: getDarkClass(isDark),
        children: <MixedSquared items={items} />,
      }}
    />
  );
};
export default FeaturedMixedList;
